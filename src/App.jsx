import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchMapSpec from './components/SearchMapSpec';
import Pricing from './components/Pricing';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} IDF‑Projets — Île-de-France Projets BTP</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="#top">Haut de page</a>
          <a className="hover:text-white" href="#specs">Spécifications</a>
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
      <SearchMapSpec />
      <Pricing />
      <Footer />
    </div>
  );
}
