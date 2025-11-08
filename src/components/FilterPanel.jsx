import { useMemo } from 'react';

const STATUSES = [
  { key: 'en_cours', label: 'En cours' },
  { key: 'a_prevoir', label: 'À prévoir' },
  { key: 'termine', label: 'Terminé' },
];

const TYPES = [
  { key: 'logement', label: 'Logement' },
  { key: 'tertiaire', label: 'Tertiaire' },
  { key: 'equipement', label: 'Équipement' },
];

export default function FilterPanel({ filters, setFilters, onReset }) {
  const activeSummary = useMemo(() => {
    const parts = [];
    if (filters.keyword) parts.push(`Mot-clé: "${filters.keyword}"`);
    if (filters.status.length && filters.status.length < STATUSES.length) {
      const lbl = filters.status.map(k => STATUSES.find(s => s.key === k)?.label).join(', ');
      parts.push(`Statut: ${lbl}`);
    }
    if (filters.types.length && filters.types.length < TYPES.length) {
      const lbl = filters.types.map(k => TYPES.find(s => s.key === k)?.label).join(', ');
      parts.push(`Typologie: ${lbl}`);
    }
    if (filters.budgetMin || filters.budgetMax) {
      parts.push(`Budget: ${filters.budgetMin || 0}k–${filters.budgetMax || '∞'}k`);
    }
    return parts.join(' • ');
  }, [filters]);

  const toggleInArray = (arr, key) => arr.includes(key) ? arr.filter(k => k !== key) : [...arr, key];

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700">Filtres</h3>
        <p className="mt-1 text-xs text-slate-500 min-h-[1.25rem]">{activeSummary || 'Aucun filtre actif'}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <div>
          <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide">Mot-clé</h4>
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => setFilters(f => ({ ...f, keyword: e.target.value }))}
            placeholder="ex: Bercy, ZAC, hôpital..."
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide">Statut</h4>
          <div className="mt-2 flex flex-col gap-2">
            {STATUSES.map(s => (
              <label key={s.key} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={filters.status.includes(s.key)}
                  onChange={() => setFilters(f => ({ ...f, status: toggleInArray(f.status, s.key) }))}
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide">Typologie</h4>
          <div className="mt-2 flex flex-col gap-2">
            {TYPES.map(t => (
              <label key={t.key} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={filters.types.includes(t.key)}
                  onChange={() => setFilters(f => ({ ...f, types: toggleInArray(f.types, t.key) }))}
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide">Budget (k€)</h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={filters.budgetMin ?? ''}
              onChange={(e) => setFilters(f => ({ ...f, budgetMin: e.target.value ? Number(e.target.value) : undefined }))}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={filters.budgetMax ?? ''}
              onChange={(e) => setFilters(f => ({ ...f, budgetMax: e.target.value ? Number(e.target.value) : undefined }))}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button onClick={onReset} className="px-3 py-2 text-sm rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">Réinitialiser</button>
        </div>
      </div>
    </div>
  );
}
