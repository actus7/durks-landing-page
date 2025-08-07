import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';

/**
 * Configurações para controles de mouse
 */
export interface MouseControlsConfig {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  rotationSensitivity?: number;
  zoomSensitivity?: number;
  maxVerticalRotation?: number;
  autoRotationSpeed?: number;
  enableAutoRotation?: boolean;
  enableZoom?: boolean;
  enableRotation?: boolean;
  lookAtTarget?: [number, number, number];
  cameraOffset?: [number, number, number];
}

/**
 * Estado interno dos controles de mouse
 */
interface MouseState {
  x: number;
  y: number;
  targetRotationX: number;
  targetRotationY: number;
  mouseDown: boolean;
  zoom: number;
}

/**
 * Hook para gerenciar controles de mouse em visualizações 3D
 */
export const useMouseControls = (config: MouseControlsConfig = {}) => {
  const {
    initialZoom = 40,
    minZoom = 15,
    maxZoom = 80,
    rotationSensitivity = 0.01,
    zoomSensitivity = 0.02,
    maxVerticalRotation = Math.PI / 3,
    autoRotationSpeed = 0.0003,
    enableAutoRotation = true,
    enableZoom = true,
    enableRotation = true,
    lookAtTarget = [0, 10, 0],
    cameraOffset = [0, 15, 0]
  } = config;

  const mouseRef = useRef<MouseState>({
    x: 0,
    y: 0,
    targetRotationX: 0,
    targetRotationY: 0,
    mouseDown: false,
    zoom: initialZoom
  });

  // Estados para controles dinâmicos
  const [controlsEnabled, setControlsEnabled] = React.useState({
    rotation: enableRotation,
    autoRotation: enableAutoRotation
  });

  /**
   * Handler para mouse down
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const mouse = mouseRef.current;
    mouse.mouseDown = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, []);

  /**
   * Handler para mouse up
   */
  const handleMouseUp = useCallback(() => {
    mouseRef.current.mouseDown = false;
  }, []);

  /**
   * Handler para movimento do mouse
   */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mouse = mouseRef.current;

    if (!mouse.mouseDown || !controlsEnabled.rotation) {
      return;
    }

    const deltaX = e.clientX - mouse.x;
    const deltaY = e.clientY - mouse.y;

    mouse.targetRotationY += deltaX * rotationSensitivity;
    mouse.targetRotationX += deltaY * rotationSensitivity;

    // Limitar rotação vertical
    mouse.targetRotationX = Math.max(
      -maxVerticalRotation,
      Math.min(maxVerticalRotation, mouse.targetRotationX)
    );

    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, [rotationSensitivity, maxVerticalRotation, controlsEnabled.rotation]);

  /**
   * Handler para scroll do mouse (desabilitado - zoom agora é manual)
   */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Zoom por scroll desabilitado - agora é controlado pelos botões + e -
    e.preventDefault();
  }, []);

  /**
   * Atualiza a posição da câmera baseada no estado atual do mouse
   */
  const updateCamera = useCallback((camera: THREE.PerspectiveCamera) => {
    const mouse = mouseRef.current;
    
    // Auto rotação quando não está sendo controlado
    if (controlsEnabled.autoRotation && !mouse.mouseDown) {
      mouse.targetRotationY += autoRotationSpeed;
    }
    
    // Aplicar rotação da câmera
    const x = Math.sin(mouse.targetRotationY) * Math.cos(mouse.targetRotationX) * mouse.zoom;
    const y = Math.sin(mouse.targetRotationX) * mouse.zoom + cameraOffset[1];
    const z = Math.cos(mouse.targetRotationY) * Math.cos(mouse.targetRotationX) * mouse.zoom;
    
    camera.position.set(x + cameraOffset[0], y, z + cameraOffset[2]);
    camera.lookAt(...lookAtTarget);
  }, [enableAutoRotation, autoRotationSpeed, lookAtTarget, cameraOffset]);

  /**
   * Reseta os controles para o estado inicial
   */
  const resetControls = useCallback(() => {
    const mouse = mouseRef.current;
    mouse.targetRotationX = 0;
    mouse.targetRotationY = 0;
    mouse.zoom = initialZoom;
    mouse.mouseDown = false;
  }, [initialZoom]);

  /**
   * Define uma nova posição de zoom
   */
  const setZoom = useCallback((zoom: number) => {
    mouseRef.current.zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
  }, [minZoom, maxZoom]);

  /**
   * Define uma nova rotação
   */
  const setRotation = useCallback((rotationX: number, rotationY: number) => {
    const mouse = mouseRef.current;
    mouse.targetRotationX = Math.max(
      -maxVerticalRotation, 
      Math.min(maxVerticalRotation, rotationX)
    );
    mouse.targetRotationY = rotationY;
  }, [maxVerticalRotation]);

  /**
   * Obtém o estado atual dos controles
   */
  const getControlsState = useCallback(() => {
    return { ...mouseRef.current };
  }, []);

  /**
   * Verifica se o mouse está sendo pressionado
   */
  const isMouseDown = useCallback(() => {
    return mouseRef.current.mouseDown;
  }, []);

  /**
   * Obtém o zoom atual
   */
  const getCurrentZoom = useCallback(() => {
    return mouseRef.current.zoom;
  }, []);

  /**
   * Obtém a rotação atual
   */
  const getCurrentRotation = useCallback(() => {
    return {
      x: mouseRef.current.targetRotationX,
      y: mouseRef.current.targetRotationY
    };
  }, []);

  /**
   * Anima suavemente para uma nova posição
   */
  const animateToPosition = useCallback((
    targetRotationX: number,
    targetRotationY: number,
    targetZoom: number,
    duration: number = 1000
  ) => {
    const mouse = mouseRef.current;
    const startRotationX = mouse.targetRotationX;
    const startRotationY = mouse.targetRotationY;
    const startZoom = mouse.zoom;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      mouse.targetRotationX = startRotationX + (targetRotationX - startRotationX) * easeOut;
      mouse.targetRotationY = startRotationY + (targetRotationY - startRotationY) * easeOut;
      mouse.zoom = startZoom + (targetZoom - startZoom) * easeOut;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, []);

  /**
   * Zoom manual - aumentar
   */
  const zoomIn = useCallback(() => {
    const mouse = mouseRef.current;
    mouse.zoom = Math.max(minZoom, mouse.zoom - 5); // Diminui a distância = zoom in
  }, [minZoom]);

  /**
   * Zoom manual - diminuir
   */
  const zoomOut = useCallback(() => {
    const mouse = mouseRef.current;
    mouse.zoom = Math.min(maxZoom, mouse.zoom + 5); // Aumenta a distância = zoom out
  }, [maxZoom]);

  /**
   * Controla se a rotação está habilitada
   */
  const toggleRotation = useCallback((enabled?: boolean) => {
    setControlsEnabled(prev => ({
      ...prev,
      rotation: enabled !== undefined ? enabled : !prev.rotation
    }));
  }, []);

  /**
   * Controla se a auto-rotação está habilitada
   */
  const toggleAutoRotation = useCallback((enabled?: boolean) => {
    setControlsEnabled(prev => ({
      ...prev,
      autoRotation: enabled !== undefined ? enabled : !prev.autoRotation
    }));
  }, []);

  /**
   * Obtém o estado atual dos controles
   */
  const getControlsEnabled = useCallback(() => {
    return { ...controlsEnabled };
  }, [controlsEnabled]);

  return {
    // Event handlers
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    
    // Camera control
    updateCamera,
    
    // State management
    resetControls,
    setZoom,
    setRotation,
    getControlsState,
    isMouseDown,
    getCurrentZoom,
    getCurrentRotation,
    animateToPosition,

    // Zoom controls
    zoomIn,
    zoomOut,

    // Controls management
    toggleRotation,
    toggleAutoRotation,
    getControlsEnabled,
    controlsEnabled,

    // Internal ref (for advanced usage)
    mouseRef
  };
};
