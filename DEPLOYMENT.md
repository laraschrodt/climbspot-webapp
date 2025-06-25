# Deployment

[Unser GitHub-Repo zum Projekt](https://github.com/laraschrodt/climbspot-webapp)

## Admin-Zugriff

Wenn Sie die Admin-Funktionen testen möchten, gibt es im Moment einen Admin-Account mit den Zugangsdaten: <br>
**E-Mail:** `admin@mail.de` <br>
**Passwort:** `admin`

<br>

## Deployment Möglichkeit 1: Docker Deployment

> Wir haben für Frontend und Backend jeweils eine eigene Dockerfile erstellt und verwenden Docker Compose zur Orchestrierung. Außerdem setzen wir NGINX als Reverse-Proxy ein, um Anfragen vom Frontend an das Backend weiterzuleiten.

### 1. .env Dateien konfigurieren

In `/frontend` und `/backend` gibt es jeweils .env.example Dateien, die durch folgendes ergänzt werden müssen:

**Frontend:**

```dotenv
VITE_SOCKET_URL=http://localhost:3000
```

**Backend:**

```dotenv
SUPABASE_URL=https://dwagyjkanotfugjoosxq.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3YWd5amthbm90ZnVnam9vc3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTY3NTAsImV4cCI6MjA2MTY3Mjc1MH0.ay7Fqudw51sSzeW5kxw8xr_GrEZTd2SfyiFJmQQTIvE
JWT_SECRET=9dJ+yBa9QhCjKLwyi0jxFHE2YJh/WSPaoAkXJq/c0/EZc3N/lIwzLIMBhFMY7PsEJ7qzhPf5ABHaZIGOPiI6Ig==
PORT=3000

FRONTEND_URL=http://localhost:5173
```

---

### 2. Docker-Container bauen und starten

`docker-compose up --build` im Root-Verzeichnis des Projekts ausführen

<br>

## Deployment Möglichkeit 2: Cloud-Deployment

**Link:** https://climbspot-webapp.onrender.com

> ⚠️ **Problem bzw. Grund wieso wir ein Cloud- und ein Docker-Deployment haben:** <br>
> Bei dem Free-Plan von render.com klappt zwar das Deployment nach einem Commit,
> aber um Ressourcen zu sparen läuft das Backend nicht kontinuierlich, was wir
> erst gemerkt haben, als das Cloud Deployment schon fertig war. Das heißt, wenn
> Sie auf den Link oben drücken dann funktioniert unsere Website wahrscheinlich nicht richtig.
> Deswegen Möglichkeit 1 Docker-Deployment
