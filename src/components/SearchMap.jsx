import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, Map, Filter } from 'lucide-react';
import FilterPanel from './FilterPanel';
import MapView from './MapView';

// Demo dataset (front-only for now). In production, pull from backend with the same shape.
const DEMO = [
  { id: 'p1', title: 'Écoquartier Bercy-Charenton', status: 'en_cours', budget: 120000, lat: 48.833, lon: 2.39, type: 'logement' },
  { id: 'p2', title: 'Rénovation Hôpital Saint-Louis', status: 'a_prevoir', budget: 80000, lat: 48.872, lon: 2.37, type: 'equipement' },
  { id: 'p3', title: 'Immeuble de bureaux La Défense', status: 'termine', budget: 210000, lat: 48.892, lon: 2.241, type: 'tertiaire' },
  { id: 'p4', title: 'Groupe scolaire Vitry', status: 'en_cours', budget: 35000, lat: 48.787, lon: 2.393, type: 'equipement' },
  { id: 'p5', title: 'Logements Plaine Commune', status: 'a_prevoir', budget: 45000, lat: 48.936, lon: 2.357, type: 'logement' },
  { id: 'p6', title: 'Réhabilitation Halle industrielle', status: 'en_cours', budget: 62000, lat: 48.91, lon: 2.48, type: 'tertiaire' },
];

const initialFilters = {
  keyword: '',
  status: ['en_cours', 'a_prevoir', 'termine'],
  types: ['logement', 'tertiaire', 'equipement'],
  budgetMin: undefined,
  budgetMax: undefined,
};

export default function SearchMap() {
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const k = filters.keyword.trim().toLowerCase();
    return DEMO.filter(d => {
      if (k && !(`${d.title}`.toLowerCase().includes(k))) return false;
      if (!filters.status.includes(d.status)) return false;
      if (!filters.types.includes(d.type)) return false;
      if (filters.budgetMin !== undefined && d.budget < filters.budgetMin * 1000) return false;
      if (filters.budgetMax !== undefined && d.budget > filters.budgetMax * 1000) return false;
      return true;
    });
  }, [filters]);

  const reset = useCallback(() => setFilters(initialFilters), []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section id="recherche" className="relative">
      <div className="h-[80vh] md:h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left: Filters (persistent on md+, drawer on mobile) */}
        <aside className="hidden md:block border-r border-slate-200 bg-white">
          <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
        </aside>

        {/* Right: Map */}
        <div className="relative">
          <MapView data={filtered} onFeatureClick={() => {}} />

          {/* Top-right counters */}
          <div className="absolute top-3 right-3 z-10">
            <div className="px-3 py-2 rounded-md bg-white/90 shadow text-sm text-slate-700">
              {filtered.length} projets affichés
            </div>
          </div>

          {/* Legend bottom-right */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="rounded-md bg-white/90 shadow px-3 py-2 text-xs text-slate-700">
              <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ background:'#2563eb', opacity: 1 }} /> En cours</div>
              <div className="flex items-center gap-2 mt-1"><span className="inline-block w-3 h-3 rounded-full" style={{ background:'#f59e0b', opacity: 0.8 }} /> À prévoir</div>
              <div className="flex items-center gap-2 mt-1"><span className="inline-block w-3 h-3 rounded-full" style={{ background:'#6b7280', opacity: 0.4 }} /> Terminé</div>
            </div>
          </div>

          {/* Mobile floating button to open filters */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/90 shadow text-sm text-slate-700"
            aria-label="Ouvrir les filtres"
          >
            <Filter className="w-4 h-4" /> Filtres
          </button>
        </div>
      </div>

      {/* Drawer for mobile filters */}
      {drawerOpen && (
        <div className="fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white shadow-xl flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Filtres</span>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded hover:bg-slate-100" aria-label="Fermer">
                <Menu className="w-5 h-5 rotate-90" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterPanel filters={filters} setFilters={setFilters} onReset={reset} />
            </div>
            <div className="p-3 border-t border-slate-200">
              <button onClick={() => setDrawerOpen(false)} className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">
                <Map className="w-4 h-4" /> Appliquer et voir la carte
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
