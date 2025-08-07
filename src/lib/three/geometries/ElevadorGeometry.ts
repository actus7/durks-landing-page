import * as THREE from 'three';

/**
 * Configurações para criação da geometria do elevador de canecas
 */
export interface ElevadorGeometryConfig {
  towerWidth?: number;
  towerDepth?: number;
  towerHeight?: number;
  baseSize?: number;
  baseHeight?: number;
  motorWidth?: number;
  motorHeight?: number;
  motorDepth?: number;
  pulleyRadius?: number;
  pulleyHeight?: number;
  beltWidth?: number;
  beltThickness?: number;
  bucketWidth?: number;
  bucketHeight?: number;
  bucketDepth?: number;
  bucketSpacing?: number;
  platformWidth?: number;
  platformHeight?: number;
  platformDepth?: number;
  ladderWidth?: number;
  ladderDepth?: number;
  braceRadius?: number;
  braceLength?: number;
  windowWidth?: number;
  windowHeight?: number;
  chuteWidth?: number;
  chuteHeight?: number;
  chuteDepth?: number;
  hopperRadius?: number;
  hopperHeight?: number;
  towerColor?: number;
  baseColor?: number;
  motorColor?: number;
  pulleyColor?: number;
  beltColor?: number;
  bucketColor?: number;
  platformColor?: number;
  ladderColor?: number;
  braceColor?: number;
  windowColor?: number;
  chuteColor?: number;
  hopperColor?: number;
}

/**
 * Configurações padrão para o elevador
 */
const DEFAULT_CONFIG: Required<ElevadorGeometryConfig> = {
  towerWidth: 1.5,
  towerDepth: 1.2,
  towerHeight: 20,
  baseSize: 3,
  baseHeight: 1,
  motorWidth: 2,
  motorHeight: 1.5,
  motorDepth: 1.8,
  pulleyRadius: 0.4,
  pulleyHeight: 0.3,
  beltWidth: 0.15,
  beltThickness: 0.05,
  bucketWidth: 0.25,
  bucketHeight: 0.2,
  bucketDepth: 0.2,
  bucketSpacing: 0.8,
  platformWidth: 2.5,
  platformHeight: 0.1,
  platformDepth: 1.5,
  ladderWidth: 0.1,
  ladderDepth: 0.3,
  braceRadius: 0.08,
  braceLength: 3,
  windowWidth: 0.6,
  windowHeight: 0.8,
  chuteWidth: 1,
  chuteHeight: 0.5,
  chuteDepth: 1.5,
  hopperRadius: 0.8,
  hopperHeight: 1.2,
  towerColor: 0x888888,
  baseColor: 0x606060,
  motorColor: 0x444444,
  pulleyColor: 0x333333,
  beltColor: 0x222222,
  bucketColor: 0x666666,
  platformColor: 0x777777,
  ladderColor: 0x444444,
  braceColor: 0x555555,
  windowColor: 0x87CEEB,
  chuteColor: 0x666666,
  hopperColor: 0x777777
};

/**
 * Cria a geometria completa de um elevador de canecas
 */
export class ElevadorGeometry {
  /**
   * Cria um grupo Three.js contendo toda a geometria do elevador
   */
  static create(config: ElevadorGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const elevadorGroup = new THREE.Group();
    
    // Adicionar componentes do elevador
    this.addTowerStructure(elevadorGroup, finalConfig);
    this.addBase(elevadorGroup, finalConfig);
    this.addMotorHousing(elevadorGroup, finalConfig);
    this.addPulleys(elevadorGroup, finalConfig);
    this.addBeltSystem(elevadorGroup, finalConfig);
    this.addBuckets(elevadorGroup, finalConfig);
    this.addPlatforms(elevadorGroup, finalConfig);
    this.addAccessLadder(elevadorGroup, finalConfig);
    this.addSupportBraces(elevadorGroup, finalConfig);
    this.addInspectionWindows(elevadorGroup, finalConfig);
    this.addDischargeChute(elevadorGroup, finalConfig);
    this.addFeedHopper(elevadorGroup, finalConfig);
    
    return elevadorGroup;
  }

  /**
   * Adiciona a estrutura principal da torre
   */
  private static addTowerStructure(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const towerGeometry = new THREE.BoxGeometry(
      config.towerWidth, 
      config.towerHeight, 
      config.towerDepth
    );
    const towerMaterial = new THREE.MeshPhongMaterial({
      color: config.towerColor,
      side: THREE.DoubleSide
    });
    
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = config.towerHeight / 2;
    tower.castShadow = true;
    tower.receiveShadow = true;
    
    group.add(tower);
  }

  /**
   * Adiciona a base/fundação de concreto
   */
  private static addBase(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const baseGeometry = new THREE.BoxGeometry(
      config.baseSize, 
      config.baseHeight, 
      config.baseSize
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
   * Adiciona o compartimento do motor no topo
   */
  private static addMotorHousing(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const motorGeometry = new THREE.BoxGeometry(
      config.motorWidth, 
      config.motorHeight, 
      config.motorDepth
    );
    const motorMaterial = new THREE.MeshPhongMaterial({ 
      color: config.motorColor 
    });
    
    const motor = new THREE.Mesh(motorGeometry, motorMaterial);
    motor.position.y = config.towerHeight + config.motorHeight / 2;
    motor.castShadow = true;
    
    group.add(motor);
  }

  /**
   * Adiciona as polias superior e inferior
   */
  private static addPulleys(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const pulleyGeometry = new THREE.CylinderGeometry(
      config.pulleyRadius, 
      config.pulleyRadius, 
      config.pulleyHeight, 
      16
    );
    const pulleyMaterial = new THREE.MeshPhongMaterial({ 
      color: config.pulleyColor 
    });

    // Polia superior
    const topPulley = new THREE.Mesh(pulleyGeometry, pulleyMaterial);
    topPulley.position.set(0, config.towerHeight + config.motorHeight + config.pulleyHeight, 0);
    topPulley.rotation.x = Math.PI / 2;
    topPulley.castShadow = true;
    group.add(topPulley);

    // Polia inferior
    const bottomPulley = new THREE.Mesh(pulleyGeometry, pulleyMaterial);
    bottomPulley.position.set(0, 1.5, 0);
    bottomPulley.rotation.x = Math.PI / 2;
    bottomPulley.castShadow = true;
    group.add(bottomPulley);
  }

  /**
   * Adiciona o sistema de correia/corrente
   */
  private static addBeltSystem(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const beltGeometry = new THREE.BoxGeometry(
      config.beltWidth, 
      config.towerHeight - 1, 
      config.beltThickness
    );
    const beltMaterial = new THREE.MeshPhongMaterial({ 
      color: config.beltColor 
    });

    // Correia frontal
    const frontBelt = new THREE.Mesh(beltGeometry, beltMaterial);
    frontBelt.position.set(0.3, config.towerHeight / 2 + 0.5, 0);
    frontBelt.castShadow = true;
    group.add(frontBelt);

    // Correia traseira
    const backBelt = new THREE.Mesh(beltGeometry, beltMaterial);
    backBelt.position.set(-0.3, config.towerHeight / 2 + 0.5, 0);
    backBelt.castShadow = true;
    group.add(backBelt);
  }

  /**
   * Adiciona as canecas ao longo da correia
   */
  private static addBuckets(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const bucketGeometry = new THREE.BoxGeometry(
      config.bucketWidth, 
      config.bucketHeight, 
      config.bucketDepth
    );
    const bucketMaterial = new THREE.MeshPhongMaterial({ 
      color: config.bucketColor 
    });

    // Adicionar canecas a cada intervalo ao longo da correia frontal
    const bucketCount = Math.floor(config.towerHeight / config.bucketSpacing);
    for (let i = 0; i < bucketCount; i++) {
      const bucket = new THREE.Mesh(bucketGeometry, bucketMaterial);
      bucket.position.set(0.4, 2 + i * config.bucketSpacing, 0);
      bucket.castShadow = true;
      group.add(bucket);
    }
  }

  /**
   * Adiciona plataformas de acesso em diferentes níveis
   */
  private static addPlatforms(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const platformGeometry = new THREE.BoxGeometry(
      config.platformWidth, 
      config.platformHeight, 
      config.platformDepth
    );
    const platformMaterial = new THREE.MeshPhongMaterial({ 
      color: config.platformColor 
    });

    // Plataforma do meio
    const midPlatform = new THREE.Mesh(platformGeometry, platformMaterial);
    midPlatform.position.set(1.5, config.towerHeight / 2, 0);
    midPlatform.castShadow = true;
    group.add(midPlatform);

    // Plataforma superior
    const topPlatform = new THREE.Mesh(platformGeometry, platformMaterial);
    topPlatform.position.set(1.5, config.towerHeight - 2, 0);
    topPlatform.castShadow = true;
    group.add(topPlatform);
  }

  /**
   * Adiciona escada de acesso
   */
  private static addAccessLadder(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const ladderGeometry = new THREE.BoxGeometry(
      config.ladderWidth, 
      config.towerHeight - 2, 
      config.ladderDepth
    );
    const ladderMaterial = new THREE.MeshPhongMaterial({ 
      color: config.ladderColor 
    });
    
    const ladder = new THREE.Mesh(ladderGeometry, ladderMaterial);
    ladder.position.set(2.2, (config.towerHeight - 2) / 2 + 1, 0);
    ladder.castShadow = true;
    group.add(ladder);

    // Degraus da escada
    const rungGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8);
    const rungMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    const rungCount = Math.floor((config.towerHeight - 2) / 0.5);
    for (let i = 0; i < rungCount; i++) {
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);
      rung.position.set(2.0, 1.5 + i * 0.5, 0);
      rung.rotation.z = Math.PI / 2;
      rung.castShadow = true;
      group.add(rung);
    }
  }

  /**
   * Adiciona estrutura de suporte (contraventamentos diagonais)
   */
  private static addSupportBraces(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
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

    // Contraventamentos diagonais nas laterais
    for (let i = 0; i < 4; i++) {
      const height = 3 + i * 4;
      
      const brace1 = new THREE.Mesh(braceGeometry, braceMaterial);
      brace1.position.set(1.2, height, 0.8);
      brace1.rotation.z = Math.PI / 6;
      brace1.castShadow = true;
      group.add(brace1);

      const brace2 = new THREE.Mesh(braceGeometry, braceMaterial);
      brace2.position.set(1.2, height, -0.8);
      brace2.rotation.z = Math.PI / 6;
      brace2.castShadow = true;
      group.add(brace2);
    }
  }

  /**
   * Adiciona janelas de inspeção
   */
  private static addInspectionWindows(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const windowGeometry = new THREE.PlaneGeometry(
      config.windowWidth, 
      config.windowHeight
    );
    const windowMaterial = new THREE.MeshPhongMaterial({
      color: config.windowColor,
      transparent: true,
      opacity: 0.3
    });

    // Janela frontal de inspeção
    const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow.position.set(0, config.towerHeight / 2, config.towerDepth / 2 + 0.01);
    group.add(frontWindow);
  }

  /**
   * Adiciona calha de descarga na parte inferior
   */
  private static addDischargeChute(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
  ): void {
    const chuteGeometry = new THREE.BoxGeometry(
      config.chuteWidth, 
      config.chuteHeight, 
      config.chuteDepth
    );
    const chuteMaterial = new THREE.MeshPhongMaterial({ 
      color: config.chuteColor 
    });
    
    const chute = new THREE.Mesh(chuteGeometry, chuteMaterial);
    chute.position.set(1.5, 1.25, 0);
    chute.castShadow = true;
    
    group.add(chute);
  }

  /**
   * Adiciona funil de alimentação na parte inferior
   */
  private static addFeedHopper(
    group: THREE.Group, 
    config: Required<ElevadorGeometryConfig>
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
    hopper.position.set(-1.5, 1.6, 0);
    hopper.rotation.x = Math.PI; // Invertido
    hopper.castShadow = true;
    
    group.add(hopper);
  }

  /**
   * Cria uma versão simplificada do elevador (menos detalhes para melhor performance)
   */
  static createSimplified(config: ElevadorGeometryConfig = {}): THREE.Group {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const elevadorGroup = new THREE.Group();
    
    // Apenas componentes principais
    this.addTowerStructure(elevadorGroup, finalConfig);
    this.addBase(elevadorGroup, finalConfig);
    this.addMotorHousing(elevadorGroup, finalConfig);
    this.addBeltSystem(elevadorGroup, finalConfig);
    
    return elevadorGroup;
  }
}
