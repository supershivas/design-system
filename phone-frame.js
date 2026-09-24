/* ─── Cadre téléphone — partagé entre toutes les apps mobiles uniquement ─────
   Source de vérité : supershivas/design-system/phone-frame.js
   Mis à jour par scripts/sync-design-system.sh dans chaque app qui l'utilise.
   Dimensions : bloc `phoneFrame` de design-tokens.json.

   Sur ordinateur, affiche l'app dans un cadre style iPhone, centré. L'app est
   chargée dans une iframe de la taille d'un téléphone : largeur d'écran,
   media queries, 100dvh et position: fixed s'y comportent comme sur mobile.
   Sur téléphone et tablette tactile, ne fait rien.

   Utilisation : premier élément du <head>, en script synchrone (ni defer,
   ni async), pour interrompre le chargement avant que l'app ne démarre :
     <script src="/phone-frame.js"></script>
   Ajouter ?cadre=0 à l'URL affiche l'app sans cadre.
   ─────────────────────────────────────────────────────────────────────────── */
(function () {
  var isDesktop = window.matchMedia(
    '(min-width: 900px) and (hover: hover) and (pointer: fine)'
  ).matches;
  var isFramed = window.self !== window.top;
  var isDisabled = /[?&]cadre=0\b/.test(window.location.search);
  if (!isDesktop || isFramed || isDisabled) return;

  // Valeurs de design-tokens.json › phoneFrame
  var WIDTH = 390;
  var HEIGHT = 844;
  var RADIUS = 55;
  var BEZEL = 12;
  var ISLAND_WIDTH = 120;
  var ISLAND_HEIGHT = 34;
  var STATUS_BAR = 50;

  // Stoppe le chargement de la page hôte : l'app ne démarre que dans l'iframe.
  window.stop();

  var src = window.location.href;
  var title = document.title || '';

  // Le parseur est arrêté : on remplace le contenu du document par le cadre.
  document.documentElement.setAttribute('lang', 'fr');
  document.documentElement.innerHTML =
    '<head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title></title><style>' +
      ':root{--pf-backdrop:#E5E5EA;--pf-bezel:#1C1C1E}' +
      '@media (prefers-color-scheme: dark){:root{--pf-backdrop:#000;--pf-bezel:#3A3A3C}}' +
      'html,body{margin:0;height:100%;background:var(--pf-backdrop)}' +
      'body{display:flex;align-items:center;justify-content:center}' +
      '.pf-phone{position:relative;box-sizing:content-box;display:flex;flex-direction:column;' +
      'width:' + WIDTH + 'px;' +
      'height:min(' + HEIGHT + 'px,calc(100vh - ' + (2 * BEZEL + 48) + 'px));' +
      'border:' + BEZEL + 'px solid var(--pf-bezel);' +
      'border-radius:' + RADIUS + 'px;overflow:hidden;background:#000;' +
      'box-shadow:0 0 0 2px #48484A,0 24px 64px rgba(0,0,0,.35)}' +
      // Barre d'état réservée : l'îlot ne masque jamais le contenu de l'app.
      '.pf-status{flex:none;height:' + STATUS_BAR + 'px;background:#000}' +
      '.pf-phone iframe{display:block;flex:1;width:100%;min-height:0;border:0;background:#fff}' +
      '.pf-island{position:absolute;top:10px;left:50%;transform:translateX(-50%);' +
      'width:' + ISLAND_WIDTH + 'px;height:' + ISLAND_HEIGHT + 'px;' +
      'border-radius:' + ISLAND_HEIGHT / 2 + 'px;background:#000;pointer-events:none}' +
      '</style></head><body>' +
      '<div class="pf-phone"><div class="pf-status"></div><iframe title="Application"></iframe>' +
      '<div class="pf-island"></div></div></body>';

  document.title = title;
  var frame = document.querySelector('.pf-phone iframe');
  frame.src = src;

  // Garde l'URL et le titre de l'onglet alignés sur la navigation dans l'app.
  function syncFromFrame() {
    try {
      var inner = frame.contentWindow.location.href;
      if (inner !== 'about:blank' && inner !== window.location.href) {
        window.history.replaceState(null, '', inner);
      }
      if (frame.contentDocument.title) document.title = frame.contentDocument.title;
    } catch (e) {
      // Navigation vers une autre origine : rien à synchroniser.
    }
  }
  frame.addEventListener('load', syncFromFrame);
  window.setInterval(syncFromFrame, 500);
})();
