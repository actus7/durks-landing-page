import React, { useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../hooks/useThreeScene';
import { useMouseControls } from '../hooks/useMouseControls';
import { SiloGeometry } from '../lib/three/geometries/SiloGeometry';
import { VerticalThreeControls, useRenderMode } from './shared/ThreeControls';
import { SceneUtils } from '../lib/three/SceneUtils';

/**
 * Componente SiloVisualization - visualização 3D simplificada de silo
 */
const SiloVisualization: React.FC = () => {
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
    preset: 'INDUSTRIAL',
    autoStart: false
  });

  // Hooks para controles de mouse
  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    updateCamera,
    zoomIn,
    zoomOut,
    toggleRotation,
    toggleAutoRotation,
    controlsEnabled
  } = useMouseControls({
    initialZoom: 40,
    enableAutoRotation: true,
    autoRotationSpeed: 0.0008
  });

  // Hook para modo de renderização
  const { renderMode, handleModeChange } = useRenderMode('shaded');

  // Ref para o grupo do silo
  const siloGroupRef = React.useRef<THREE.Group | null>(null);

  /**
   * Atualiza os materiais do silo baseado no modo de renderização
   */
  const updateSiloMaterials = useCallback((mode: typeof renderMode) => {
    if (!siloGroupRef.current) return;
    SceneUtils.applyRenderMode(siloGroupRef.current, mode);
  }, []);

  /**
   * Handler para mudanças nos controles de interação
   */
  const handleInteractionChange = useCallback((control: keyof typeof controlsEnabled, enabled: boolean) => {
    switch (control) {
      case 'rotation':
        toggleRotation(enabled);
        break;
      case 'autoRotation':
        toggleAutoRotation(enabled);
        break;
    }
  }, [toggleRotation, toggleAutoRotation]);

  /**
   * Loop de animação
   */
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    // Atualizar câmera com controles de mouse
    updateCamera(cameraRef.current);

    // Renderizar cena
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    // Continuar animação
    animationIdRef.current = requestAnimationFrame(animate);
  }, [updateCamera]);

  /**
   * Inicialização da cena
   */
  useEffect(() => {
    const initFrame = requestAnimationFrame(() => {
      const initialized = initializeScene();
      if (initialized && sceneRef.current) {
        // Criar silo usando a geometria reutilizável
        const silo = SiloGeometry.create();
        siloGroupRef.current = silo;
        sceneRef.current.add(silo);

        // Aplicar modo de renderização inicial após um pequeno delay
        setTimeout(() => {
          updateSiloMaterials(renderMode);
        }, 100);

        // Iniciar animação
        startAnimation(animate);
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      cleanup();
    };
  }, [initializeScene, startAnimation, animate, cleanup]);

  /**
   * Efeito para atualizar materiais quando o modo de renderização muda
   */
  useEffect(() => {
    if (siloGroupRef.current) {
      updateSiloMaterials(renderMode);
    }
  }, [renderMode, updateSiloMaterials]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>

      {/* 3D Canvas Area */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      />

      {/* Vertical Controls Panel - Right side */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <VerticalThreeControls
          currentMode={renderMode}
          onModeChange={handleModeChange}
          theme="teal"
          interactionControls={controlsEnabled}
          onInteractionChange={handleInteractionChange}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-2xl font-bold text-white mb-2">
          Visualização 3D - Silo de Grãos
        </h1>
        <p className="text-teal-200 text-sm">
          Explore o modelo interativo do silo
        </p>
      </div>
    </div>
  );
};

export default SiloVisualization;