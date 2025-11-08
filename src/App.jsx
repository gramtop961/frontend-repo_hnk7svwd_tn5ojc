import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueMVP from './components/ValueMVP';
import DataAPI from './components/DataAPI';
import Pricing from './components/Pricing';
import SearchMapSpec from './components/SearchMapSpec';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} IDF‑Projets — Île-de-France Projets BTP</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="#value">PVU & MVP</a>
          <a className="hover:text-white" href="#data">Données & API</a>
          <a className="hover:text-white" href="#pricing">Tarifs</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ValueMVP />
      <DataAPI />
      <SearchMapSpec />
      <Pricing />
      <Footer />
    </div>
  );
}
