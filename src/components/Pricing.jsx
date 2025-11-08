import { Shield, Gauge, Building } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Freemium",
      price: "0€",
      tagline: "Découverte & tests",
      features: [
        "Clés API limitées (1)",
        "100 requêtes/mois",
        "Accès /v1/projects avec filtres basiques",
        "Support communautaire",
      ],
      icon: <Gauge className="h-5 w-5" />,
      cta: "Commencer",
    },
    {
      name: "Pro",
      price: "299€",
      tagline: "Prospection active",
      features: [
        "3 clés API",
        "50k requêtes/mois",
        "Accès /v1/projects, /v1/actors, /v1/links",
        "Export CSV/JSON et webhooks",
      ],
      icon: <Building className="h-5 w-5" />,
      highlight: true,
      cta: "Demander un accès",
    },
    {
      name: "Enterprise",
      price: "Sur-mesure",
      tagline: "Haute volumétrie & SLA",
      features: [
        "SLA 99.9% & support dédié",
        "Quota illimité négocié",
        "Enrichissement spécifique & champs privés",
        "Accords de traitement RGPD & audits",
      ],
      icon: <Shield className="h-5 w-5" />,
      cta: "Parler à un expert",
    },
  ];

  return (
    <section id="pricing" className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Modèles de monétisation</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">Abonnements indexés sur l’usage de l’<strong>API</strong> (clés, quotas, périmètre). Paiement mensuel ou annuel avec remise d’engagement.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-xl border ${p.highlight ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200'} bg-white p-6 flex flex-col`}>
              <div className="flex items-center gap-2 text-slate-900">
                <span className="text-emerald-600">{p.icon}</span>
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </div>
              <p className="mt-1 text-sm text-slate-600">{p.tagline}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{p.price}<span className="text-base font-normal text-slate-500">/mois</span></p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-emerald-500">•</span>{f}</li>
                ))}
              </ul>
              <button className={`mt-6 rounded-md px-4 py-2 text-sm font-medium transition ${p.highlight ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
