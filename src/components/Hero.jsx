import { Rocket, Building2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <Rocket className="h-4 w-4 text-emerald-400" />
              Lancement du MVP — API B2B pour la donnée chantier en Île-de-France
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight">
              Île-de-France Projets BTP
              <span className="block text-emerald-400">Captez la valeur des projets avant vos concurrents.</span>
            </h1>
            <p className="mt-4 text-slate-200/80 max-w-xl">
              Chaque semaine, des opportunités de plusieurs millions d’euros se perdent faute d’information exploitable. 
              IDF‑Projets transforme la donnée brute en intelligence commerciale actionnable via une <strong>API</strong> robuste.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#pricing" className="rounded-md bg-emerald-500 hover:bg-emerald-600 transition text-white px-5 py-3 text-sm font-medium">Voir les offres</a>
              <a href="#value" className="rounded-md border border-white/10 hover:bg-white/10 transition px-5 py-3 text-sm font-medium">Explorer le MVP</a>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-emerald-400" />
                <div>
                  <p className="text-sm text-slate-300">IDF-Projets — Vue régionale</p>
                  <p className="text-xs text-slate-400">Projets récents, en cours, futurs</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                  <p className="text-2xl font-semibold">18k+</p>
                  <p className="text-xs text-slate-300">Projets indexés</p>
                </div>
                <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                  <p className="text-2xl font-semibold">3500+</p>
                  <p className="text-xs text-slate-300">Acteurs qualifiés</p>
                </div>
                <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                  <p className="text-2xl font-semibold"><span className="text-emerald-400">API</span></p>
                  <p className="text-xs text-slate-300">SLA 99.9%</p>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-slate-950/50 border border-white/10 p-4 text-xs text-left font-mono text-slate-200 overflow-auto">
                <p className="text-emerald-400">GET /v1/projects?status=future&region=IDF&budget_min=1e6</p>
                <p className="text-slate-400 mt-2">→ Résultats filtrés, coordonnées vérifiées (MOA, AMO, BET, MOE)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />
    </section>
  );
}
