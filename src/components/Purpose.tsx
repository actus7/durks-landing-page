import { companyData } from '../data/company';
import { Target, Lightbulb, Zap, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Purpose = () => {
  return (
    <section id="purpose" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030l-15-15h30l-15%2015zm0-15l15%2015h-30l15-15z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent px-2">
            Nosso Propósito
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-4 to-accent mx-auto mb-6 sm:mb-8" />
        </div>

        {/* Main Purpose Statement */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-primary-foreground/90 mb-6 sm:mb-8">
              {companyData.purpose}
            </p>


          </div>
        </div>
        
        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Innovation */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-chart-3 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Inovação</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Buscamos constantemente novas tecnologias e metodologias para oferecer soluções mais eficientes e sustentáveis.
            </p>
          </div>

          {/* Excellence */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-chart-3 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Excelência</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Comprometemo-nos com a qualidade técnica e a entrega de resultados que superem as expectativas dos nossos clientes.
            </p>
          </div>

          {/* Partnership */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-chart-3 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Parceria</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Construímos relacionamentos duradouros baseados na confiança, transparência e no sucesso mútuo.
            </p>
          </div>
        </div>
        
        {/* Impact Statement */}
        <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-primary-foreground">Nosso Impacto</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">+500</div>
                  <div className="text-primary-foreground/80">Projetos Entregues</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">98%</div>
                  <div className="text-primary-foreground/80">Satisfação do Cliente</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-chart-4 mb-2">24/7</div>
                  <div className="text-primary-foreground/80">Suporte Técnico</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">
            Pronto para transformar seu projeto em realidade?
          </h3>
          <Button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="secondary"
            size="lg"
            className="font-semibold"
          >Vamos Conversar</Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
    </section>
  );
};

export default Purpose;