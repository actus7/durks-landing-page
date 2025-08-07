import { companyData } from '../data/company';
import { Building2, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
                Quem Somos
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {companyData.description}
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Especialização</h3>
                  <p className="text-muted-foreground text-sm">
                    Engenharia aplicada para agronegócio e setor industrial
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Atuação Nacional</h3>
                  <p className="text-muted-foreground text-sm">
                    Presença em todo território brasileiro
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Equipe Especializada</h3>
                  <p className="text-muted-foreground text-sm">
                    Profissionais experientes e dedicados
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-accent-foreground font-bold text-sm flex items-center justify-center">
                      ⚡
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Soluções Inovadoras</h3>
                  <p className="text-muted-foreground text-sm">
                    Tecnologia aplicada para resultados eficientes
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <Separator className="my-8" />
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Projetos Realizados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <div className="text-sm text-muted-foreground">Suporte Técnico</div>
              </div>
            </div>
          </div>
          
          {/* Visual Column */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Image Placeholder */}
              <div className="aspect-square bg-primary rounded-2xl shadow-2xl flex items-center justify-center text-primary-foreground">
                <div className="text-center">
                  <Building2 className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">DÜRKS</h3>
                  <p className="text-primary-foreground/80">Engenharia de Excelência</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <Card className="absolute -top-6 -right-6 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Projetos Ativos</div>
                      <div className="text-xs text-muted-foreground">Em andamento</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-6 -left-6 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Clientes Satisfeitos</div>
                      <div className="text-xs text-muted-foreground">98% aprovação</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 rounded-2xl transform rotate-3 scale-105 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;