import { Search, ShieldCheck, Database } from 'lucide-react';

export default function ValueMVP() {
  const items = [
    {
      icon: <Search className="h-5 w-5 text-emerald-400" />,
      title: 'Recherche avancée',
      desc: "Filtres multicritères: statut (récent, en cours, futur), typologie, budget, commune/epci, calendrier et acteurs. Export direct via l'API.",
    },
    {
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      title: 'Donnée qualifiée',
      desc: 'Normalisation des champs, dédoublonnage, scoring de fraîcheur, métadonnées exploitables (SIREN, adresses normalisées, géocodage).',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: 'Coordonnées conformes',
      desc: 'Contact MOA/AMO/BET vérifié, base opt-in B2B, consentements traçables, respect strict du RGPD.',
    },
  ];

  return (
    <section id="value" className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Proposition de valeur & MVP</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">La donnée brute n'est pas une valeur. La valeur réside dans la donnée qualifiée, structurée et livrée au bon décideur, au bon moment, via une <strong>API</strong> robuste.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs">
                {it.icon}
                <span>{it.title}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
