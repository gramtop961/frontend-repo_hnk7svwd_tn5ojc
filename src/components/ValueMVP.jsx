export default function ValueMVP() {
  const items = [
    { title: 'Prospection efficace', desc: 'Repérez les opérations pertinentes par statut, typologie et budget en quelques secondes.' },
    { title: 'Cartographie claire', desc: 'Clusters, densité et détails contextuels pour comprendre le territoire rapidement.' },
    { title: 'Données fiables', desc: 'Sources consolidées, dédoublonnées et historisées pour un pilotage serein.' },
  ];
  return (
    <section id="features" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Pensé pour les équipes BTP</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-lg border border-gray-200 p-6">
              <h3 className="font-medium">{it.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
