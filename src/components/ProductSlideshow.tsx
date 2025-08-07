import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Wheat, Droplets, Factory, Truck } from 'lucide-react';
import { Button } from './ui/button';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Silos de Armazenamento",
    category: "Armazenagem",
    description: "Sistemas completos de armazenamento para grãos com controle de temperatura e umidade",
    icon: <Factory className="w-8 h-8" />,
    image: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    features: ["Capacidade até 10.000 ton", "Controle automatizado", "Monitoramento remoto"]
  },
  {
    id: 2,
    name: "Sistemas de Irrigação",
    category: "Irrigação",
    description: "Soluções avançadas de irrigação para maximizar a produtividade agrícola",
    icon: <Droplets className="w-8 h-8" />,
    image: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    features: ["Pivô central", "Gotejamento", "Aspersão"]
  },
  {
    id: 3,
    name: "Processamento de Grãos",
    category: "Processamento",
    description: "Equipamentos para beneficiamento e processamento de cereais e oleaginosas",
    icon: <Wheat className="w-8 h-8" />,
    image: "linear-gradient(135deg, #a16207 0%, #eab308 100%)",
    features: ["Limpeza", "Secagem", "Classificação"]
  },
  {
    id: 4,
    name: "Logística e Transporte",
    category: "Logística",
    description: "Sistemas de movimentação e transporte de produtos agroindustriais",
    icon: <Truck className="w-8 h-8" />,
    image: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
    features: ["Correias transportadoras", "Elevadores", "Sistemas pneumáticos"]
  }
];

const ProductSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Soluções completas para o agronegócio, desde o armazenamento até o processamento e logística
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                    {/* Content Side */}
                    <div className="p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <div className="inline-flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
                            {product.icon}
                          </div>
                          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                          {product.name}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {product.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-teal-500 rounded-full" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200">
                        Saiba Mais
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>

                    {/* Visual Side */}
                    <div 
                      className="relative flex items-center justify-center text-white"
                      style={{ background: product.image }}
                    >
                      <div className="text-center">
                        <div className="mb-6 opacity-80">
                          {React.cloneElement(product.icon as React.ReactElement, { 
                            className: "w-24 h-24 mx-auto" 
                          })}
                        </div>
                        <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
                        <p className="text-lg opacity-90">{product.category}</p>
                      </div>
                      
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          {products.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              variant="ghost"
              size="icon"
              className={`w-3 h-3 p-0 rounded-full transition-all duration-300 hover:scale-105 ${
                index === currentSlide
                  ? 'bg-primary scale-125'
                  : 'bg-muted hover:bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <Button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            {isAutoPlaying ? 'Pausar' : 'Reproduzir'} apresentação automática
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlideshow;
