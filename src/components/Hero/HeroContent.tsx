import React from 'react';
import { companyData } from '../../data/company';
import DurksLogoImage from '../DurksLogoImage';

/**
 * Props para o componente HeroContent
 */
export interface HeroContentProps {
  /** Classes CSS adicionais */
  className?: string;
  /** Callback para scroll para seção de contato */
  onContactClick?: () => void;
  /** Callback para scroll para seção sobre */
  onAboutClick?: () => void;
}

/**
 * Componente que renderiza o conteúdo textual do Hero
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  className = '',
  onContactClick,
  onAboutClick
}) => {
  /**
   * Handler padrão para scroll para contato
   */
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Handler padrão para scroll para sobre
   */
  const handleAboutClick = () => {
    if (onAboutClick) {
      onAboutClick();
    } else {
      const aboutSection = document.getElementById('about');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0 bg-gradient-to-br from-primary via-primary/90 to-primary ${className}`}>
      <div className="max-w-2xl text-center lg:text-left">
        {/* Logo/Brand */}
        <div className="mb-8 sm:mb-10">
          <DurksLogoImage
            className="w-full max-w-[130px] sm:max-w-[156px] lg:max-w-[182px] xl:max-w-[208px] mx-auto lg:mx-0"
            width={208}
            height={125}
          />
        </div>
        
        {/* Main Tagline */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-primary-foreground">
            {companyData.tagline}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-teal-100 leading-relaxed">
            Soluções técnicas especializadas que transformam conhecimento em resultados práticos para o agronegócio e setor industrial.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            onClick={handleContactClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Entre em Contato</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
          </button>
          
          <button
            onClick={handleAboutClick}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-900 transition-all duration-300"
          >
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
