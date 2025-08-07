import React, { useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import { useMouseControls } from '../../hooks/useMouseControls';
import { SceneUtils } from '../../lib/three/SceneUtils';
import { SiloGeometry } from '../../lib/three/geometries/SiloGeometry';
import { TulhaGeometry } from '../../lib/three/geometries/TulhaGeometry';
import { ElevadorGeometry } from '../../lib/three/geometries/ElevadorGeometry';
import { VerticalThreeControls } from '../shared/ThreeControls';
import { EquipmentIndicators, useEquipmentState, useAutoSwitch } from '../shared/EquipmentIndicators';
import type { RenderMode } from '../shared/ThreeControls';
import type { EquipmentType } from '../shared/EquipmentIndicators';

/**
 * Props para o componente Hero3DVisualization
 */
export interface Hero3DVisualizationProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Se deve iniciar automaticamente */
  autoStart?: boolean;
  /** Se deve fazer auto-switch de equipamentos */
  enableAutoSwitch?: boolean;
  /** Intervalo do auto-switch em milissegundos */
  autoSwitchInterval?: number;
}

/**
 * Configurações dos equipamentos disponíveis
 */
const EQUIPMENT_CONFIGS = [
  { id: 'silo' as EquipmentType, name: 'Silo de Grãos' },
  { id: 'tulha' as EquipmentType, name: 'Tulha Graneleira' },
  { id: 'elevador' as EquipmentType, name: 'Elevador de Canecas' }
];

/**
 * Componente de visualização 3D do Hero (memoizado)
 */
export const Hero3DVisualization: React.FC<Hero3DVisualizationProps> = React.memo(({
  className = '',
  autoStart = true,
  enableAutoSwitch = true,
  autoSwitchInterval = 8000
}) => {
  // Hooks para gerenciamento da cena 3D
  const {
    sceneRef,
    cameraRef,
    rendererRef,
    canvasRef,
    initializeScene,
    startAnimation,
    cleanup
  } = useThreeScene({
    preset: 'INDUSTRIAL',
    autoStart: false // Vamos controlar manualmente
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

  // Estado dos equipamentos
  const {
    currentEquipment,
    isTransitioning,
    switchEquipment
  } = useEquipmentState('silo');

  // Auto-switch de equipamentos
  useAutoSwitch(
    EQUIPMENT_CONFIGS,
    currentEquipment,
    switchEquipment,
    autoSwitchInterval,
    enableAutoSwitch
  );

  // Estado do modo de renderização
  const [renderMode, setRenderMode] = React.useState<RenderMode>('shaded');

  // Ref para o grupo de equipamentos
  const equipmentGroupRef = React.useRef<THREE.Group | null>(null);

  /**
   * Cria a geometria do equipamento baseado no tipo
   */
  const createEquipmentGeometry = useCallback((equipmentType: EquipmentType): THREE.Group => {
    switch (equipmentType) {
      case 'silo':
        return SiloGeometry.create();
      case 'tulha':
        return TulhaGeometry.create();
      case 'elevador':
        return ElevadorGeometry.create();
      default:
        throw new Error(`Unknown equipment type: ${equipmentType}`);
    }
  }, []);

  /**
   * Atualiza os materiais do equipamento baseado no modo de renderização
   */
  const updateEquipmentMaterials = useCallback((mode: RenderMode) => {
    if (!equipmentGroupRef.current) return;
    SceneUtils.applyRenderMode(equipmentGroupRef.current, mode);
  }, []);

  /**
   * Troca o equipamento na cena
   */
  const handleEquipmentSwitch = useCallback((equipmentType: EquipmentType) => {
    if (!sceneRef.current || !equipmentGroupRef.current) return;

    try {
      // Limpar equipamento atual
      equipmentGroupRef.current.clear();

      // Criar novo equipamento
      const newEquipment = createEquipmentGeometry(equipmentType);
      equipmentGroupRef.current.add(newEquipment);

      // Aplicar modo de renderização atual
      updateEquipmentMaterials(renderMode);
    } catch (error) {
      console.error('Error switching equipment:', error);
    }
  }, [createEquipmentGeometry, renderMode, updateEquipmentMaterials]);

  /**
   * Handler para mudança de modo de renderização
   */
  const handleRenderModeChange = useCallback((mode: RenderMode) => {
    setRenderMode(mode);
    updateEquipmentMaterials(mode);
  }, [updateEquipmentMaterials]);

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
        // Criar grupo de equipamentos
        const equipmentGroup = new THREE.Group();
        equipmentGroupRef.current = equipmentGroup;
        sceneRef.current.add(equipmentGroup);

        // Adicionar equipamento inicial
        const initialEquipment = createEquipmentGeometry(currentEquipment);
        equipmentGroup.add(initialEquipment);

        // Aplicar modo de renderização inicial
        setTimeout(() => {
          updateEquipmentMaterials(renderMode);
        }, 100);

        // Iniciar animação
        startAnimation(animate);
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      cleanup();
    };
  }, [autoStart, initializeScene, createEquipmentGeometry, currentEquipment, startAnimation, animate, cleanup, renderMode, updateEquipmentMaterials]);

  /**
   * Efeito para trocar equipamento quando o estado muda
   */
  useEffect(() => {
    if (equipmentGroupRef.current) {
      handleEquipmentSwitch(currentEquipment);
    }
  }, [currentEquipment, handleEquipmentSwitch]);

  /**
   * Efeito para aplicar modo de renderização quando muda
   */
  useEffect(() => {
    if (equipmentGroupRef.current) {
      updateEquipmentMaterials(renderMode);
    }
  }, [renderMode, updateEquipmentMaterials]);

  return (
    <div className={`flex-1 relative min-h-[400px] lg:min-h-screen ${className}`}>
      {/* 3D Canvas Area */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      />

      {/* Vertical Controls Panel - Right side */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <VerticalThreeControls
          currentMode={renderMode}
          onModeChange={handleRenderModeChange}
          theme="teal"
          interactionControls={controlsEnabled}
          onInteractionChange={handleInteractionChange}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </div>

      {/* Equipment Indicators - Bottom center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <EquipmentIndicators
          equipments={EQUIPMENT_CONFIGS}
          currentEquipment={currentEquipment}
          onEquipmentChange={switchEquipment}
          isTransitioning={isTransitioning}
          activeColor="bg-teal-300/60"
          inactiveColor="bg-white/10"
          showLabel={true}
          labelPosition="right"
          size="sm"
          showTooltips={true}
          className="bg-white/3 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-80"
        />
      </div>
    </div>
  );
});

export default Hero3DVisualization;
