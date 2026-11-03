/*
 * HausBuki Launcher – Dienst-Lader.
 * TizenBrew lädt diese Datei aus dem neuesten Release. Sie holt den eigentlichen
 * Dienst vom Branch "main", damit Updates ohne neues Release ankommen.
 * Läuft im TizenBrew-Dienst (Node.js 4): nur ES5.
 */
var https = require("https");
var URL_MAIN = "https://cdn.jsdelivr.net/gh/el-schinkone/hausbuki-launcher@main/service/main.js?t=" + Date.now();

function run(code) {
  try { new Function("tizen", "require", code)(typeof tizen !== "undefined" ? tizen : undefined, require); }
  catch (e) { console.log("[HausBuki] Dienst-Fehler: " + e); }
}

https.get(URL_MAIN, function (res) {
  var body = "";
  res.on("data", function (c) { body += c; });
  res.on("end", function () { run(body); });
}).on("error", function (e) { console.log("[HausBuki] Laden fehlgeschlagen: " + e); });
