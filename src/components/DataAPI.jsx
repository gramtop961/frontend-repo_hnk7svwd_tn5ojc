import { Server, Activity, Link2 } from 'lucide-react';

export default function DataAPI() {
  const rows = [
    {
      name: 'Plateformes d’urbanisme & autorisations',
      ex: 'data.gouv.fr, Sit@del2, Géoportail/IGN',
    },
    {
      name: 'Marchés publics & avis de consultation',
      ex: 'BOAMP, DUME, PLACE, JOUE/TED',
    },
    {
      name: 'Sources privées & partenaires',
      ex: 'Fichiers MOA/AMO opt-in, veille presse spécialisée, agrégateurs de chantiers',
    },
  ];

  return (
    <section id="data" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Modèle de données & API au centre</h2>
            <p className="mt-3 text-slate-600">Architecture orientée domaine: entités Projets, Acteurs et Événements. L’<strong>API</strong> unifie l’accès (auth, quotas, versionnage), délivre des réponses normalisées (JSON) et expose des points d’entrée dédiés à la prospection.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2"><Server className="h-4 w-4 text-emerald-500 mt-0.5" /> /v1/projects — filtres avancés, tri par potentiel</li>
              <li className="flex items-start gap-2"><Activity className="h-4 w-4 text-emerald-500 mt-0.5" /> /v1/actors — coordonnées, rôles, conformité</li>
              <li className="flex items-start gap-2"><Link2 className="h-4 w-4 text-emerald-500 mt-0.5" /> /v1/links — relations projet-acteur, historique</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-800">Exemples de sourcing</h3>
            <div className="mt-3 divide-y divide-slate-200">
              {rows.map((r) => (
                <div key={r.name} className="py-3">
                  <p className="text-slate-900 font-medium">{r.name}</p>
                  <p className="text-slate-600 text-sm">{r.ex}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600">
              Exemple d’appel: <span className="font-mono text-slate-800">GET /v1/projects?status=future&dept=75,92&budget_min=1000000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
