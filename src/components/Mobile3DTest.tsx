import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Mobile3DTest = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const initializationRetryRef = useRef<NodeJS.Timeout | null>(null);

  // Utility function to get valid dimensions
  const getValidDimensions = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width || element.clientWidth || element.offsetWidth || 800;
    const height = rect.height || element.clientHeight || element.offsetHeight || 600;
    return { 
      width: Math.max(width, 300), 
      height: Math.max(height, 200) 
    };
  };

  // Initialize 3D scene with retry mechanism
  const initializeScene = (retryAttempt = 0) => {
    if (!canvasRef.current) return false;

    const { width, height } = getValidDimensions(canvasRef.current);
    setDimensions({ width, height });
    setRetryCount(retryAttempt);
    
    // If dimensions are still too small and we haven't exceeded retry limit, try again
    if (width <= 300 && height <= 200 && retryAttempt < 10) {
      if (initializationRetryRef.current) {
        clearTimeout(initializationRetryRef.current);
      }
      initializationRetryRef.current = setTimeout(() => {
        initializeScene(retryAttempt + 1);
      }, 50);
      return false;
    }

    // Clean up any existing scene
    if (rendererRef.current && canvasRef.current) {
      try {
        canvasRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2563eb); // Blue background
    sceneRef.current = scene;

    // Camera setup with valid aspect ratio
    const aspectRatio = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup with valid dimensions
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Add a simple cube to test
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add a rotating torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600 });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 3, 0);
    scene.add(torus);

    setIsInitialized(true);
    return true;
  };

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Rotate objects
    sceneRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      }
    });
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Initialize scene on mount with proper timing
  useEffect(() => {
    const initFrame = requestAnimationFrame(() => {
      const initialized = initializeScene();
      if (initialized) {
        animate();
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (initializationRetryRef.current) {
        clearTimeout(initializationRetryRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (rendererRef.current && canvasRef.current) {
        try {
          canvasRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  // Handle container resize with ResizeObserver
  useEffect(() => {
    if (!canvasRef.current) return;

    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;

      const { width, height } = getValidDimensions(canvasRef.current);
      setDimensions({ width, height });

      if (width > 0 && height > 0) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    // Use ResizeObserver for better container size detection
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === canvasRef.current) {
            handleResize();
            break;
          }
        }
      });
      resizeObserverRef.current.observe(canvasRef.current);
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Teste de Renderização 3D Mobile</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status da Inicialização</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <strong>Status:</strong> {isInitialized ? '✅ Inicializado' : '⏳ Inicializando...'}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Dimensões:</strong> {dimensions.width} x {dimensions.height}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Tentativas:</strong> {retryCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Visualização 3D</h2>
            <p className="text-gray-600 text-sm">
              Este teste verifica se os objetos 3D são renderizados corretamente em dispositivos móveis
            </p>
          </div>
          
          <div className="relative">
            <div
              ref={canvasRef}
              className="w-full h-96 bg-blue-500"
              style={{ minHeight: '400px' }}
            />
            
            {!isInitialized && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Inicializando cena 3D...</p>
                  <p className="text-sm opacity-75">Tentativa: {retryCount}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Como testar:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>1. Abra esta página diretamente em um dispositivo móvel</li>
            <li>2. Verifique se os objetos 3D (cubo verde e torus laranja) aparecem</li>
            <li>3. Redimensione a janela e verifique se a cena se adapta</li>
            <li>4. Compare com o comportamento anterior (objetos não apareciam no carregamento inicial mobile)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mobile3DTest;
