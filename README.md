# HausBuki Launcher

Ein schlichter Startbildschirm für Samsung-Tizen-TVs, als TizenBrew-Modul.
Uhrzeit, Begrüßung, Farbschein der gewählten App und große App-Kacheln.
Bedienung komplett per Fernbedienung (Pfeiltasten, OK, Zurück).

## In TizenBrew hinzufügen

TizenBrew öffnen → Module verwalten → Modul hinzufügen → **GitHub** →
`el-schinkone/hausbuki-launcher`

## Apps anpassen

In `app/apps.js` die Liste `APPS` bearbeiten. Pro App können mehrere
Tizen-App-IDs angegeben werden; der Launcher nimmt die erste, die auf dem
TV installiert ist, und blendet Apps aus, die nicht installiert sind.
