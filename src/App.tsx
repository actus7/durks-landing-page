import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load das páginas para melhor code splitting
const Home = lazy(() => import("@/pages/Home"));
const HomeAlternative = lazy(() => import("@/pages/HomeAlternative"));
const ColorShowcase = lazy(() => import("@/components/ColorShowcase"));
const Mobile3DTest = lazy(() => import("@/components/Mobile3DTest"));

// Componente de loading
const PageSkeleton = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Carregando página...</div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomeAlternative />} />
          <Route path="/original" element={<Home />} />
          <Route path="/colors" element={<ColorShowcase />} />
          <Route path="/mobile-test" element={<Mobile3DTest />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
