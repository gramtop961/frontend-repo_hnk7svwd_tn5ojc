import { useMemo } from 'react';

export default function FilterPanel({ values, onChange, onReset, total, loading }) {
  const summary = useMemo(() => {
    const s = [];
    if (values.q) s.push(`Mot-clé: "${values.q}"`);
    if (values.status) s.push(`Statut: ${values.status}`);
    if (values.typologie) s.push(`Typologie: ${values.typologie}`);
    if (values.min_budget || values.max_budget) s.push(`Budget: ${values.min_budget || '—'}–${values.max_budget || '—'} k€`);
    if (values.date_debut_from || values.date_debut_to) s.push(`Dates: ${values.date_debut_from || '—'} → ${values.date_debut_to || '—'}`);
    if (values.acteur) s.push(`Acteur: ${values.acteur}`);
    return s.join(' • ');
  }, [values]);

  const inputClass = 'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black';
  const labelClass = 'text-xs font-medium text-gray-600';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filtres</h3>
        <button className="text-sm text-gray-600 underline" onClick={onReset}>Réinitialiser</button>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Mot-clé</label>
        <input className={inputClass} value={values.q} onChange={(e) => onChange({ ...values, q: e.target.value })} placeholder="Ex: lycée, ZAC, pont…" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>Statut</label>
          <select className={inputClass} value={values.status} onChange={(e) => onChange({ ...values, status: e.target.value })}>
            <option value="">Tous</option>
            <option value="prospection">Prospection</option>
            <option value="etude">Étude</option>
            <option value="travaux">Travaux</option>
            <option value="livre">Livré</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Typologie</label>
          <select className={inputClass} value={values.typologie} onChange={(e) => onChange({ ...values, typologie: e.target.value })}>
            <option value="">Toutes</option>
            <option value="logement">Logement</option>
            <option value="tertiaire">Tertiaire</option>
            <option value="equipement">Équipement</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>Budget min (k€)</label>
          <input type="number" className={inputClass} value={values.min_budget} onChange={(e) => onChange({ ...values, min_budget: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Budget max (k€)</label>
          <input type="number" className={inputClass} value={values.max_budget} onChange={(e) => onChange({ ...values, max_budget: e.target.value })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className={labelClass}>Début (du)</label>
          <input type="date" className={inputClass} value={values.date_debut_from} onChange={(e) => onChange({ ...values, date_debut_from: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Début (au)</label>
          <input type="date" className={inputClass} value={values.date_debut_to} onChange={(e) => onChange({ ...values, date_debut_to: e.target.value })} />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Acteur (MOA/Architecte/Entreprise)</label>
        <input className={inputClass} value={values.acteur} onChange={(e) => onChange({ ...values, acteur: e.target.value })} placeholder="Ex: Bouygues, AIA…" />
      </div>

      <div className="text-xs text-gray-600 bg-gray-50 rounded-md p-3">{summary || 'Aucun filtre appliqué'}</div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{loading ? 'Chargement…' : `${total} projets`}</span>
      </div>
    </div>
  );
}
