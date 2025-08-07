import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from './ui/button';

const ColorShowcase = () => {
  const { theme, toggleTheme } = useTheme();

  const colorSamples = [
    { name: 'Background', class: 'bg-background text-foreground' },
    { name: 'Card', class: 'bg-card text-card-foreground' },
    { name: 'Primary', class: 'bg-primary text-primary-foreground' },
    { name: 'Secondary', class: 'bg-secondary text-secondary-foreground' },
    { name: 'Muted', class: 'bg-muted text-muted-foreground' },
    { name: 'Accent', class: 'bg-accent text-accent-foreground' },
    { name: 'Destructive', class: 'bg-destructive text-destructive-foreground' },
    { name: 'Sidebar', class: 'bg-sidebar text-sidebar-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Sistema de Cores</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Alternar para {theme === 'light' ? 'Escuro' : 'Claro'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {colorSamples.map((color) => (
            <div
              key={color.name}
              className={`${color.class} p-6 rounded-lg border border-border shadow-md`}
            >
              <h3 className="text-lg font-semibold mb-2">{color.name}</h3>
              <p className="text-sm opacity-80">
                Exemplo de texto usando as cores {color.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg border border-border shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Componentes de Interface</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button variant="default">
                Botão Primário
              </Button>
              <Button variant="secondary">
                Botão Secundário
              </Button>
              <Button variant="destructive">
                Botão Destrutivo
              </Button>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Campo de entrada"
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Área de texto"
                rows={3}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="bg-muted text-muted-foreground p-4 rounded-md">
              <p className="text-sm">
                Esta é uma área com fundo muted, ideal para informações secundárias ou de apoio.
              </p>
            </div>

            <div className="bg-accent text-accent-foreground p-4 rounded-md">
              <p className="text-sm">
                Esta é uma área com fundo accent, perfeita para destacar conteúdo importante.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-sidebar text-sidebar-foreground p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Área da Sidebar</h3>
          <div className="space-y-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground p-3 rounded-md">
              Item Primário da Sidebar
            </div>
            <div className="bg-sidebar-accent text-sidebar-accent-foreground p-3 rounded-md">
              Item Accent da Sidebar
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground">
          <p className="text-sm">
            Sistema de cores implementado com variáveis CSS customizadas e integração com Tailwind CSS.
            <br />
            Suporte completo para modo claro e escuro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorShowcase;
