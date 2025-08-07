import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Purpose from '../components/Purpose';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Purpose />
      <Contact />
    </div>
  );
}