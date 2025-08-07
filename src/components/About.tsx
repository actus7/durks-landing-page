import { companyData } from '../data/company';
import { Building2, MapPin, Users, Target, Award, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Quem Somos
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conheça a DÜRKS e nossa trajetória de excelência em engenharia aplicada ao agronegócio e setor industrial.
          </p>
        </div>

        {/* Company Description */}
        <div className="mb-8 sm:mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto text-center">
            {companyData.description}
          </p>
        </div>

        {/* Key Features Grid - Full Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-primary mb-2 text-base sm:text-lg">Especialização</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Engenharia aplicada para agronegócio e setor industrial
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-primary mb-2 text-base sm:text-lg">Atuação Nacional</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Presença em todo território brasileiro
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-primary mb-2 text-base sm:text-lg">Equipe Especializada</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Profissionais experientes e dedicados
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-primary mb-2 text-base sm:text-lg">Suporte 24h</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Atendimento técnico sempre disponível
            </p>
          </div>
        </div>

        {/* Call to Action - Centered */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-gradient-to-r from-secondary to-background border border-border">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold text-primary mb-3">Pronto para começar?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Descubra como podemos ajudar seu projeto
              </p>
              <Button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full"
              >
                Fale Conosco
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;