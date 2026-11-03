/*
 * HausBuki Launcher – App-Konfiguration
 *
 * Der Launcher liest die installierten Apps direkt vom TV
 * (tizen.application.getAppsInfo) und zeigt sie als Kacheln.
 *
 * FAVORITES: Reihenfolge der ersten Kacheln (Teil des App-Namens genügt,
 *            Groß-/Kleinschreibung egal). Alle übrigen Apps folgen dahinter.
 * STYLES:    Farben pro App (Name enthält den Schlüssel).
 * HIDE:      Apps, die nie angezeigt werden sollen.
 */
var FAVORITES = ["waipu", "Netflix", "Prime", "YouTube", "Disney", "ARD", "ZDF", "Joyn", "RTL", "Spotify", "Apple TV"];

var STYLES = {
  "netflix":  { color: "#141414", fg: "#E50914", glow: "#7a0006" },
  "prime":    { color: "#0f79af", fg: "#ffffff", glow: "#08405e" },
  "amazon":   { color: "#0f79af", fg: "#ffffff", glow: "#08405e" },
  "youtube":  { color: "#f4f4f4", fg: "#e00000", glow: "#6b0000" },
  "disney":   { color: "#0b1d4d", fg: "#ffffff", glow: "#0d2a73" },
  "apple":    { color: "#1c1c1e", fg: "#ffffff", glow: "#3a3a3c" },
  "spotify":  { color: "#1db954", fg: "#000000", glow: "#0c5428" },
  "joyn":     { color: "#ff0080", fg: "#ffffff", glow: "#6b0036" },
  "rtl":      { color: "#ff6600", fg: "#ffffff", glow: "#6b2b00" },
  "ard":      { color: "#003480", fg: "#ffffff", glow: "#00204d" },
  "zdf":      { color: "#fa7d19", fg: "#ffffff", glow: "#6b3407" },
  "waipu":    { color: "#0a0a0a", fg: "#ffffff", glow: "#3d3d3d" },
  "plex":     { color: "#1f1f1f", fg: "#e5a00d", glow: "#5a3f05" },
  "twitch":   { color: "#9146ff", fg: "#ffffff", glow: "#3d1d6b" },
  "dazn":     { color: "#0c161c", fg: "#f7ff1a", glow: "#3d4207" },
  "magenta":  { color: "#e20074", fg: "#ffffff", glow: "#6b0037" },
  "sky":      { color: "#0b2d6b", fg: "#ffffff", glow: "#06183a" },
  "paramount":{ color: "#0064ff", fg: "#ffffff", glow: "#002a6b" }
};

/* Systemteile, Hilfs-Apps und TizenBrew selbst ausblenden. */
var HIDE = ["TizenBrew", "Developer", "Smart Things", "SmartThings", "Gallery", "Galerie", "e-Manual",
            "Internet", "Universal Guide", "Samsung Health", "Bixby", "Alexa", "Workspace", "Art Store",
            "Game Bar", "Samsung TV Plus"];

/* Rückfall, falls der TV die App-Liste nicht herausgibt (Tizen-App-IDs). */
var FALLBACK = [
  { name: "Netflix",     id: "3201907018807" },
  { name: "Prime Video", id: "3201910019365" },
  { name: "YouTube",     id: "111299001912" },
  { name: "Disney+",     id: "3201901017640" }
];

/* Knöpfe oben rechts. "back" kehrt zu TizenBrew zurück (dort liegt TizenTube). */
var PILLS = [
  { label: "TizenTube", icon: "play", action: "back" },
  { label: "Netzwerk", icon: "net", action: "none", dynamic: "network" },
  { label: "Neu laden", icon: "reload", action: "reload" }
];
