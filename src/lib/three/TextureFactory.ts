import * as THREE from 'three';

/**
 * Factory para criação de texturas reutilizáveis para visualizações 3D
 */
export class TextureFactory {
  /**
   * Cria uma textura corrugada metálica detalhada para silos e equipamentos industriais
   * @param options Opções de configuração da textura
   * @returns THREE.CanvasTexture configurada
   */
  static createCorrugatedTexture(options: {
    width?: number;
    height?: number;
    repeatX?: number;
    repeatY?: number;
    corrugationSpacing?: number;
    reinforcementSpacing?: number;
    plateSpacing?: number;
  } = {}): THREE.CanvasTexture {
    const {
      width = 256,
      height = 512,
      repeatX = 8,
      repeatY = 4,
      corrugationSpacing = 6,
      reinforcementSpacing = 42,
      plateSpacing = 32
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    
    // Gradiente base metálico
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(0.5, '#e0e0e0');
    gradient.addColorStop(1, '#c0c0c0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Adicionar linhas horizontais finas (corrugações)
    ctx.strokeStyle = '#a0a0a0';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += corrugationSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Adicionar linhas de reforço horizontal (mais grossas)
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 3;
    for (let y = reinforcementSpacing; y < height; y += reinforcementSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Adicionar linhas verticais (junções de chapas)
    ctx.strokeStyle = '#909090';
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x += plateSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    return texture;
  }

  /**
   * Cria uma textura corrugada simplificada para produtos menores
   * @param options Opções de configuração da textura
   * @returns THREE.CanvasTexture configurada
   */
  static createSimpleCorrugatedTexture(options: {
    width?: number;
    height?: number;
    repeatX?: number;
    repeatY?: number;
    corrugationCount?: number;
  } = {}): THREE.CanvasTexture {
    const {
      width = 256,
      height = 256,
      repeatX = 8,
      repeatY = 1,
      corrugationCount = 20
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;
    
    // Create vertical corrugated pattern
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    for (let i = 0; i < corrugationCount; i++) {
      const pos = i / corrugationCount;
      const brightness = Math.sin(pos * Math.PI * corrugationCount) * 0.1 + 0.5;
      gradient.addColorStop(pos, `rgb(${Math.floor(brightness * 255)}, ${Math.floor(brightness * 255)}, ${Math.floor(brightness * 255)})`);
    }
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    
    return texture;
  }

  /**
   * Cria uma textura de concreto para bases e fundações
   * @param options Opções de configuração da textura
   * @returns THREE.CanvasTexture configurada
   */
  static createConcreteTexture(options: {
    width?: number;
    height?: number;
    repeatX?: number;
    repeatY?: number;
    baseColor?: string;
    noiseIntensity?: number;
  } = {}): THREE.CanvasTexture {
    const {
      width = 256,
      height = 256,
      repeatX = 4,
      repeatY = 4,
      baseColor = '#606060',
      noiseIntensity = 0.1
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    
    // Base color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add noise for concrete texture
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * noiseIntensity * 255;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    
    return texture;
  }

  /**
   * Cria uma textura metálica lisa para componentes estruturais
   * @param options Opções de configuração da textura
   * @returns THREE.CanvasTexture configurada
   */
  static createMetalTexture(options: {
    width?: number;
    height?: number;
    repeatX?: number;
    repeatY?: number;
    color?: string;
    shininess?: number;
  } = {}): THREE.CanvasTexture {
    const {
      width = 128,
      height = 128,
      repeatX = 2,
      repeatY = 2,
      color = '#888888',
      shininess = 0.3
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    
    // Create metallic gradient
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, width / 2
    );
    
    const baseColor = color;
    const highlightColor = this.lightenColor(color, shininess);
    const shadowColor = this.darkenColor(color, shininess);
    
    gradient.addColorStop(0, highlightColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, shadowColor);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    
    return texture;
  }

  /**
   * Utilitário para clarear uma cor
   */
  private static lightenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + Math.floor(amount * 255));
    const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + Math.floor(amount * 255));
    const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + Math.floor(amount * 255));
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Utilitário para escurecer uma cor
   */
  private static darkenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - Math.floor(amount * 255));
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - Math.floor(amount * 255));
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - Math.floor(amount * 255));
    return `rgb(${r}, ${g}, ${b})`;
  }
}
