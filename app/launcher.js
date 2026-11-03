(function () {
  "use strict";

  var hasTizen = typeof window.tizen !== "undefined" && tizen.application;
  var COLS = 4;

  /* ---------- Installierte Apps ermitteln ---------- */
  function resolveId(app) {
    if (!hasTizen) return app.ids[0];               // Vorschau im Browser
    for (var i = 0; i < app.ids.length; i++) {
      try {
        tizen.application.getAppInfo(app.ids[i]);
        return app.ids[i];                           // installiert
      } catch (e) {
        if (e && e.name === "NotFoundError") continue;
        return app.ids[0];                           // Prüfen nicht erlaubt: trotzdem anzeigen
      }
    }
    return null;                                     // nicht installiert
  }

  var apps = [];
  APPS.forEach(function (a) {
    var id = resolveId(a);
    if (id) apps.push({ name: a.name, id: id, color: a.color, fg: a.fg, glow: a.glow });
  });

  /* ---------- Aufbau ---------- */
  var ICONS = {
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    net: '<svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',
    reload: '<svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4l-2.35 2.35z"/></svg>'
  };

  var pillsEl = document.getElementById("pills");
  var pillEls = PILLS.map(function (p) {
    var el = document.createElement("div");
    el.className = "pill";
    el.innerHTML = ICONS[p.icon] + "<span>" + p.label + "</span>";
    pillsEl.appendChild(el);
    return el;
  });

  var shelf = document.getElementById("shelf");
  var tileEls = [];
  var rowEl = null;
  apps.forEach(function (a, i) {
    if (i % COLS === 0) {
      rowEl = document.createElement("div");
      rowEl.className = "row " + (i === 0 ? "dock" : "grid");
      shelf.appendChild(rowEl);
    }
    var t = document.createElement("div");
    t.className = "tile";
    t.style.background = a.color;
    t.style.color = a.fg;
    t.textContent = a.name;
    rowEl.appendChild(t);
    tileEls.push(t);
  });

  /* ---------- Uhr ---------- */
  var DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  var MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var d = new Date(), h = d.getHours();
    document.getElementById("clock").textContent = pad(h) + ":" + pad(d.getMinutes());
    document.getElementById("date").textContent = DAYS[d.getDay()] + "  " + d.getDate() + ". " + MONTHS[d.getMonth()];
    document.getElementById("greet").textContent =
      h < 5 ? "Gute Nacht" : h < 11 ? "Guten Morgen" : h < 18 ? "Guten Tag" : "Guten Abend";
  }
  tick(); setInterval(tick, 10000);

  /* ---------- Netzwerk-Pill ---------- */
  PILLS.forEach(function (p, i) {
    if (p.dynamic !== "network") return;
    var span = pillEls[i].querySelector("span");
    try {
      tizen.systeminfo.getPropertyValue("NETWORK", function (n) {
        span.textContent = n.networkType === "ETHERNET" ? "Ethernet" : n.networkType === "WIFI" ? "WLAN" : "Netzwerk";
      });
    } catch (e) { span.textContent = navigator.onLine ? "Online" : "Offline"; }
  });

  /* ---------- Fokus ---------- */
  var zone = "tiles";          // "tiles" oder "pills"
  var idx = 0, pidx = 0;

  function render() {
    tileEls.forEach(function (t, i) { t.classList.toggle("focus", zone === "tiles" && i === idx); });
    pillEls.forEach(function (p, i) { p.classList.toggle("focus", zone === "pills" && i === pidx); });
    var a = apps[idx];
    var title = document.getElementById("title");
    if (zone === "tiles" && a) {
      title.textContent = a.name; title.style.opacity = idx >= COLS ? 0 : 1;
      document.documentElement.style.setProperty("--glow", a.glow);
    } else {
      title.style.opacity = 0;
      document.documentElement.style.setProperty("--glow", "#2a2a2e");
    }
    // Ab der zweiten Reihe Raster nach oben schieben
    shelf.classList.toggle("up", zone === "tiles" && idx >= COLS);
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  function launch(a) {
    if (!hasTizen) { toast("Vorschau: würde " + a.name + " starten"); return; }
    try {
      tizen.application.launch(a.id, function () {}, function (e) {
        toast(a.name + " lässt sich nicht starten (" + (e && e.name) + ")");
      });
    } catch (e) { toast(a.name + ": " + (e && e.message)); }
  }

  function pillAction(p) {
    if (p.action === "back") { history.length > 1 ? history.back() : toast("Zurück zu TizenBrew mit der Zurück-Taste"); }
    else if (p.action === "reload") { location.reload(); }
  }

  /* ---------- Tasten ---------- */
  var K = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, ENTER: 13, BACK: 10009, ESC: 27 };
  document.addEventListener("keydown", function (e) {
    var k = e.keyCode;
    if (zone === "tiles") {
      if (k === K.LEFT && idx % COLS > 0) idx--;
      else if (k === K.RIGHT && idx % COLS < COLS - 1 && idx < apps.length - 1) idx++;
      else if (k === K.DOWN && idx + COLS < apps.length) idx += COLS;
      else if (k === K.DOWN && Math.floor(idx / COLS) < Math.floor((apps.length - 1) / COLS)) idx = apps.length - 1;
      else if (k === K.UP && idx >= COLS) idx -= COLS;
      else if (k === K.UP) { zone = "pills"; }
      else if (k === K.ENTER && apps[idx]) launch(apps[idx]);
      else if ((k === K.BACK || k === K.ESC) && idx >= COLS) { idx = idx % COLS; }
      else return;
    } else {
      if (k === K.LEFT && pidx > 0) pidx--;
      else if (k === K.RIGHT && pidx < pillEls.length - 1) pidx++;
      else if (k === K.DOWN || k === K.BACK || k === K.ESC) zone = "tiles";
      else if (k === K.ENTER) pillAction(PILLS[pidx]);
      else return;
    }
    e.preventDefault();
    render();
  });

  if (!apps.length) toast("Keine der eingetragenen Apps gefunden – apps.js prüfen");
  render();
})();
