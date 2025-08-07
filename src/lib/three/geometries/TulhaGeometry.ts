import * as THREE from 'three';
import { TextureFactory } from '../TextureFactory';

/**
 * Configurações para criação da geometria da tulha graneleira
 */
export interface TulhaGeometryConfig {
  legHeight?: number;
  legRadius?: number;
  legSpacing?: number;
  bodyRadius?: number;
  bodyHeight?: number;
  bodySegments?: number;
  roofHeight?: number;
  platformSize?: number;
  platformHeight?: number;
  hopperRadius?: number;
  hopperHeight?: number;
  ladderWidth?: number;
  ladderOffset?: number;
  rungCount?: number;
  rungSpacing?: number;
  braceRadius?: number;
  braceLength?: number;
  bodyColor?: number;
  roofColor?: number;
  legColor?: number;
  platformColor?: number;
  hopperColor?: number;
  ladderColor?: number;
  braceColor?: number;
}

/**
 * Configurações padrão para a tulha
 */
const DEFAULT_CONFIG: Required<TulhaGeometryConfig> = {
  legHeight: 8,
  legRadius: 0.3,
  legSpacing: 3,
  bodyRadius: 4,
  bodyHeight: 6,
  bodySegments: 32,
  roofHeight: 2,
  platformSize: 8,
  platformHeight: 0.3,
  hopperRadius: 1.2,
  hopperHeight: 2,
  ladderWidth: 0.08,
  ladderOffset: 0.5,
  rungCount: 15,
  rungSpacing: 0.5,
  braceRadius: 0.1,
  braceLength: 6,
  bodyColor: 0xd0d0d0,
  roofColor: 0xb0b0b0,
  legColor: 0x666666,
  platformColor: 0x777777,
  hopperColor: 0x888888,
  ladderColor: 0x444444,
  braceColor: 0x555555
};

/**
 * Posições das pernas da tulha
 */
const LEG_POSITIONS = [
  { x: 3, z: 3 },
  { x: -3, z: 3 },
  { x: 3, z: -3 },
  { x: -3, z: -3 }
];

/**
 * Cria a geometria completa de uma tulha graneleira (silo elevado)
 */
export class TulhaGeometry {
  /**
   * Cria um grupo Three.js contendo toda a geometria da tulha
   */
  static create(config: TulhaGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const tulhaGroup = new THREE.Group();
    
    // Criar textura corrugada
    const corrugatedTexture = TextureFactory.createCorrugatedTexture();
    
    // Adicionar componentes da tulha
    this.addSupportLegs(tulhaGroup, finalConfig);
    this.addCrossBracing(tulhaGroup, finalConfig);
    this.addPlatform(tulhaGroup, finalConfig);
    this.addBody(tulhaGroup, corrugatedTexture, finalConfig);
    this.addRoof(tulhaGroup, finalConfig);
    this.addDischargeHopper(tulhaGroup, finalConfig);
    this.addAccessLadder(tulhaGroup, finalConfig);
    
    return tulhaGroup;
  }

  /**
   * Adiciona as pernas de suporte da tulha
   */
  private static addSupportLegs(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const legGeometry = new THREE.CylinderGeometry(
      config.legRadius, 
      config.legRadius, 
      config.legHeight, 
      16
    );
    const legMaterial = new THREE.MeshPhongMaterial({ 
      color: config.legColor 
    });

    LEG_POSITIONS.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos.x, config.legHeight / 2, pos.z);
      leg.castShadow = true;
      group.add(leg);
    });
  }

  /**
   * Adiciona contraventamentos entre as pernas
   */
  private static addCrossBracing(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const braceGeometry = new THREE.CylinderGeometry(
      config.braceRadius, 
      config.braceRadius, 
      config.braceLength, 
      8
    );
    const braceMaterial = new THREE.MeshPhongMaterial({ 
      color: config.braceColor 
    });

    // Contraventamentos horizontais em 3 níveis
    for (let i = 0; i < 3; i++) {
      const height = 2 + i * 2;
      
      LEG_POSITIONS.forEach((pos, idx) => {
        // Contraventamentos na direção Z (frente-trás)
        if (idx < 2) {
          const brace = new THREE.Mesh(braceGeometry, braceMaterial);
          brace.position.set(0, height, pos.z);
          brace.rotation.z = Math.PI / 2;
          brace.castShadow = true;
          group.add(brace);
        }
        
        // Contraventamentos na direção X (esquerda-direita)
        if (idx === 0 || idx === 2) {
          const brace = new THREE.Mesh(braceGeometry, braceMaterial);
          brace.position.set(pos.x, height, 0);
          brace.rotation.x = Math.PI / 2;
          brace.castShadow = true;
          group.add(brace);
        }
      });
    }
  }

  /**
   * Adiciona a plataforma de suporte
   */
  private static addPlatform(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const platformGeometry = new THREE.BoxGeometry(
      config.platformSize, 
      config.platformHeight, 
      config.platformSize
    );
    const platformMaterial = new THREE.MeshPhongMaterial({ 
      color: config.platformColor 
    });
    
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = config.legHeight + config.platformHeight / 2;
    platform.castShadow = true;
    platform.receiveShadow = true;
    
    group.add(platform);
  }

  /**
   * Adiciona o corpo principal da tulha
   */
  private static addBody(
    group: THREE.Group, 
    texture: THREE.Texture, 
    config: Required<TulhaGeometryConfig>
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
    
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = config.legHeight + config.platformHeight + config.bodyHeight / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    
    group.add(body);
  }

  /**
   * Adiciona o teto cônico da tulha
   */
  private static addRoof(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const roofGeometry = new THREE.ConeGeometry(
      config.bodyRadius + 0.1, 
      config.roofHeight, 
      config.bodySegments
    );
    const roofMaterial = new THREE.MeshPhongMaterial({ 
      color: config.roofColor 
    });
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = config.legHeight + config.platformHeight + config.bodyHeight + config.roofHeight / 2;
    roof.castShadow = true;
    
    group.add(roof);
  }

  /**
   * Adiciona o funil de descarga
   */
  private static addDischargeHopper(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const hopperGeometry = new THREE.ConeGeometry(
      config.hopperRadius, 
      config.hopperHeight, 
      8
    );
    const hopperMaterial = new THREE.MeshPhongMaterial({ 
      color: config.hopperColor 
    });
    
    const hopper = new THREE.Mesh(hopperGeometry, hopperMaterial);
    hopper.position.set(0, config.legHeight - 1, 0);
    hopper.rotation.x = Math.PI; // Invertido para baixo
    hopper.castShadow = true;
    
    group.add(hopper);
  }

  /**
   * Adiciona a escada de acesso
   */
  private static addAccessLadder(
    group: THREE.Group, 
    config: Required<TulhaGeometryConfig>
  ): void {
    const ladderRailGeometry = new THREE.BoxGeometry(
      config.ladderWidth, 
      config.legHeight, 
      config.ladderWidth
    );
    const ladderMaterial = new THREE.MeshPhongMaterial({ 
      color: config.ladderColor 
    });

    // Trilho esquerdo
    const leftRail = new THREE.Mesh(ladderRailGeometry, ladderMaterial);
    leftRail.position.set(0, config.legHeight / 2, config.bodyRadius + config.ladderOffset);
    leftRail.castShadow = true;
    group.add(leftRail);

    // Trilho direito
    const rightRail = new THREE.Mesh(ladderRailGeometry, ladderMaterial);
    rightRail.position.set(0.4, config.legHeight / 2, config.bodyRadius + config.ladderOffset);
    rightRail.castShadow = true;
    group.add(rightRail);

    // Degraus da escada
    const rungGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
    const rungMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333 
    });

    for (let i = 0; i < config.rungCount; i++) {
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);
      rung.position.set(
        0.2, 
        0.5 + i * config.rungSpacing, 
        config.bodyRadius + config.ladderOffset
      );
      rung.rotation.z = Math.PI / 2;
      rung.castShadow = true;
      group.add(rung);
    }
  }

  /**
   * Cria uma versão simplificada da tulha (menos detalhes para melhor performance)
   */
  static createSimplified(config: TulhaGeometryConfig = {}): THREE.Group {
    const finalConfig = { 
      ...DEFAULT_CONFIG, 
      ...config,
      bodySegments: 16, // Menos segmentos
      rungCount: 8 // Menos degraus
    };
    
    const tulhaGroup = new THREE.Group();
    const corrugatedTexture = TextureFactory.createCorrugatedTexture();
    
    // Apenas componentes principais
    this.addSupportLegs(tulhaGroup, finalConfig);
    this.addPlatform(tulhaGroup, finalConfig);
    this.addBody(tulhaGroup, corrugatedTexture, finalConfig);
    this.addRoof(tulhaGroup, finalConfig);
    
    return tulhaGroup;
  }

  /**
   * Cria apenas a estrutura de suporte (sem o corpo da tulha)
   */
  static createSupportOnly(config: TulhaGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const tulhaGroup = new THREE.Group();
    
    this.addSupportLegs(tulhaGroup, finalConfig);
    this.addCrossBracing(tulhaGroup, finalConfig);
    this.addPlatform(tulhaGroup, finalConfig);
    
    return tulhaGroup;
  }
}
