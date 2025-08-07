import React from 'react';
import { Button } from '../ui/button';

/**
 * Tipos de equipamento suportados
 */
export type EquipmentType = 'silo' | 'tulha' | 'elevador';

/**
 * Configuração de um equipamento
 */
export interface EquipmentConfig {
  id: EquipmentType;
  name: string;
  description?: string;
}

/**
 * Props para o componente EquipmentIndicators
 */
export interface EquipmentIndicatorsProps {
  /** Lista de equipamentos disponíveis */
  equipments: EquipmentConfig[];
  /** Equipamento atualmente selecionado */
  currentEquipment: EquipmentType;
  /** Callback chamado quando um equipamento é selecionado */
  onEquipmentChange: (equipment: EquipmentType) => void;
  /** Se está em processo de transição */
  isTransitioning?: boolean;
  /** Classes CSS adicionais */
  className?: string;
  /** Se deve mostrar o label do equipamento atual */
  showLabel?: boolean;
  /** Posição do label */
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Tamanho dos indicadores */
  size?: 'sm' | 'md' | 'lg';
  /** Cor dos indicadores ativos */
  activeColor?: string;
  /** Cor dos indicadores inativos */
  inactiveColor?: string;
  /** Se deve mostrar tooltips */
  showTooltips?: boolean;
}

/**
 * Configurações padrão dos equipamentos
 */
const DEFAULT_EQUIPMENTS: EquipmentConfig[] = [
  {
    id: 'silo',
    name: 'Silo de Grãos',
    description: 'Silo vertical para armazenamento de grãos'
  },
  {
    id: 'tulha',
    name: 'Tulha Graneleira',
    description: 'Silo elevado com estrutura de suporte'
  },
  {
    id: 'elevador',
    name: 'Elevador de Canecas',
    description: 'Sistema de transporte vertical de grãos'
  }
];

/**
 * Configurações de tamanho
 */
const SIZE_CONFIGS = {
  sm: {
    indicator: 'w-2 h-2',
    gap: 'gap-2',
    label: 'text-xs'
  },
  md: {
    indicator: 'w-3 h-3',
    gap: 'gap-3',
    label: 'text-sm'
  },
  lg: {
    indicator: 'w-4 h-4',
    gap: 'gap-4',
    label: 'text-base'
  }
};

/**
 * Componente para indicadores e seleção de equipamentos (memoizado)
 */
export const EquipmentIndicators: React.FC<EquipmentIndicatorsProps> = React.memo(({
  equipments = DEFAULT_EQUIPMENTS,
  currentEquipment,
  onEquipmentChange,
  isTransitioning = false,
  className = '',
  showLabel = true,
  labelPosition = 'right',
  size = 'md',
  activeColor = 'bg-orange-500',
  inactiveColor = 'bg-white/30 hover:bg-white/50',
  showTooltips = true
}) => {
  const sizeConfig = SIZE_CONFIGS[size];

  /**
   * Obtém o equipamento atual
   */
  const getCurrentEquipment = () => {
    return equipments.find(eq => eq.id === currentEquipment);
  };

  /**
   * Renderiza um indicador individual
   */
  const renderIndicator = (equipment: EquipmentConfig) => {
    const isActive = currentEquipment === equipment.id;
    const isDisabled = isTransitioning;

    const baseClasses = `${sizeConfig.indicator} rounded-full transition-all duration-300 cursor-pointer`;
    const stateClasses = isActive 
      ? `${activeColor} shadow-lg scale-125` 
      : inactiveColor;
    const disabledClasses = isDisabled 
      ? 'pointer-events-none opacity-50' 
      : '';

    return (
      <Button
        key={equipment.id}
        onClick={() => !isDisabled && onEquipmentChange(equipment.id)}
        variant="ghost"
        size="icon"
        className={`${baseClasses} ${stateClasses} ${disabledClasses} hover:scale-105`}
        title={showTooltips ? equipment.name : undefined}
        disabled={isDisabled}
        aria-label={`Selecionar ${equipment.name}`}
      />
    );
  };

  /**
   * Renderiza o label do equipamento atual
   */
  const renderLabel = () => {
    if (!showLabel) return null;

    const currentEq = getCurrentEquipment();
    if (!currentEq) return null;

    const labelClasses = `${sizeConfig.label} text-white/80 font-medium`;

    return (
      <div className={labelClasses}>
        {currentEq.name}
      </div>
    );
  };

  /**
   * Obtém as classes do container baseadas na posição do label
   */
  const getContainerClasses = () => {
    const baseClasses = `flex items-center ${sizeConfig.gap}`;
    
    switch (labelPosition) {
      case 'top':
        return `${baseClasses} flex-col-reverse`;
      case 'bottom':
        return `${baseClasses} flex-col`;
      case 'left':
        return `${baseClasses} flex-row-reverse`;
      case 'right':
      default:
        return `${baseClasses} flex-row`;
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {/* Indicadores */}
      <div className={`flex ${sizeConfig.gap} items-center`}>
        {equipments.map((equipment) => renderIndicator(equipment))}
      </div>
      
      {/* Label */}
      {renderLabel()}
    </div>
  );
});

/**
 * Componente especializado para botões de equipamento na parte inferior (usado no Hero)
 */
export const BottomEquipmentIndicators: React.FC<Omit<EquipmentIndicatorsProps, 'labelPosition' | 'className' | 'size' | 'showLabel'>> = React.memo(({
  equipments = DEFAULT_EQUIPMENTS,
  currentEquipment,
  onEquipmentChange,
  isTransitioning = false,
  activeColor = 'bg-teal-500',
  inactiveColor = 'bg-white/20 hover:bg-white/30',
  showTooltips = true
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
        {equipments.map((equipment) => (
          <Button
            key={equipment.id}
            onClick={() => !isTransitioning && onEquipmentChange(equipment.id)}
            disabled={isTransitioning}
            variant="ghost"
            size="sm"
            className={`rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
              currentEquipment === equipment.id
                ? `${activeColor} text-white shadow-lg`
                : `${inactiveColor} text-white`
            }`}
            title={showTooltips ? equipment.name : undefined}
            aria-label={`Selecionar ${equipment.name}`}
          >
            {equipment.name}
          </Button>
        ))}
      </div>
    </div>
  );
});

/**
 * Componente especializado para indicadores compactos
 */
export const CompactEquipmentIndicators: React.FC<Omit<EquipmentIndicatorsProps, 'size' | 'showLabel'>> = React.memo((props) => (
  <EquipmentIndicators 
    {...props} 
    size="sm"
    showLabel={false}
  />
));

/**
 * Hook para gerenciar estado de equipamento com transição
 */
export const useEquipmentState = (initialEquipment: EquipmentType = 'silo') => {
  const [currentEquipment, setCurrentEquipment] = React.useState<EquipmentType>(initialEquipment);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const switchEquipment = React.useCallback((equipment: EquipmentType) => {
    if (isTransitioning || equipment === currentEquipment) return;

    setIsTransitioning(true);
    
    // Simular transição
    setTimeout(() => {
      setCurrentEquipment(equipment);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 100);
  }, [currentEquipment, isTransitioning]);

  return {
    currentEquipment,
    isTransitioning,
    switchEquipment,
    setCurrentEquipment,
    setIsTransitioning
  };
};

/**
 * Hook para auto-switch de equipamentos otimizado
 */
export const useAutoSwitch = (
  equipments: EquipmentConfig[],
  currentEquipment: EquipmentType,
  switchEquipment: (equipment: EquipmentType) => void,
  interval: number = 8000,
  enabled: boolean = true
) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = React.useRef(false);

  const stopAutoSwitch = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const startAutoSwitch = React.useCallback(() => {
    if (!enabled || equipments.length <= 1 || isActiveRef.current) return;

    isActiveRef.current = true;
    stopAutoSwitch(); // Limpar timeout existente

    const scheduleNext = () => {
      if (!isActiveRef.current) return;

      timeoutRef.current = setTimeout(() => {
        if (!isActiveRef.current) return;

        const currentIndex = equipments.findIndex(eq => eq.id === currentEquipment);
        const nextIndex = (currentIndex + 1) % equipments.length;
        const nextEquipment = equipments[nextIndex];
        
        switchEquipment(nextEquipment.id);
        scheduleNext(); // Continue o ciclo
      }, interval);
    };

    scheduleNext();
  }, [enabled, equipments, currentEquipment, switchEquipment, interval, stopAutoSwitch]);

  React.useEffect(() => {
    if (enabled) {
      startAutoSwitch();
    } else {
      stopAutoSwitch();
    }

    return stopAutoSwitch;
  }, [enabled, startAutoSwitch, stopAutoSwitch]);

  // Garantir cleanup quando o componente é desmontado
  React.useEffect(() => {
    return () => {
      stopAutoSwitch();
    };
  }, [stopAutoSwitch]);

  return {
    startAutoSwitch,
    stopAutoSwitch
  };
};

export default EquipmentIndicators;
