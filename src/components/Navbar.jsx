import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-semibold tracking-tight">Île‑de‑France Projets BTP</a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900">Fonctionnalités</a>
          <a href="#search" className="hover:text-gray-900">Recherche</a>
          <a href="#pricing" className="hover:text-gray-900">Tarifs</a>
        </nav>
        <button className="md:hidden p-2 rounded border border-gray-200" onClick={() => setOpen(v => !v)} aria-label="Ouvrir le menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 flex flex-col gap-3 text-sm">
            <a href="#features" className="py-2" onClick={() => setOpen(false)}>Fonctionnalités</a>
            <a href="#search" className="py-2" onClick={() => setOpen(false)}>Recherche</a>
            <a href="#pricing" className="py-2" onClick={() => setOpen(false)}>Tarifs</a>
          </div>
        </div>
      )}
    </header>
  );
}
