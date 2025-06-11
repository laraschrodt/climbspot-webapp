# 📋 ToDo-Liste und Aufgabenverteilung

## ✅ Aufgabenverteilung verteilt nach Person

> **Bis dahin alle Tests fertig haben:**

### Lara

- [ ]

### Kimia

- [ ] Ratings

### Alex

- [ ] Location Daten

### Nelly

- [ ]

## 🔴 Bald:

### Hoher Aufwand

#### 1. Benachrichtigung bei neuer Location in der Datenbank auslösen (Supabase):

In diesem Feature soll beim Einfügen einer neuen Location automatisch eine Benachrichtigung an alle Nutzer gesendet werden. Ziel ist es, dass Clients – z. B. auf der Startseite oder im Notification-Bereich – in Echtzeit über neue Locations informiert werden.

Die Umsetzung erfolgt vollständig über Supabase Realtime. Dafür wird ein Realtime-Listener im Frontend eingerichtet, der sich auf die Tabelle `locations` abonniert und auf neue Einträge (`INSERT`) lauscht. Der Listener wird in einem Custom Hook wie _./hooks/useLocationNotifications.ts_ implementiert und verwendet `supabase.channel(...).on('postgres_changes', ...)`. Sobald eine neue Location erkannt wird, in _components/user/Profile/LeftSide/Notifications.tsx_ eingefügt.

Um Benachrichtigungen auch für Offline-Nutzer bereitzuhalten, sollen neue Einträge zusätzlich in einer `notifications`-Tabelle gespeichert werden. Wenn man eine neue Location einfügt wird diese Tabelle gefüllt und beim Login eines Nutzers wird geguckt ob es noch nicht erhaltene Benachrichtigungen gibt.

Ein REST-Endpunkt zur Abfrage dieser Notifications ist bereits vorbereitet unter **`api/profile/notifications`**. Es muss lediglich die Logik in der Service-Schicht ergänzt werden – konkret in _services/profile.service.ts_ – sowie der Controller über _router/profile.routes.ts_ angepasst werden.

---

#### 2. Verkehrsanbindungen mit Weiterleitung an Google Maps einbauen (irgendwo auf der Page **_Locationdetails.tsx_** bzw. in ihren Components)

Entweder es wird nach der momentanen Location gefragt und diese als Startposition mit weitergeleitet und/oder man gibt die Startposition der Route an.

---

#### 3. Ratings anzeigen lassen

HTTP-Request an den Pfad "/profile/favorites" in _backend/src/routes/profile.routes.ts_ und _backend/src/controllers/profile.controller.ts_ bzw.
_backend/src/services/profile.service.ts_, un die Logik zu implementieren (Backend hierfür steht noch nicht).
In der DB auf Supabase gibt es eine Zwischentabelle für Bewertungen (Benutzer - Locations).

---

#### 4. Location Details nochmal ordnentlich machen

- Component und Logik auslagern
- Page so anpassen dass es den Header/Footer gibt
- Button zu Favoriten hinzufügen und entfernen
- Foto von der Location
- Sterne-Bewertung (wie auf den einzelnen Cards)
- Route ins Backend
- Komplette implementierung im Backend (inkl. index.ts, Router, Kontroller, Service wie bei den anderen Implementierungen)
- Google Maps weiterleitung
  /details/{location.name}

---

#### 5. Karte muss interaktiv werden

---

#### 6. Administratoren moderieren Einträge und verwalten Nutzerkonten

### Niedriger Aufwand

- Nelly: /profil im Gastmodus unzugänglich machen (stattdessen an Login weitergeleitet werden)
- In _Hero.tsx_: das Bild zu src/assets/images hinzufügen und damit den Link ersetzen

## 🟡 Gegen Ende vom Projekt:

- Funktionen/Components verkleinern und auseinander ziehen (ein usecase pro Datei - wie in Software Eng. besproche)
- Kommentare wie in Software Projekt einfügen

## PL5: Testen

- Javadoc Dokumentation schreiben im Code
  - nur wichtige Dinge, keine unnötigen Kommentare (welche Dinge beschreiben die man eh auf den ersten Blick sieht)
  - in Kontext zum Rest unserer Architektur stellen, sodass man das Zusammenspiel der Komponenten versteht
  - also nicht übertreiben
- Unit-Tests (??Integrationstests??):
  - d

> Das Ergebnis ist eine ZIP-Datei des kompletten Quellcodes inkl. der Unit-Tests. Bitte säubern Sie die Verzeichnisse bevor Sie diese zippen. Es sollten z.B. keine Binärdateien oder Bibliotheken (wie das Verzeichnis "node_modules") mit abgeben werden.
