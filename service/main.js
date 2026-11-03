/*
 * HausBuki Launcher – Hintergrunddienst (läuft in TizenBrew, Node.js 4, nur ES5).
 * Kleiner HTTP-Server auf 127.0.0.1:8099:
 *   GET /ping            -> {"ok":true,"tizen":true}
 *   GET /apps            -> Liste der installierten Apps [{id,name,show}]
 *   GET /launch?id=APPID -> startet eine App
 */
var http = require("http");
var url = require("url");
var PORT = 8099;

function send(res, code, obj) {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Private-Network": "true"
  });
  res.end(JSON.stringify(obj));
}

function errName(e) { return e ? (e.name || "Error") + (e.message ? ": " + e.message : "") : "?"; }

var server = http.createServer(function (req, res) {
  var u = url.parse(req.url, true);
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Private-Network": "true"
    });
    return res.end();
  }
  var hasTizen = typeof tizen !== "undefined" && tizen && tizen.application;

  if (u.pathname === "/ping") return send(res, 200, { ok: true, tizen: !!hasTizen, version: "1.3.0" });

  if (u.pathname === "/apps") {
    if (!hasTizen) return send(res, 500, { error: "tizen nicht verfügbar" });
    try {
      tizen.application.getAppsInfo(function (infos) {
        var list = [];
        for (var i = 0; i < infos.length; i++) {
          list.push({ id: infos[i].id, name: infos[i].name, show: infos[i].show });
        }
        send(res, 200, list);
      }, function (e) { send(res, 500, { error: errName(e) }); });
    } catch (e) { send(res, 500, { error: errName(e) }); }
    return;
  }

  if (u.pathname === "/launch") {
    var id = u.query.id;
    if (!id) return send(res, 400, { error: "id fehlt" });
    if (!hasTizen) return send(res, 500, { error: "tizen nicht verfügbar" });
    try {
      tizen.application.launch(id, function () { send(res, 200, { ok: true }); },
        function (e) { send(res, 500, { error: errName(e) }); });
    } catch (e) { send(res, 500, { error: errName(e) }); }
    return;
  }

  send(res, 404, { error: "unbekannt" });
});

server.on("error", function (e) { console.log("[HausBuki] Server-Fehler: " + e); });
server.listen(PORT, "127.0.0.1", function () { console.log("[HausBuki] Dienst läuft auf Port " + PORT); });
