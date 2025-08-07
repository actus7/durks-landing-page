import { useState } from 'react';
import { companyData } from '../data/company';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6 px-2">
            Entre em Contato
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Estamos prontos para discutir seu projeto e encontrar a melhor solução para suas necessidades. Entre em contato conosco!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Email</h4>
                    <a
                      href={`mailto:${companyData.contact.email}`}
                      className="text-primary/80 hover:text-primary transition-colors duration-300"
                    >
                      {companyData.contact.email}
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Telefone</h4>
                    <a
                      href={`tel:${companyData.contact.phone}`}
                      className="text-primary/80 hover:text-primary transition-colors duration-300"
                    >
                      {companyData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Endereço</h4>
                    <p className="text-muted-foreground">{companyData.contact.address}</p>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Horário de Atendimento</h4>
                    <p className="text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 8h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-gradient-to-br from-secondary to-accent/30">
              <CardContent className="p-6">
                <h4 className="font-bold text-primary mb-3">Resposta Rápida</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Respondemos todas as mensagens em até 24 horas. Para urgências, entre em contato diretamente pelo telefone.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold text-primary mb-6">Envie sua Mensagem</CardTitle>
                  </CardHeader>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-primary">
                      Nome Completo *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-primary">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-primary">
                      Telefone
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold text-primary">
                      Assunto *
                    </Label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="consultoria">Consultoria em Engenharia</option>
                      <option value="projetos">Desenvolvimento de Projetos</option>
                      <option value="orcamento">Solicitação de Orçamento</option>
                      <option value="parceria">Oportunidades de Parceria</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                  
                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-primary">
                      Mensagem *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Descreva seu projeto ou necessidade..."
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full font-semibold"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </Button>
                </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Mensagem Enviada!</h3>
                <p className="text-muted-foreground mb-6">
                  Obrigado pelo seu contato. Retornaremos em breve!
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '100%'}} />
                </div>
              </div>
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;