export default function SearchMapSpec() {
  return (
    <section id="recherche" className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 prose prose-slate">
        <h2>Spécification de Design — Page « Recherche / Cartographie »</h2>
        <p><strong>Ton</strong>: sobriété, professionnalisme, clarté. Audience: Développeurs Front-end et Product Owners.</p>

        <h3>1. Layout Général</h3>
        <ul>
          <li>
            <strong>Disposition 2 colonnes (Desktop)</strong>: panneau de <strong>Filtres</strong> à gauche (largeur 320px), <strong>Carte interactive</strong> à droite (zone dominante, occupe le reste de l’écran). Hauteur: pleine hauteur visible (100vh – barre de navigation).
          </li>
          <li>
            <strong>Responsive</strong>:
            <ul>
              <li>Tablette: panneau de filtres repliable (drawer latéral). La Carte reste visible en permanence.</li>
              <li>Mobile: les filtres deviennent un panneau escamotable sur toute la hauteur via un bouton « Filtres » persistent au-dessus de la carte.</li>
            </ul>
          </li>
          <li>
            <strong>Justification</strong>: les filtres à gauche réduisent les déplacements oculaires et les clics inutiles; la carte occupe l’espace principal pour accélérer la prospection visuelle.
          </li>
        </ul>

        <h3>2. Composants Clés</h3>
        <h4>2.1 Panneau de Filtres</h4>
        <ul>
          <li>Sections groupées par logique métier: <em>Statut</em>, <em>Périmètre</em> (Paris/Arrondissements/communes IDF), <em>Typologie</em> (logement, tertiaire, équipement), <em>Budget</em>, <em>Calendrier</em>, <em>Acteurs</em> (MOA, AMO, BET).</li>
          <li>Composants: cases à cocher pour Statut et Typologie, champs numérique double pour budget (min/max), sélecteurs de date pour calendrier, multiselect pour acteurs, champ texte pour mots-clés.</li>
          <li>Contrôles persistants: boutons « Réinitialiser » et « Appliquer »; résumé des filtres actifs affiché en haut pour lisibilité.</li>
          <li>Performance: en Desktop, application en <em>quasi-temps réel</em> (debounce 300 ms) pour limiter les requêtes; en Mobile, bouton « Appliquer » ferme le panneau.</li>
        </ul>

        <h4>2.2 Carte Interactive</h4>
        <ul>
          <li>Fond de carte <strong>minimaliste</strong> (niveaux de gris doux) afin de laisser les points ressortir.</li>
          <li>Centre par défaut: Paris; niveau de zoom initial adapté à la Petite Couronne, ajustable via molette/pinch.</li>
          <li>Points de projets <strong>cliquables</strong> avec panneau d’aperçu (hover desktop, tap mobile): titre, statut, budget, échéance, acteurs clés, lien « Voir la fiche ».</li>
          <li>Clustering: regrouper les points à faible zoom pour préserver la lisibilité; compteur sur cluster.</li>
          <li>Interactions: clic sur un point recentre/zoome; Shift+drag pour dessiner un polygone de recherche (si activé plus tard).</li>
        </ul>

        <h4>2.3 Légende et Compteurs</h4>
        <ul>
          <li>Légende fixe en bas à droite: 3 états avec couleurs et opacités (voir Conventions).</li>
          <li>Compteur global en haut à droite de la carte: « X projets affichés » mis à jour selon les filtres.</li>
        </ul>

        <h3>3. Conventions Visuelles</h3>
        <ul>
          <li>Palette: fond blanc, texte noir/gris foncé, accents <strong>bleu</strong> (CTA et points « En Cours »), <strong>orange/jaune</strong> (points « À Prévoir »), <strong>gris/noir</strong> (points « Terminé »).</li>
          <li>États (symboles carte):
            <ul>
              <li><strong>En Cours</strong>: bleu, opacité 100%.</li>
              <li><strong>À Prévoir</strong>: orange/jaune, opacité 80%.</li>
              <li><strong>Terminé</strong>: gris clair/noir, opacité 40%.</li>
            </ul>
          </li>
          <li>Typographie: Inter/Geist, hiérarchie claire (titres 18–24px, corps 14–16px), contrastes AA/AAA.</li>
          <li>Éléments interactifs: états hover/focus visibles, zones cliquables généreuses, feedback rapide.</li>
          <li>Accessibilité: couleurs contrastées, taille de cible 44px min sur mobile, légende et filtres lisibles.</li>
        </ul>

        <p className="text-sm text-slate-600">Note: « La carte est l’outil, pas la décoration. Les filtres doivent être en permanence visibles sur Desktop pour éviter tout clic inutile et réduire le temps de réaction de l’utilisateur. »</p>
      </div>
    </section>
  );
}
