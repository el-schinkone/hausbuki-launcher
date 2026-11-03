/*
 * App-Liste für den HausBuki Launcher.
 * ids: mögliche Tizen-App-IDs (je nach Modelljahr/Region verschieden).
 *      Der Launcher nimmt die erste, die auf dem TV installiert ist.
 * color: Kachel- und Glow-Farbe, fg: Schriftfarbe auf der Kachel.
 * Reihenfolge = Reihenfolge auf dem Bildschirm (die ersten 4 = obere Reihe).
 */
var APPS = [
  { name: "Netflix",     ids: ["3201907018807", "11101200001", "org.tizen.netflix-app"], color: "#141414", fg: "#E50914", glow: "#7a0006" },
  { name: "Prime Video", ids: ["3201910019365", "3201512006785", "org.tizen.ignition"],  color: "#0f79af", fg: "#ffffff", glow: "#08405e" },
  { name: "YouTube",     ids: ["111299001912"],                                           color: "#f4f4f4", fg: "#e00000", glow: "#6b0000" },
  { name: "Disney+",     ids: ["3201901017640", "MCmYXNxgcu.DisneyPlus"],                color: "#0b1d4d", fg: "#ffffff", glow: "#0d2a73" },
  { name: "Apple TV",    ids: ["3201807016597"],                                          color: "#1c1c1e", fg: "#ffffff", glow: "#3a3a3c" },
  { name: "Spotify",     ids: ["3201606009684", "rJeHak5zRg.Spotify"],                   color: "#1db954", fg: "#000000", glow: "#0c5428" },
  { name: "Joyn",        ids: ["3201703012079", "3201908019041"],                        color: "#ff0080", fg: "#ffffff", glow: "#6b0036" },
  { name: "RTL+",        ids: ["3201911019448", "3201601007250"],                        color: "#ff6600", fg: "#ffffff", glow: "#6b2b00" },
  { name: "ARD Mediathek", ids: ["3201908019038", "3201510005998"],                      color: "#003480", fg: "#ffffff", glow: "#00204d" },
  { name: "ZDF",         ids: ["3201811017398", "3201507004113"],                        color: "#fa7d19", fg: "#ffffff", glow: "#6b3407" },
  { name: "Plex",        ids: ["3201512006963"],                                          color: "#1f1f1f", fg: "#e5a00d", glow: "#5a3f05" },
  { name: "Twitch",      ids: ["3202203026841"],                                          color: "#9146ff", fg: "#ffffff", glow: "#3d1d6b" }
];

/* Knöpfe oben rechts. "back" kehrt zu TizenBrew zurück (dort liegt TizenTube). */
var PILLS = [
  { label: "TizenTube", icon: "play", action: "back" },
  { label: "Netzwerk", icon: "net", action: "none", dynamic: "network" },
  { label: "Neu laden", icon: "reload", action: "reload" }
];
