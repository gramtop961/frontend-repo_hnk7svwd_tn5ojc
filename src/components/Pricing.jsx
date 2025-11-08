export default function Pricing() {
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Tarification simple</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {name:'Essai', price:'Gratuit', features:['Carte', 'Filtres de base']},
            {name:'Pro', price:'99€ / mois', features:['API', 'Export CSV', 'Filtres avancés']},
            {name:'Équipe', price:'249€ / mois', features:['Comptes', 'SLA', 'Support dédié']},
          ].map(t => (
            <div key={t.name} className="rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600">{t.name}</div>
              <div className="mt-2 text-3xl font-bold">{t.price}</div>
              <ul className="mt-4 text-sm text-gray-600 space-y-1 list-disc list-inside">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm">Choisir</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
