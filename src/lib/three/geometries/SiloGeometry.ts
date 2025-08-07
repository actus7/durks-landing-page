import * as THREE from 'three';
import { TextureFactory } from '../TextureFactory';

/**
 * Configurações para criação da geometria do silo
 */
export interface SiloGeometryConfig {
  bodyRadius?: number;
  bodyHeight?: number;
  bodySegments?: number;
  roofHeight?: number;
  baseHeight?: number;
  baseTopRadius?: number;
  baseBottomRadius?: number;
  ringCount?: number;
  ringSpacing?: number;
  doorWidth?: number;
  doorHeight?: number;
  capRadius?: number;
  capHeight?: number;
  bodyColor?: number;
  roofColor?: number;
  baseColor?: number;
  ringColor?: number;
  doorColor?: number;
  capColor?: number;
}

/**
 * Configurações padrão para o silo
 */
const DEFAULT_CONFIG: Required<SiloGeometryConfig> = {
  bodyRadius: 7.65,
  bodyHeight: 14.8,
  bodySegments: 64,
  roofHeight: 3.7,
  baseHeight: 0.8,
  baseTopRadius: 9.15, // bodyRadius + 1.5
  baseBottomRadius: 9.65, // bodyRadius + 2
  ringCount: 12,
  ringSpacing: 1.23,
  doorWidth: 0.9,
  doorHeight: 1.8,
  capRadius: 0.5,
  capHeight: 0.3,
  bodyColor: 0xd0d0d0,
  roofColor: 0xb0b0b0,
  baseColor: 0x606060,
  ringColor: 0x666666,
  doorColor: 0x303030,
  capColor: 0x555555
};

/**
 * Cria a geometria completa de um silo de grãos
 */
export class SiloGeometry {
  /**
   * Cria um grupo Three.js contendo toda a geometria do silo
   */
  static create(config: SiloGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const siloGroup = new THREE.Group();
    
    // Criar textura corrugada
    const corrugatedTexture = TextureFactory.createCorrugatedTexture();
    
    // Adicionar componentes do silo
    this.addBody(siloGroup, corrugatedTexture, finalConfig);
    this.addReinforcementRings(siloGroup, finalConfig);
    this.addRoof(siloGroup, finalConfig);
    this.addRoofCap(siloGroup, finalConfig);
    this.addBase(siloGroup, finalConfig);
    this.addAccessDoor(siloGroup, finalConfig);
    
    return siloGroup;
  }

  /**
   * Adiciona o corpo principal do silo
   */
  private static addBody(
    group: THREE.Group, 
    texture: THREE.Texture, 
    config: Required<SiloGeometryConfig>
  ): void {
    const bodyGeometry = new THREE.CylinderGeometry(
      config.bodyRadius,
      config.bodyRadius,
      config.bodyHeight,
      config.bodySegments
    );
    
    const bodyMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      color: config.bodyColor,
      side: THREE.DoubleSide
    });
    
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = config.bodyHeight / 2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    
    group.add(bodyMesh);
  }

  /**
   * Adiciona os anéis de reforço ao redor do corpo do silo
   */
  private static addReinforcementRings(
    group: THREE.Group, 
    config: Required<SiloGeometryConfig>
  ): void {
    const ringGeometry = new THREE.TorusGeometry(
      config.bodyRadius + 0.05, 
      0.06, 
      6, 
      48
    );
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: config.ringColor
    });

    for (let i = 0; i < config.ringCount; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.y = 1.2 + (i * config.ringSpacing);
      ring.rotation.x = Math.PI / 2;
      ring.castShadow = true;
      group.add(ring);
    }
  }

  /**
   * Adiciona o teto cônico do silo
   */
  private static addRoof(
    group: THREE.Group, 
    config: Required<SiloGeometryConfig>
  ): void {
    const roofGeometry = new THREE.ConeGeometry(
      config.bodyRadius + 0.2,
      config.roofHeight,
      config.bodySegments,
      1,
      false,
      0,
      Math.PI * 2
    );
    
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: config.roofColor,
      side: THREE.DoubleSide
    });
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = config.bodyHeight + (config.roofHeight / 2);
    roof.castShadow = true;
    roof.receiveShadow = true;
    
    group.add(roof);
  }

  /**
   * Adiciona a tampa do teto
   */
  private static addRoofCap(
    group: THREE.Group, 
    config: Required<SiloGeometryConfig>
  ): void {
    const capGeometry = new THREE.CylinderGeometry(
      config.capRadius, 
      config.capRadius, 
      config.capHeight, 
      16
    );
    const capMaterial = new THREE.MeshPhongMaterial({
      color: config.capColor
    });
    
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = config.bodyHeight + config.roofHeight;
    cap.castShadow = true;
    
    group.add(cap);
  }

  /**
   * Adiciona a base de concreto do silo
   */
  private static addBase(
    group: THREE.Group, 
    config: Required<SiloGeometryConfig>
  ): void {
    const baseGeometry = new THREE.CylinderGeometry(
      config.baseTopRadius,
      config.baseBottomRadius,
      config.baseHeight,
      32
    );
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: config.baseColor
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = config.baseHeight / 2;
    base.receiveShadow = true;
    base.castShadow = true;
    
    group.add(base);
  }

  /**
   * Adiciona a porta de acesso ao silo
   */
  private static addAccessDoor(
    group: THREE.Group, 
    config: Required<SiloGeometryConfig>
  ): void {
    const doorGeometry = new THREE.PlaneGeometry(
      config.doorWidth, 
      config.doorHeight
    );
    const doorMaterial = new THREE.MeshPhongMaterial({
      color: config.doorColor
    });
    
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(config.bodyRadius - 0.01, 1.0, 0);
    door.rotation.y = Math.PI / 2;
    door.castShadow = true;
    
    group.add(door);
  }

  /**
   * Cria uma versão simplificada do silo (menos detalhes para melhor performance)
   */
  static createSimplified(config: SiloGeometryConfig = {}): THREE.Group {
    const finalConfig = { 
      ...DEFAULT_CONFIG, 
      ...config,
      bodySegments: 32, // Menos segmentos
      ringCount: 6 // Menos anéis
    };
    
    return this.create(finalConfig);
  }

  /**
   * Cria apenas o corpo do silo (sem detalhes)
   */
  static createBodyOnly(config: SiloGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const siloGroup = new THREE.Group();
    
    const corrugatedTexture = TextureFactory.createCorrugatedTexture();
    this.addBody(siloGroup, corrugatedTexture, finalConfig);
    
    return siloGroup;
  }
}
