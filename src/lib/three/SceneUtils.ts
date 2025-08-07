import * as THREE from 'three';

/**
 * Configurações padrão para diferentes tipos de cena
 */
export interface SceneConfig {
  backgroundColor?: number;
  cameraPosition?: [number, number, number];
  cameraLookAt?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
  enableShadows?: boolean;
  shadowMapSize?: number;
  pixelRatioLimit?: number;
  gridSize?: number;
  gridDivisions?: number;
  gridColor1?: number;
  gridColor2?: number;
  axesSize?: number;
  groundSize?: number;
  groundOpacity?: number;
}

/**
 * Configurações predefinidas para diferentes contextos
 */
export const SCENE_PRESETS = {
  INDUSTRIAL: {
    backgroundColor: 0x253831, // primary color
    cameraPosition: [40, 25, 40] as [number, number, number],
    cameraLookAt: [0, 10, 0] as [number, number, number],
    gridColor1: 0x314d43, // chart-2
    gridColor2: 0x253831, // primary
  },
  DARK: {
    backgroundColor: 0x1e2a26, // dark background
    cameraPosition: [40, 25, 40] as [number, number, number],
    cameraLookAt: [0, 10, 0] as [number, number, number],
    gridColor1: 0x314d43, // dark muted
    gridColor2: 0x253831, // dark card
  },
  NEUTRAL: {
    backgroundColor: 0x62736c, // muted-foreground
    cameraPosition: [30, 20, 30] as [number, number, number],
    cameraLookAt: [0, 5, 0] as [number, number, number],
    gridColor1: 0x4a7365, // chart-3
    gridColor2: 0x314d43, // chart-2
  }
} as const;

/**
 * Utilitários para configuração e gerenciamento de cenas Three.js
 */
export class SceneUtils {
  /**
   * Cria uma cena Three.js configurada com as opções especificadas
   */
  static createScene(config: SceneConfig = {}): THREE.Scene {
    const {
      backgroundColor = 0x134e4a
    } = config;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    
    return scene;
  }

  /**
   * Cria uma câmera perspectiva configurada
   */
  static createCamera(
    width: number, 
    height: number, 
    config: SceneConfig = {}
  ): THREE.PerspectiveCamera {
    const {
      fov = 45,
      near = 0.1,
      far = 1000,
      cameraPosition = [40, 25, 40],
      cameraLookAt = [0, 10, 0]
    } = config;

    const aspectRatio = width / height;
    const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    
    camera.position.set(...cameraPosition);
    camera.lookAt(...cameraLookAt);
    
    return camera;
  }

  /**
   * Cria um renderer WebGL configurado
   */
  static createRenderer(
    width: number, 
    height: number, 
    config: SceneConfig = {}
  ): THREE.WebGLRenderer {
    const {
      enableShadows = true,
      shadowMapSize = 2048,
      pixelRatioLimit = 2
    } = config;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioLimit));
    
    if (enableShadows) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    return renderer;
  }

  /**
   * Configura iluminação padrão para cenas industriais
   */
  static setupLighting(scene: THREE.Scene, config: SceneConfig = {}): void {
    const {
      shadowMapSize = 2048
    } = config;

    // Luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Luz direcional principal
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight1.position.set(50, 50, 50);
    directionalLight1.castShadow = true;
    
    // Configurar sombras
    directionalLight1.shadow.camera.left = -50;
    directionalLight1.shadow.camera.right = 50;
    directionalLight1.shadow.camera.top = 50;
    directionalLight1.shadow.camera.bottom = -50;
    directionalLight1.shadow.mapSize.width = shadowMapSize;
    directionalLight1.shadow.mapSize.height = shadowMapSize;
    
    scene.add(directionalLight1);

    // Luz direcional secundária (azulada)
    const directionalLight2 = new THREE.DirectionalLight(0x4488ff, 0.3);
    directionalLight2.position.set(-30, 40, -30);
    scene.add(directionalLight2);
  }

  /**
   * Adiciona helpers visuais à cena (grid, eixos, ground plane)
   */
  static addHelpers(scene: THREE.Scene, config: SceneConfig = {}): void {
    const {
      gridSize = 50,
      gridDivisions = 50,
      gridColor1 = 0x0f766e,
      gridColor2 = 0x134e4a,
      axesSize = 10,
      groundSize = 100,
      groundOpacity = 0.3
    } = config;

    // Grid
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor1, gridColor2);
    scene.add(gridHelper);

    // Eixos
    const axesHelper = new THREE.AxesHelper(axesSize);
    scene.add(axesHelper);

    // Plano do chão para sombras
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
    const groundMaterial = new THREE.ShadowMaterial({
      opacity: groundOpacity
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  /**
   * Função utilitária para obter dimensões válidas de um elemento
   */
  static getValidDimensions(element: HTMLElement): { width: number; height: number } {
    const rect = element.getBoundingClientRect();
    const width = rect.width || element.clientWidth || element.offsetWidth || 800;
    const height = rect.height || element.clientHeight || element.offsetHeight || 600;
    
    return {
      width: Math.max(width, 300),
      height: Math.max(height, 200)
    };
  }

  /**
   * Configura uma cena completa com todas as configurações padrão
   */
  static setupCompleteScene(
    container: HTMLElement,
    preset: keyof typeof SCENE_PRESETS = 'INDUSTRIAL',
    customConfig: Partial<SceneConfig> = {}
  ): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  } {
    const config = { ...SCENE_PRESETS[preset], ...customConfig };
    const { width, height } = this.getValidDimensions(container);

    const scene = this.createScene(config);
    const camera = this.createCamera(width, height, config);
    const renderer = this.createRenderer(width, height, config);

    this.setupLighting(scene, config);
    this.addHelpers(scene, config);

    container.appendChild(renderer.domElement);

    return { scene, camera, renderer };
  }

  /**
   * Limpa recursos de uma cena Three.js de forma mais completa
   */
  static cleanupScene(
    renderer: THREE.WebGLRenderer | null,
    container: HTMLElement | null,
    scene?: THREE.Scene | null
  ): void {
    // Limpar cena se fornecida
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => {
                if (material.map) material.map.dispose();
                if (material.normalMap) material.normalMap.dispose();
                if (material.roughnessMap) material.roughnessMap.dispose();
                if (material.metalnessMap) material.metalnessMap.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              if (object.material.normalMap) object.material.normalMap.dispose();
              if (object.material.roughnessMap) object.material.roughnessMap.dispose();
              if (object.material.metalnessMap) object.material.metalnessMap.dispose();
              object.material.dispose();
            }
          }
        }
      });
      
      // Limpar toda a cena
      scene.clear();
    }

    if (renderer && container) {
      try {
        // Forçar renderização final
        renderer.setAnimationLoop(null);
        renderer.clear();
        
        // Remover do DOM
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        
        // Limpar contextos WebGL
        renderer.dispose();
        renderer.forceContextLoss();
        
        // Limpar cache
        if (renderer.info && renderer.info.programs) {
          renderer.info.programs.length = 0;
        }
      } catch (e) {
        console.warn('Erro ao limpar cena Three.js:', e);
      }
    }
  }

  /**
   * Redimensiona renderer e câmera quando o container muda de tamanho
   */
  static handleResize(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    container: HTMLElement
  ): void {
    const { width, height } = this.getValidDimensions(container);
    
    if (width > 0 && height > 0) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  }

  /**
   * Aplica modo de renderização a todos os materiais de um objeto
   */
  static applyRenderMode(
    object: THREE.Object3D,
    mode: 'shaded' | 'wireframe' | 'xray'
  ): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach((material) => {
          if (material instanceof THREE.MeshPhongMaterial) {
            switch (mode) {
              case 'wireframe':
                material.wireframe = true;
                material.transparent = false;
                material.opacity = 1;
                break;
              case 'xray':
                material.wireframe = false;
                material.transparent = true;
                material.opacity = 0.3;
                break;
              default: // shaded
                material.wireframe = false;
                material.transparent = false;
                material.opacity = 1;
                break;
            }

            // Forçar atualização do material
            material.needsUpdate = true;
          }
        });
      }
    });
  }
}
