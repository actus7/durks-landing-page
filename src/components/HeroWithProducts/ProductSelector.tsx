import React from 'react';
import { Factory, RotateCcw, Eye } from 'lucide-react';
import { SidebarThreeControls } from '../shared/ThreeControls';
import type { RenderMode } from '../shared/ThreeControls';

/**
 * Props para o componente ProductSelector
 */
export interface ProductSelectorProps {
  /** Modo de renderização atual */
  currentRenderMode: RenderMode;
  /** Callback para mudança de modo de renderização */
  onRenderModeChange: (mode: RenderMode) => void;
  /** Se os controles estão desabilitados */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Componente para seleção de produtos e controles de visualização
 */
export const ProductSelector: React.FC<ProductSelectorProps> = ({
  currentRenderMode,
  onRenderModeChange,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`bg-teal-900/70 backdrop-blur-sm border border-teal-700 rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">
          Produtos Durks
        </h2>
        <p className="text-teal-200 text-sm">
          Soluções completas para armazenamento de grãos
        </p>
      </div>

      {/* Product Info */}
      <div className="mb-6">
        <div className="bg-teal-800/50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Silo de Grãos
          </h3>
          <p className="text-teal-100 text-sm mb-3">
            Sistema completo de armazenamento com estrutura metálica corrugada, 
            sistema de aeração e controle de temperatura.
          </p>
          
          {/* Specifications */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-teal-200">Capacidade:</span>
              <span className="text-white">500 - 10.000 ton</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-teal-200">Material:</span>
              <span className="text-white">Aço galvanizado</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-teal-200">Diâmetro:</span>
              <span className="text-white">3,66 - 27,43 m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-teal-200">Altura:</span>
              <span className="text-white">6 - 30 m</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-teal-200 mb-2">
            Características:
          </h4>
          <ul className="space-y-1 text-xs text-teal-100">
            <li className="flex items-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
              Estrutura corrugada para maior resistência
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
              Sistema de aeração integrado
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
              Teto cônico para escoamento
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
              Base de concreto reforçada
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
              Escada de acesso com guarda-corpo
            </li>
          </ul>
        </div>
      </div>

      {/* Render Mode Controls */}
      <div className="mb-6">
        <SidebarThreeControls
          currentMode={currentRenderMode}
          onModeChange={onRenderModeChange}
          disabled={disabled}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          className="w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={disabled}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Solicitar Orçamento
        </button>
        
        <button
          className="w-full px-4 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded-lg hover:bg-teal-400 hover:text-teal-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Saiba Mais
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-teal-700">
        <p className="text-xs text-teal-300 text-center">
          Projetos customizados conforme necessidade
        </p>
      </div>
    </div>
  );
};

export default ProductSelector;
