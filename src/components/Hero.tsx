import React from 'react';
import HeroContent from './Hero/HeroContent';
import Hero3DVisualization from './Hero/Hero3DVisualization';

/**
 * Componente principal Hero - orquestra HeroContent e Hero3DVisualization
 */
const Hero: React.FC = () => {
  /**
   * Handler para scroll para seção de contato
   */
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handler para scroll para seção sobre
   */
  const handleAboutClick = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Text Content */}
        <HeroContent
          onContactClick={handleContactClick}
          onAboutClick={handleAboutClick}
        />

        {/* Right Side - 3D Visualization */}
        <Hero3DVisualization
          enableAutoSwitch={true}
          autoSwitchInterval={8000}
        />
      </div>
    </section>
  );
};

export default Hero;