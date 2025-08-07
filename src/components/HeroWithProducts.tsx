import React, { useState } from 'react';
import { companyData } from '../data/company';
import DurksLogoImage from './DurksLogoImage';
import ProductVisualization from './HeroWithProducts/ProductVisualization';
import ProductSelector from './HeroWithProducts/ProductSelector';
import type { RenderMode } from './shared/ThreeControls';

/**
 * Componente HeroWithProducts - versão focada em produtos
 */
const HeroWithProducts: React.FC = () => {
  // Estado do modo de renderização
  const [renderMode, setRenderMode] = useState<RenderMode>('shaded');

  /**
   * Handler para mudança de modo de renderização
   */
  const handleRenderModeChange = (mode: RenderMode) => {
    setRenderMode(mode);
  };

  /**
   * Handler para scroll para seção de contato
   */
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex bg-teal-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>

      {/* Left Sidebar - Product Information */}
      <div className="w-80 flex-shrink-0 p-6 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <DurksLogoImage
            className="h-auto"
          />
        </div>

        {/* Product Selector */}
        <ProductSelector
          currentRenderMode={renderMode}
          onRenderModeChange={handleRenderModeChange}
        />
      </div>

      {/* Right Side - 3D Visualization */}
      <div className="flex-1 relative">
        <ProductVisualization renderMode={renderMode} />
      </div>
    </section>
  );
};

export default HeroWithProducts;