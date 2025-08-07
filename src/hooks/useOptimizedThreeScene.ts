import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { SceneUtils, SceneConfig, SCENE_PRESETS } from '../lib/three/SceneUtils';

export interface OptimizedThreeSceneConfig extends SceneConfig {
  preset?: keyof typeof SCENE_PRESETS;
  enablePerformanceMonitoring?: boolean;
  targetFPS?: number;
  adaptiveQuality?: boolean;
  pauseWhenHidden?: boolean;
  autoStart?: boolean;
}

export interface OptimizedThreeSceneResult {
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  animationIdRef: React.MutableRefObject<number | null>;
  
  initializeScene: () => boolean;
  startAnimation: (animationCallback: () => void) => void;
  stopAnimation: () => void;
  cleanup: () => void;
  resize: () => void;
  
  // Performance monitoring
  fps: number;
  isVisible: boolean;
  quality: 'low' | 'medium' | 'high';
}

export const useOptimizedThreeScene = (config: OptimizedThreeSceneConfig = {}): OptimizedThreeSceneResult => {
  const {
    preset = 'INDUSTRIAL',
    enablePerformanceMonitoring = true,
    targetFPS = 60,
    adaptiveQuality = true,
    pauseWhenHidden = true,
    autoStart = true,
    ...sceneConfig
  } = config;

  // Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Performance monitoring
  const [fps, setFps] = useState(60);
  const [isVisible, setIsVisible] = useState(true);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
  
  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());

  // Intersection Observer para pausar quando não visível
  useEffect(() => {
    if (!pauseWhenHidden || !canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [pauseWhenHidden]);

  // Performance monitoring
  const updatePerformanceMetrics = useCallback(() => {
    if (!enablePerformanceMonitoring) return;

    const now = performance.now();
    const deltaTime = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    frameTimeRef.current.push(deltaTime);
    if (frameTimeRef.current.length > 60) {
      frameTimeRef.current.shift();
    }

    // Calcular FPS médio
    const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
    const currentFPS = Math.round(1000 / avgFrameTime);
    setFps(currentFPS);

    // Ajustar qualidade automaticamente
    if (adaptiveQuality) {
      if (currentFPS < targetFPS * 0.7 && quality !== 'low') {
        setQuality(currentFPS < targetFPS * 0.5 ? 'low' : 'medium');
      } else if (currentFPS > targetFPS * 0.9 && quality !== 'high') {
        setQuality('high');
      }
    }
  }, [enablePerformanceMonitoring, adaptiveQuality, targetFPS, quality]);

  // Aplicar configurações de qualidade
  const applyQualitySettings = useCallback(() => {
    if (!rendererRef.current) return;

    const renderer = rendererRef.current;
    
    switch (quality) {
      case 'low':
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        renderer.shadowMap.enabled = false;
        break;
      case 'medium':
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.BasicShadowMap;
        break;
      case 'high':
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        break;
    }
  }, [quality]);

  // Aplicar configurações quando a qualidade muda
  useEffect(() => {
    applyQualitySettings();
  }, [quality, applyQualitySettings]);

  const initializeScene = useCallback((): boolean => {
    if (!canvasRef.current) return false;

    try {
      const rect = canvasRef.current.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 600;

      const finalConfig = { ...SCENE_PRESETS[preset], ...sceneConfig };

      const scene = SceneUtils.createScene(finalConfig);
      const camera = SceneUtils.createCamera(width, height, finalConfig);
      const renderer = SceneUtils.createRenderer(width, height, finalConfig);

      // Otimizações de performance já aplicadas na criação do renderer
      
      SceneUtils.setupLighting(scene, finalConfig);
      SceneUtils.addHelpers(scene, finalConfig);

      canvasRef.current.appendChild(renderer.domElement);

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;

      applyQualitySettings();

      return true;
    } catch (error) {
      console.error('Erro ao inicializar cena otimizada:', error);
      return false;
    }
  }, [preset, sceneConfig, quality, applyQualitySettings]);

  const startAnimation = useCallback((animationCallback: () => void) => {
    if (animationIdRef.current) return;

    const animate = () => {
      if (!isVisible && pauseWhenHidden) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      updatePerformanceMetrics();
      animationCallback();
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
  }, [isVisible, pauseWhenHidden, updatePerformanceMetrics]);

  const stopAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopAnimation();
    
    if (rendererRef.current) {
      rendererRef.current.dispose();
      if (canvasRef.current && rendererRef.current.domElement.parentNode) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
    }

    sceneRef.current = null;
    cameraRef.current = null;
    rendererRef.current = null;
  }, [stopAnimation]);

  const resize = useCallback(() => {
    if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 600;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  // Auto resize
  useEffect(() => {
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resize]);

  return {
    sceneRef,
    cameraRef,
    rendererRef,
    canvasRef,
    animationIdRef,
    initializeScene,
    startAnimation,
    stopAnimation,
    cleanup,
    resize,
    fps,
    isVisible,
    quality
  };
};
