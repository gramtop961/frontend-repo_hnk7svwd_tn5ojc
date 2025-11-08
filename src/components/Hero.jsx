export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">La cartographie des projets BTP en Île‑de‑France</h1>
          <p className="mt-4 text-gray-600 text-lg">Trouvez, filtrez et suivez les opérations en prospection, étude, travaux et livraison. Pensé pour les équipes commerciales et partenariales.</p>
          <div className="mt-8 flex gap-3">
            <a href="#search" className="inline-flex items-center justify-center rounded-md bg-black text-white px-5 py-3 text-sm font-medium">Ouvrir la recherche</a>
            <a href="#features" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-medium">Voir les fonctionnalités</a>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 aspect-[4/3] border border-gray-200 p-6 flex items-center justify-center text-gray-500">
          Aperçu de la carte et des filtres
        </div>
      </div>
    </section>
  );
}
