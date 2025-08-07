import React, { useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import { useMouseControls } from '../../hooks/useMouseControls';
import { TextureFactory } from '../../lib/three/TextureFactory';
import { SceneUtils } from '../../lib/three/SceneUtils';
import type { RenderMode } from '../shared/ThreeControls';

/**
 * Props para o componente ProductVisualization
 */
export interface ProductVisualizationProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Se deve iniciar automaticamente */
  autoStart?: boolean;
  /** Modo de renderização atual */
  renderMode?: RenderMode;
}

/**
 * Componente de visualização 3D de produtos (memoizado)
 */
export const ProductVisualization: React.FC<ProductVisualizationProps> = React.memo(({
  className = '',
  autoStart = true,
  renderMode = 'shaded'
}) => {
  // Hooks para gerenciamento da cena 3D
  const {
    sceneRef,
    cameraRef,
    rendererRef,
    canvasRef,
    animationIdRef,
    initializeScene,
    startAnimation,
    cleanup
  } = useThreeScene({
    preset: 'DARK',
    autoStart: false,
    cameraPosition: [30, 20, 30],
    cameraLookAt: [0, 5, 0]
  });

  // Hooks para controles de mouse
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    updateCamera
  } = useMouseControls({
    initialZoom: 50,
    enableAutoRotation: true,
    autoRotationSpeed: 0.0016,
    lookAtTarget: [0, 5, 0],
    cameraOffset: [0, 10, 0]
  });

  // Ref para o grupo de produtos
  const productGroupRef = React.useRef<THREE.Group | null>(null);

  /**
   * Atualiza os materiais dos produtos baseado no modo de renderização
   */
  const updateProductMaterials = useCallback((mode: RenderMode) => {
    if (!productGroupRef.current) return;
    SceneUtils.applyRenderMode(productGroupRef.current, mode);
  }, []);

  /**
   * Cria a geometria do silo de produtos
   */
  const createProductSilo = useCallback((): THREE.Group => {
    const siloGroup = new THREE.Group();
    const corrugatedTexture = TextureFactory.createSimpleCorrugatedTexture({
      repeatX: 8,
      repeatY: 1
    });

    // Corpo do silo
    const bodyRadius = 6;
    const bodyHeight = 12;
    const bodyGeometry = new THREE.CylinderGeometry(bodyRadius, bodyRadius, bodyHeight, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      map: corrugatedTexture,
      color: 0xd0d0d0,
      side: THREE.DoubleSide
    });

    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = bodyHeight / 2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    siloGroup.add(bodyMesh);

    // Anéis de reforço
    const ringGeometry = new THREE.TorusGeometry(bodyRadius + 0.05, 0.06, 6, 48);
    const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });

    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.y = 1.5 + (i * 1.5);
      ring.rotation.x = Math.PI / 2;
      ring.castShadow = true;
      siloGroup.add(ring);
    }

    // Teto cônico
    const roofHeight = 3;
    const roofGeometry = new THREE.ConeGeometry(bodyRadius + 0.1, roofHeight, 32);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xb0b0b0 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = bodyHeight + roofHeight / 2;
    roof.castShadow = true;
    siloGroup.add(roof);

    // Base de concreto
    const baseGeometry = new THREE.CylinderGeometry(
      bodyRadius + 1, 
      bodyRadius + 1.5, 
      0.8, 
      32
    );
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.4;
    base.receiveShadow = true;
    base.castShadow = true;
    siloGroup.add(base);

    // Porta de acesso
    const doorGeometry = new THREE.PlaneGeometry(0.8, 1.6);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x303030 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(bodyRadius - 0.01, 1.0, 0);
    door.rotation.y = Math.PI / 2;
    door.castShadow = true;
    siloGroup.add(door);

    // Escada de acesso
    const ladderGeometry = new THREE.BoxGeometry(0.06, bodyHeight * 0.8, 0.06);
    const ladderMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });

    // Trilhos da escada
    const leftRail = new THREE.Mesh(ladderGeometry, ladderMaterial);
    leftRail.position.set(0, bodyHeight * 0.4, bodyRadius + 0.4);
    leftRail.castShadow = true;
    siloGroup.add(leftRail);

    const rightRail = new THREE.Mesh(ladderGeometry, ladderMaterial);
    rightRail.position.set(0.3, bodyHeight * 0.4, bodyRadius + 0.4);
    rightRail.castShadow = true;
    siloGroup.add(rightRail);

    // Degraus da escada
    const rungGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const rungMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    for (let i = 0; i < 15; i++) {
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);
      rung.position.set(0.15, 0.8 + i * 0.6, bodyRadius + 0.4);
      rung.rotation.z = Math.PI / 2;
      rung.castShadow = true;
      siloGroup.add(rung);
    }

    return siloGroup;
  }, []);

  /**
   * Loop de animação otimizado
   */
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Atualizar câmera com controles de mouse
    updateCamera(cameraRef.current);
    
    // Renderizar cena
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [updateCamera]);

  /**
   * Inicialização da cena
   */
  useEffect(() => {
    if (!autoStart) return;

    const initFrame = requestAnimationFrame(() => {
      const initialized = initializeScene();
      if (initialized && sceneRef.current) {
        // Criar grupo de produtos
        const productGroup = new THREE.Group();
        productGroupRef.current = productGroup;
        sceneRef.current.add(productGroup);
        
        // Adicionar silo de produtos
        const productSilo = createProductSilo();
        productGroup.add(productSilo);

        // Aplicar modo de renderização inicial após um pequeno delay
        setTimeout(() => {
          updateProductMaterials(renderMode);
        }, 100);

        // Iniciar animação
        startAnimation(animate);
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      cleanup();
    };
  }, [autoStart, initializeScene, createProductSilo, startAnimation, animate, cleanup]);

  /**
   * Efeito para atualizar materiais quando o modo de renderização muda
   */
  useEffect(() => {
    if (productGroupRef.current) {
      updateProductMaterials(renderMode);
    }
  }, [renderMode, updateProductMaterials]);

  return (
    <div className={`w-full h-full relative ${className}`}>
      {/* 3D Canvas Area */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      />
    </div>
  );
});

export default ProductVisualization;
