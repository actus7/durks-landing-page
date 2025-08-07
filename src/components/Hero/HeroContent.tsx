import React from 'react';
import { companyData } from '../../data/company';
import { Button } from '../ui/button';
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
    <div className={`flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0 bg-primary ${className}`}>
      <div className="max-w-2xl text-center lg:text-left">
        {/* Logo/Brand */}
        <div className="mb-8 sm:mb-10 flex justify-center items-center">
          <DurksLogoImage
            className="w-full max-w-[260px] sm:max-w-[312px] lg:max-w-[364px] xl:max-w-[416px] mx-auto lg:mx-0"
          />
        </div>
        
        {/* Main Tagline */}
        <div className="mb-4 sm:mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-primary-foreground">
            {companyData.tagline}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-teal-100 leading-relaxed">
            Soluções técnicas especializadas que transformam conhecimento em resultados práticos para o agronegócio e setor industrial.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button
            onClick={handleContactClick}
            variant="secondary"
            size="lg"
            className="font-semibold"
          >Entre em Contato</Button>

          <Button
            onClick={handleAboutClick}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
