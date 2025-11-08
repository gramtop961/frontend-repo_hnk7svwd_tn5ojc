import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '#top' },
    { label: 'PVU & MVP', href: '#value' },
    { label: 'Données & API', href: '#data' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Recherche', href: '#recherche' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-semibold text-slate-900">IDF‑Projets</a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          {navItems.map((it) => (
            <a key={it.label} href={it.href} className="hover:text-slate-900">{it.label}</a>
          ))}
        </nav>
        <button className="md:hidden p-2" aria-label="Menu" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5 text-slate-900" />
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="h-14 flex items-center justify-between px-6 border-b border-slate-200">
            <span className="font-semibold">IDF‑Projets</span>
            <button className="p-2" aria-label="Fermer" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-6 py-4 space-y-4 text-slate-800">
            {navItems.map((it) => (
              <a key={it.label} href={it.href} onClick={() => setOpen(false)} className="block text-base">
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
