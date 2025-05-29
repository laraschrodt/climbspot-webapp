# 📋 ToDo-Liste und Aufgabenverteilung

## ✅ Aufgabenverteilung verteilt nach Person
> **Deadline vom Hochladen der Programmieraufgaben:** 01.06.2025 irgendwann Nachmittags <br>
> **Bis dahin PL4 fertig haben:** 04.06.2025

### Lara
[x] Platzhalter von den Location-Cards entfernen und mit DB verbinden
[x] Filter
[x] Favoriten
[x] siehe "Niedriger Aufwand"

Wiederverwendbar:
- Location.ts im backend und im frontend
- Nelly: die Methode getAllLocationsFromDB() in location.service.ts

### Kimia
- Ratings

### Alex
- DB mit Daten von https://www.bergsteigen.com/ in die DB einfügen (am besten erstmal ca. 20 Datensätze)
- 7. Suchleiste:
- siehe "Niedriger Aufwand"

### Nelly
- 6. Location Details nochmal ordnentlich machen
- siehe "Niedriger Aufwand"


## 🔴 Bald:
### Hoher Aufwand
#### 1. Benachrichtigung bei neuer Location in der Datenbank auslösen (Supabase):
In diesem Feature soll beim Einfügen einer neuen Location automatisch eine Benachrichtigung an alle Nutzer gesendet werden. Ziel ist es, dass Clients – z. B. auf der Startseite oder im Notification-Bereich – in Echtzeit über neue Locations informiert werden.

Die Umsetzung erfolgt vollständig über Supabase Realtime. Dafür wird ein Realtime-Listener im Frontend eingerichtet, der sich auf die Tabelle `locations` abonniert und auf neue Einträge (`INSERT`) lauscht. Der Listener wird in einem Custom Hook wie *./hooks/useLocationNotifications.ts* implementiert und verwendet `supabase.channel(...).on('postgres_changes', ...)`. Sobald eine neue Location erkannt wird, in *components/user/Profile/LeftSide/Notifications.tsx* eingefügt.

Um Benachrichtigungen auch für Offline-Nutzer bereitzuhalten, sollen neue Einträge zusätzlich in einer `notifications`-Tabelle gespeichert werden. Wenn man eine neue Location einfügt wird diese Tabelle gefüllt und beim Login eines Nutzers wird geguckt ob es noch nicht erhaltene Benachrichtigungen gibt.

Ein REST-Endpunkt zur Abfrage dieser Notifications ist bereits vorbereitet unter **`api/profile/notifications`**. Es muss lediglich die Logik in der Service-Schicht ergänzt werden – konkret in *services/profile.service.ts* – sowie der Controller über *router/profile.routes.ts* angepasst werden.

---

#### 2. Verkehrsanbindungen mit Weiterleitung an Google Maps einbauen (irgendwo auf der Page ***Locationdetails.tsx*** bzw. in ihren Components)
Entweder es wird nach der momentanen Location gefragt und diese als Startposition mit weitergeleitet und/oder man gibt die Startposition der Route an.

---

#### 3. Platzhalter von den Location-Cards entfernen und mit DB verbinden:
In diesem Feature geht es darum, dieselbe Card-Komponente an zwei verschiedenen Stellen im Projekt wiederzuverwenden: einmal auf der Startseite, um die 20 beliebtesten Locations anzuzeigen, und einmal auf der Listen-Seite, um alle verfügbaren Locations aus der Datenbank darzustellen. Die Card-Komponente selbst (*components/locationSearch/LocationCard.tsx.tsx*) bleibt dabei rein visuell und erhält ihre Daten über Props. Die Logik zum Abrufen der Daten wird getrennt in eigene Logik-Klasse ausgelagert: Die Methode ```useTopLocations``` lädt nur die 10 beliebtesten Locations, während ```useAllLocations``` alle Locations abruft. Diese Methoden werden implementiert in *./api/locationApi.ts*. In *./pages/HomePage.tsx* und *./pages/LocationListPage.tsx* werden die entsprechenden Hooks eingebunden und das Ergebnis über eine Map-Funktion an die Card übergeben. So bleibt jede Datei für genau eine Aufgabe zuständig, die Komponenten sind wiederverwendbar, und die Logik ist sauber getrennt.

---

#### 4. Favoriten anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
HTTP-Request an "/profile/favorites" in *backend/src/routes/profile.routes.ts* und *backend/src/controllers/profile.controller.ts* bzw.
backend/src/services/profile.service.ts, un die Logik zu implementieren (Backend hierfür steht noch nicht).
In der DB auf Supabase gibt es eine Zwischentabelle für Favoriten (Benutzer - Locations).

---

#### 5. Ratings anzeigen lassen (am besten erst wenn alle normalen Locations schon implementiert sind)
HTTP-Request an den Pfad "/profile/favorites" in *backend/src/routes/profile.routes.ts* und *backend/src/controllers/profile.controller.ts* bzw.
*backend/src/services/profile.service.ts*, un die Logik zu implementieren (Backend hierfür steht noch nicht).
In der DB auf Supabase gibt es eine Zwischentabelle für Bewertungen (Benutzer - Locations).

#### 6. Location Details nochmal ordnentlich machen
- Component und Logik auslagern
- Page so anpassen dass es den Header/Footer gibt
- Button zu Favoriten hinzufügen und entfernen
- Foto von der Location
- Sterne-Bewertung (wie auf den einzelnen Cards)
- Route ins Backend
- Komplette implementierung im Backend (inkl. index.ts, Router, Kontroller, Service wie bei den anderen Implementierungen)
- Google Maps weiterleitung
/details/{location.name}

#### 7. Suchleiste:
- Es werden bei Eingabe vom User Locations vorgeschlagen und ein drauf Klicken wird man aud die Locationdetails Page weitergeleitet
/details/{location.name}

#### 8. Karte muss interaktiv werden

#### 9. Administratoren moderieren Einträge und verwalten Nutzerkonten

### Niedriger Aufwand

- Nelly: /profil im Gastmodus unzugänglich machen (stattdessen an Login weitergeleitet werden)
- Alex: Dafür sorgen, dass in NavBarEnd.tsx das Profilbild angezeigt wird und nicht der Platzhalter
So wie in *components/user/Profile/LeftSide/ProfilePicture.tsx*. Es kann hier aber der Kontext *contexts/UserContext.tsx* benutzt werden, welcher die Bild-URL providet, um an den Profilbild-Link aus der DB zu kommen.
- In *Hero.tsx*: das Bild zu src/assets/images hinzufügen und damit den Link ersetzen


## 🟡 Gegen Ende vom Projekt:
- Funktionen/Components verkleinern und auseinander ziehen (ein usecase pro Datei - wie in Software Eng. besproche)
- Kommentare wie in Software Projekt einfügen

## 🟢 Wenn wir irgendwann noch Zeit/Lust haben:
- Aktivitätsverlauf im Profil

<br><br>

# PL4: Testen
> **Link zur Testfall-Exceltabelle:**: https://1drv.ms/x/c/23559581fb38386f/EZuOYUoH3uVPmOzSAYC2WCQBOGaiWynGtfcgwRQj_CQ91Q?e=YQjzGF <br>
> **Link zum Testkonzept Word-Dokument**: https://1drv.ms/w/c/23559581fb38386f/EaC5elM6aalMjtz9R05jOhwBSYFSbZMbm-CKxJJv4ME5tw?e=gZf1bS
## Teil 1: Testkonzept (Dokumentation – PDF, ca. 2 Seiten)
### Verantwortlich:
Aufgabe: Schreibe das vollständige Testkonzept nach den vorgegebenen Bausteinen:
### Inhalte: Lara
- Testumfang (Was wird getestet? – z. B. UI, Login, Location-Vorschläge etc.)
- Teststrategie (Black-Box-Systemtests, geplante Unit- und ggf. Integrationstests)
- Testziele (z. B. funktionierende Kernfunktionen, Benutzerfreundlichkeit)
- Testkriterien (Wann sind Tests bestanden? Erfolgskriterien, Abdeckungsgrad)
- Ressourcen (Browser, Jest, Excel, Teamrollen)
- Zeitplan (z. B. Systemtests vor Review, Unit-Tests ab Paket 5 etc.)

> Endergebnis: PDF-Datei, z. B. “KletterApp_Testkonzept.pdf”

## Teil 2: Systemtestfälle (Excel – Login & Registrierung)
> Akzeptanzkriterien aus Jira beachten!
### Verantwortlich: Alex
Aufgabe: Testfälle für alle Anforderungen rund um:
- Registrierung (Gast/Benutzer)
- Login
- Fehlerhafte Eingaben (falsches Passwort, leeres Feld)

Inhalte je Testfall: ID, Beschreibung, Bezug zu US, Eingaben, erwartete Ausgaben, Testschritte

> Endergebnis: Excel-Sheet mit Testfällen → später gesammelt mit den anderen

## Teil 3: Systemtestfälle (Excel – Location, Suche, Karte)
> Akzeptanzkriterien aus Jira beachten!
### Verantwortlich: Person C
### Aufgabe: Kimia
Testfälle für:
- Location-Eintrag & Bewertung
- Suche mit Filter
- Kartenanzeige & Interaktion

Inhalte je Testfall:
- Realistische Eingaben (z. B. Outdoor, Umkreis), auch Fehlerfälle (z. B. leere Suche)

> Endergebnis: Eigene Zeilen im Excel, später zusammengeführt

## Teil 4: Systemtestfälle (Excel – Nahverkehr, Benachrichtigung)
> Akzeptanzkriterien aus Jira beachten!
### Verantwortlich: Nelly
### Aufgabe:
Testfälle für:
- Nahverkehrsvorschläge anzeigen
- Benachrichtigungen erhalten (z. B. neue Location)
- Optional: Zugriff als Gast mit eingeschränkten Rechten

Besonderheiten: Auch Varianten testen, z. B. kein Nahverkehr verfügbar

> Endergebnis: Excel-Zeilen im Gesamtdokument
