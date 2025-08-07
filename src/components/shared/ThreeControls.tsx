import React from 'react';
import { Box, Grid3x3, Eye, Factory, RotateCcw, Plus, Minus, RotateCw, Pause, Play } from 'lucide-react';

/**
 * Tipos de modo de renderização suportados
 */
export type RenderMode = 'shaded' | 'wireframe' | 'xray';

/**
 * Variantes de layout para os controles
 */
export type ControlsVariant = 'vertical' | 'horizontal' | 'sidebar';

/**
 * Temas de cores para os controles
 */
export type ControlsTheme = 'teal' | 'neutral';

/**
 * Estado dos controles de interação
 */
export interface InteractionControls {
  rotation: boolean;
  autoRotation: boolean;
}

/**
 * Props para o componente ThreeControls
 */
export interface ThreeControlsProps {
  /** Modo de renderização atual */
  currentMode: RenderMode;
  /** Callback chamado quando o modo de renderização muda */
  onModeChange: (mode: RenderMode) => void;
  /** Variante de layout dos controles */
  variant?: ControlsVariant;
  /** Tema de cores */
  theme?: ControlsTheme;
  /** Classes CSS adicionais */
  className?: string;
  /** Se deve mostrar labels nos botões */
  showLabels?: boolean;
  /** Se deve mostrar ícones nos botões */
  showIcons?: boolean;
  /** Tamanho dos ícones */
  iconSize?: number;
  /** Se os controles estão desabilitados */
  disabled?: boolean;
  /** Estado dos controles de interação */
  interactionControls?: InteractionControls;
  /** Callback para mudanças nos controles de interação */
  onInteractionChange?: (control: keyof InteractionControls, enabled: boolean) => void;
  /** Callback para zoom in */
  onZoomIn?: () => void;
  /** Callback para zoom out */
  onZoomOut?: () => void;
  /** Se deve mostrar controles de interação */
  showInteractionControls?: boolean;
}

/**
 * Configurações de tema
 */
const THEME_CONFIGS = {
  teal: {
    active: 'bg-primary border-primary text-primary-foreground shadow-lg',
    inactive: 'bg-white/10 border-white/20 text-white hover:bg-primary/30 hover:border-primary hover:text-white'
  },
  neutral: {
    active: 'bg-muted-foreground border-muted-foreground text-white shadow-lg',
    inactive: 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:text-white'
  }
};

/**
 * Configurações dos modos de renderização
 */
const MODE_CONFIGS = {
  shaded: {
    icon: Box,
    label: 'Visualização Sólida',
    title: 'Visualização Sólida',
    sidebarIcon: Factory
  },
  wireframe: {
    icon: Grid3x3,
    label: 'Estrutura Wireframe',
    title: 'Visualização Wireframe',
    sidebarIcon: RotateCcw
  },
  xray: {
    icon: Eye,
    label: 'Visão Transparente',
    title: 'Visualização Transparente',
    sidebarIcon: Eye
  }
};

/**
 * Componente reutilizável para controles de renderização 3D
 */
export const ThreeControls: React.FC<ThreeControlsProps> = ({
  currentMode,
  onModeChange,
  variant = 'vertical',
  theme = 'teal',
  className = '',
  showLabels = false,
  showIcons = true,
  iconSize = 5,
  disabled = false,
  interactionControls,
  onInteractionChange,
  onZoomIn,
  onZoomOut,
  showInteractionControls = false
}) => {
  const themeConfig = THEME_CONFIGS[theme];
  const modes: RenderMode[] = ['shaded', 'wireframe', 'xray'];

  /**
   * Renderiza um botão de controle
   */
  const renderControlButton = (mode: RenderMode) => {
    const config = MODE_CONFIGS[mode];
    const isActive = currentMode === mode;
    const IconComponent = variant === 'sidebar' ? config.sidebarIcon : config.icon;

    const baseClasses = 'flex items-center justify-center gap-2 text-sm rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg';
    const sizeClasses = variant === 'sidebar' 
      ? 'px-4 py-3' 
      : showLabels 
        ? 'px-4 py-3' 
        : 'p-3 min-w-[48px] min-h-[48px]';
    
    const stateClasses = themeConfig.inactive; // Usar estilo padrão para botões de interação
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return (
      <button
        key={mode}
        onClick={() => !disabled && onModeChange(mode)}
        className={`${baseClasses} ${sizeClasses} ${stateClasses} ${disabledClasses}`}
        title={config.title}
        disabled={disabled}
      >
        {showIcons && <IconComponent className={`w-${iconSize} h-${iconSize}`} />}
        {showLabels && <span>{config.label}</span>}
      </button>
    );
  };

  /**
   * Classes de container baseadas na variante
   */
  const getContainerClasses = () => {
    const baseClasses = 'flex gap-3';
    
    switch (variant) {
      case 'horizontal':
        return `${baseClasses} flex-row`;
      case 'vertical':
        return `${baseClasses} flex-col`;
      case 'sidebar':
        return `${baseClasses} flex-col`;
      default:
        return `${baseClasses} flex-col`;
    }
  };

  /**
   * Renderiza um botão de controle de interação
   */
  const renderInteractionButton = (
    control: keyof InteractionControls,
    icon: React.ComponentType<any>,
    label: string,
    title: string
  ) => {
    if (!interactionControls || !onInteractionChange) return null;

    const isActive = interactionControls[control];
    const IconComponent = icon;

    const baseClasses = 'flex items-center justify-center gap-2 text-sm rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg';
    const sizeClasses = variant === 'sidebar' 
      ? 'px-4 py-3' 
      : showLabels 
        ? 'px-4 py-3' 
        : 'p-3 min-w-[48px] min-h-[48px]';
    
    const stateClasses = themeConfig.inactive; // Usar estilo padrão para botões de interação
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return (
      <button
        key={control}
        onClick={() => !disabled && onInteractionChange(control, !isActive)}
        className={`${baseClasses} ${sizeClasses} ${stateClasses} ${disabledClasses}`}
        title={title}
        disabled={disabled}
      >
        {showIcons && <IconComponent className={`w-${iconSize} h-${iconSize}`} />}
        {showLabels && <span>{label}</span>}
      </button>
    );
  };

  /**
   * Renderiza um botão de zoom
   */
  const renderZoomButton = (
    type: 'in' | 'out',
    icon: React.ComponentType<any>,
    label: string,
    title: string,
    onClick: () => void
  ) => {
    const IconComponent = icon;

    const baseClasses = 'flex items-center justify-center gap-2 text-sm rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg';
    const sizeClasses = variant === 'sidebar' 
      ? 'px-4 py-3' 
      : showLabels 
        ? 'px-4 py-3' 
        : 'p-3 min-w-[48px] min-h-[48px]';
    
    const stateClasses = themeConfig.inactive; // Sempre usar estilo inativo para botões de ação
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return (
      <button
        key={`zoom-${type}`}
        onClick={() => !disabled && onClick()}
        className={`${baseClasses} ${sizeClasses} ${stateClasses} ${disabledClasses}`}
        title={title}
        disabled={disabled}
      >
        {showIcons && <IconComponent className={`w-${iconSize} h-${iconSize}`} />}
        {showLabels && <span>{label}</span>}
      </button>
    );
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {variant === 'sidebar' && (
        <h3 className="text-sm font-semibold mb-1 text-teal-200">
          Visualização
        </h3>
      )}
      {modes.map(renderControlButton)}

      {showInteractionControls && (
        <>
          {/* Separador */}
          <div className="border-t border-teal-700 my-3" />

          {variant === 'sidebar' && (
            <h3 className="text-sm font-semibold mb-1 text-teal-200">
              Controles
            </h3>
          )}

          {/* Botões de Zoom */}
          {onZoomIn && renderZoomButton('in', Plus, 'Zoom +', 'Aumentar Zoom', onZoomIn)}
          {onZoomOut && renderZoomButton('out', Minus, 'Zoom -', 'Diminuir Zoom', onZoomOut)}

          {/* Controles de Interação */}
          {interactionControls && onInteractionChange && (
            <>
              {renderInteractionButton('rotation', RotateCw, 'Rotação Manual', 'Ativar/Desativar Rotação Manual')}
              {renderInteractionButton('autoRotation', interactionControls.autoRotation ? Pause : Play, 'Rotação Automática', 'Ativar/Desativar Rotação Automática')}
            </>
          )}
        </>
      )}
    </div>
  );
};

/**
 * Props para controles verticais com interação
 */
export interface VerticalThreeControlsProps extends Omit<ThreeControlsProps, 'variant'> {
  /** Controles de interação */
  interactionControls?: InteractionControls;
  /** Callback para mudanças nos controles de interação */
  onInteractionChange?: (control: keyof InteractionControls, enabled: boolean) => void;
  /** Callback para zoom in */
  onZoomIn?: () => void;
  /** Callback para zoom out */
  onZoomOut?: () => void;
}

/**
 * Componente especializado para controles verticais (usado no Hero e SiloVisualization)
 */
export const VerticalThreeControls: React.FC<VerticalThreeControlsProps> = (props) => (
  <ThreeControls
    {...props}
    variant="vertical"
    showInteractionControls={!!(props.interactionControls || props.onZoomIn || props.onZoomOut)}
  />
);

/**
 * Componente especializado para controles horizontais
 */
export const HorizontalThreeControls: React.FC<Omit<ThreeControlsProps, 'variant'>> = (props) => (
  <ThreeControls {...props} variant="horizontal" />
);

/**
 * Componente especializado para sidebar (usado no HeroWithProducts)
 */
export const SidebarThreeControls: React.FC<Omit<ThreeControlsProps, 'variant'>> = (props) => (
  <ThreeControls {...props} variant="sidebar" showLabels={true} theme="teal" />
);

/**
 * Hook para gerenciar estado dos controles de renderização
 */
export const useRenderMode = (initialMode: RenderMode = 'shaded') => {
  const [renderMode, setRenderMode] = React.useState<RenderMode>(initialMode);

  const handleModeChange = React.useCallback((mode: RenderMode) => {
    setRenderMode(mode);
  }, []);

  return {
    renderMode,
    setRenderMode,
    handleModeChange
  };
};

export default ThreeControls;
