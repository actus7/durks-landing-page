import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { SceneUtils, SceneConfig, SCENE_PRESETS } from '../lib/three/SceneUtils';

/**
 * Configurações específicas para o hook useThreeScene
 */
export interface ThreeSceneConfig extends SceneConfig {
  preset?: keyof typeof SCENE_PRESETS;
  retryAttempts?: number;
  retryDelay?: number;
  enableResizeObserver?: boolean;
  autoStart?: boolean;
}

/**
 * Resultado do hook useThreeScene
 */
export interface ThreeSceneResult {
  // Refs para os objetos Three.js
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
  animationIdRef: React.MutableRefObject<number | null>;
  
  // Métodos de controle
  initializeScene: () => boolean;
  startAnimation: (animationCallback: () => void) => void;
  stopAnimation: () => void;
  cleanup: () => void;
  resize: () => void;
  
  // Estado
  isInitialized: () => boolean;
}

/**
 * Hook para gerenciamento completo de cena Three.js
 */
export const useThreeScene = (config: ThreeSceneConfig = {}): ThreeSceneResult => {
  const {
    preset = 'INDUSTRIAL',
    retryAttempts = 10,
    retryDelay = 50,
    enableResizeObserver = true,
    autoStart = true,
    ...sceneConfig
  } = config;

  // Refs para objetos Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Refs para controle interno
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const initializationRetryRef = useRef<NodeJS.Timeout | null>(null);
  const animationCallbackRef = useRef<(() => void) | null>(null);

  /**
   * Inicializa a cena Three.js com mecanismo de retry otimizado
   */
  const initializeScene = useCallback((retryCount = 0): boolean => {
    if (!canvasRef.current) return false;

    const { width, height } = SceneUtils.getValidDimensions(canvasRef.current);

    // Se as dimensões ainda são muito pequenas e não excedemos o limite de retry, tenta novamente
    if (width <= 300 && height <= 200 && retryCount < retryAttempts) {
      if (initializationRetryRef.current) {
        clearTimeout(initializationRetryRef.current);
      }
      initializationRetryRef.current = setTimeout(() => {
        initializeScene(retryCount + 1);
      }, Math.min(retryDelay * (retryCount + 1), 500)); // Backoff exponencial limitado
      return false;
    }

    // Limpar cena existente
    cleanup();

    try {
      // Configuração combinada
      const finalConfig = { ...SCENE_PRESETS[preset], ...sceneConfig };

      // Criar cena, câmera e renderer
      const scene = SceneUtils.createScene(finalConfig);
      const camera = SceneUtils.createCamera(width, height, finalConfig);
      const renderer = SceneUtils.createRenderer(width, height, finalConfig);

      // Configurar iluminação e helpers
      SceneUtils.setupLighting(scene, finalConfig);
      SceneUtils.addHelpers(scene, finalConfig);

      // Adicionar renderer ao DOM
      canvasRef.current.appendChild(renderer.domElement);

      // Armazenar referências
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;

      return true;
    } catch (error) {
      console.error('Erro ao inicializar cena Three.js:', error);
      return false;
    }
  }, [preset, sceneConfig, retryAttempts, retryDelay]);

  /**
   * Inicia o loop de animação com throttling
   */
  const startAnimation = useCallback((animationCallback: () => void) => {
    // Parar animação existente primeiro
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    animationCallbackRef.current = animationCallback;
    
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      // Throttling para manter performance
      if (currentTime - lastTime >= frameTime) {
        if (animationCallbackRef.current) {
          animationCallbackRef.current();
        }
        lastTime = currentTime;
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  /**
   * Para o loop de animação
   */
  const stopAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    animationCallbackRef.current = null;
  }, []);

  /**
   * Limpa todos os recursos Three.js
   */
  const cleanup = useCallback(() => {
    // Parar animação
    stopAnimation();

    // Limpar timeout de retry
    if (initializationRetryRef.current) {
      clearTimeout(initializationRetryRef.current);
      initializationRetryRef.current = null;
    }

    // Limpar ResizeObserver
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    // Limpar renderer e cena
    SceneUtils.cleanupScene(rendererRef.current, canvasRef.current, sceneRef.current);
    
    // Resetar refs
    sceneRef.current = null;
    cameraRef.current = null;
    rendererRef.current = null;
  }, [stopAnimation]);

  /**
   * Redimensiona a cena quando o container muda de tamanho
   */
  const resize = useCallback(() => {
    if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;
    
    SceneUtils.handleResize(rendererRef.current, cameraRef.current, canvasRef.current);
  }, []);

  /**
   * Verifica se a cena está inicializada
   */
  const isInitialized = useCallback(() => {
    return !!(sceneRef.current && cameraRef.current && rendererRef.current);
  }, []);

  /**
   * Configura o ResizeObserver para redimensionamento automático
   */
  useEffect(() => {
    if (!enableResizeObserver || !canvasRef.current) return;

    // Usar ResizeObserver para melhor detecção de mudança de tamanho do container
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === canvasRef.current) {
            resize();
            break;
          }
        }
      });
      resizeObserverRef.current.observe(canvasRef.current);
    }

    // Fallback para window resize
    window.addEventListener('resize', resize);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', resize);
    };
  }, [enableResizeObserver, resize]);

  /**
   * Inicialização automática quando o componente é montado
   */
  useEffect(() => {
    if (!autoStart) return;

    // Usar requestAnimationFrame para garantir que o DOM está pronto
    const initFrame = requestAnimationFrame(() => {
      const initialized = initializeScene();
      if (initialized && animationCallbackRef.current) {
        startAnimation(animationCallbackRef.current);
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      cleanup();
    };
  }, [autoStart, initializeScene, startAnimation, cleanup]);

  return {
    // Refs
    sceneRef,
    cameraRef,
    rendererRef,
    canvasRef,
    animationIdRef,
    
    // Métodos
    initializeScene,
    startAnimation,
    stopAnimation,
    cleanup,
    resize,
    isInitialized
  };
};
