import { lazy, Suspense } from 'react';

// Lazy load do componente 3D pesado
const Hero3DVisualization = lazy(() => import('./Hero/Hero3DVisualization').then(module => ({
  default: module.Hero3DVisualization
})));

// Lazy load de outros componentes pesados
const Mobile3DTest = lazy(() => import('./Mobile3DTest'));
const ColorShowcase = lazy(() => import('./ColorShowcase'));

// Componente de loading para fallback
const ComponentSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div
    className="animate-pulse bg-muted rounded-lg flex items-center justify-center relative"
    style={{ height }}
  >
    <div className="text-muted-foreground">Carregando visualização 3D...</div>
    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/60">
      Otimizando performance...
    </div>
  </div>
);

// Componente de erro para fallback
const ComponentError = ({ height = "400px", error }: { height?: string; error?: Error }) => (
  <div
    className="bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-center"
    style={{ height }}
  >
    <div className="text-destructive text-center p-4">
      <div className="font-medium">Erro ao carregar componente 3D</div>
      <div className="text-sm mt-2 opacity-80">
        {error?.message || 'Tente recarregar a página'}
      </div>
    </div>
  </div>
);

// Wrapper para Hero3D com Suspense
export const LazyHero3DVisualization = (props: any) => (
  <Suspense fallback={<ComponentSkeleton height="100vh" />}>
    <Hero3DVisualization {...props} />
  </Suspense>
);

// Wrapper para Mobile3DTest com Suspense
export const LazyMobile3DTest = (props: any) => (
  <Suspense fallback={<ComponentSkeleton />}>
    <Mobile3DTest {...props} />
  </Suspense>
);

// Wrapper para ColorShowcase com Suspense
export const LazyColorShowcase = (props: any) => (
  <Suspense fallback={<ComponentSkeleton />}>
    <ColorShowcase {...props} />
  </Suspense>
);

export default {
  Hero3DVisualization: LazyHero3DVisualization,
  Mobile3DTest: LazyMobile3DTest,
  ColorShowcase: LazyColorShowcase
};
