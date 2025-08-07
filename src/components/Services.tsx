import { companyData } from '../data/company';
import { Settings, Wrench, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const Services = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return Settings;
      case 'Wrench':
        return Wrench;
      default:
        return Settings;
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6 px-2">
            Nossos Serviços
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Oferecemos soluções completas em engenharia aplicada, desde consultoria especializada até projetos personalizados para o agronegócio e setor industrial.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {companyData.services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-secondary to-background border border-border rounded-2xl p-8 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary mb-4">Principais serviços:</h4>
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hover Effect Button */}
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="accent"
                      className="w-full font-semibold"
                    >
                      Saiba Mais
                    </Button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-secondary to-orange-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-orange-100 to-secondary rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-secondary to-orange-50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Precisa de uma solução personalizada?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para desenvolver projetos especiais e soluções sob medida para atender às necessidades específicas do seu negócio.
            </p>
            <Button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="accent"
              size="lg"
              className="font-semibold"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;