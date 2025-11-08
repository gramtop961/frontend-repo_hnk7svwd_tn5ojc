import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueMVP from './components/ValueMVP';
import DataAPI from './components/DataAPI';
import SearchMap from './components/SearchMap';
import Pricing from './components/Pricing';

function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Île‑de‑France Projets BTP</div>
        <div className="flex items-center gap-4">
          <a href="#features" className="hover:text-gray-900">Fonctionnalités</a>
          <a href="#search" className="hover:text-gray-900">Recherche</a>
          <a href="#pricing" className="hover:text-gray-900">Tarifs</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <ValueMVP />
      <DataAPI />
      <SearchMap />
      <Pricing />
      <Footer />
    </div>
  );
}
