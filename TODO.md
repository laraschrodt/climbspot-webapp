# 📋 ToDo-Liste und Aufgabenverteilung

## ✅ Aufgabenverteilung verteilt nach Person

> **Kurze Rückmeldung am Sonntag Abend wie es läuft** <br> > **Bis dahin alle Tests fertig haben + MEETING:** Montag, 16.06.2025 19 Uhr <br> > **Bis dahin alle Unit/Integration Tests implementert haben** Freitag, 20.06.2025 <br> > **Deployment + MEETING:** Sonntag, 22.06.2025 19 Uhr

## 🧪 Testen

### Javadoc Dokumentation schreiben im Code (`Alex`)

- nur wichtige Dinge, keine unnötigen Kommentare (welche Dinge beschreiben die man eh auf den ersten Blick sieht)
- in Kontext zum Rest unserer Architektur stellen, sodass man das Zusammenspiel der Komponenten versteht
- also nicht übertreiben

---

### Zu erledigen vor den Tests:

`Lara`:

- [x] Neue Page um Location hinzuzufügen
- [x] Komm in die Community Button verlinken
- [ ] Im Profil eine Seite machen in der man die Locations sieht, die man selbst hinzugefügt hat
- [ ] Eigene Locations bearbeitbar machen
- [ ] Admin Funktionen und Rollen einbauen (-> Gastrechte beschränken)
- [x] jest config

`Kimia`:

- [x] Größe von Location Cards im Profil anpassen
- [x] Benachrichtigungen bei neuer Location

`Nelly`:

- [ ] Gucken dass man von jeder Page aus zu Favoriten hinzufügen/entfernen kann ()
- [ ] Berwertungen schreiben (Sterne-Rating und kurzer Text) und anzeigen auf LocationDetails
  - Bei jeder LocationDetail Seite gibt es über den Bewertungen einen Bereich indem man selbst ein
    Sterne-Rating abgeben kann und einen kurzen Bewertungstext schreiben kann - die eigene Bewertung ist persistiert und änderbar (so ähnlich wie das Ändern von Infos im Formular vielleicht)

`Alex`:

- [ ] Interaktive Karte und gucken dass der Filter funktioniert bei der Karte

---

### Unit-Tests:

- [ ] Regestrierung (`Kimia`)
- [ ] Anmeldung (`Nelly`)
- [ ] Location hinzufügen (`Nelly`)
- [ ] Bewertung schreiben (`Kimia`)
- [ ] Location favorisieren (`Lara`)
- [ ] Admin-Funktionen (`Lara`)
- [ ] Suchfunktion im Header (`Alex`)
- [ ] Filterfunktion bei Karte und Liste (`Alex`)
- [ ] Nahverkehrsintegration (`Nelly`)
- [ ] Interaktive Karte (`Lara`)
- [ ] Benachrichtigungen (`Kimia`)

> Tests kommen in den `tests`-Ordner jeweils im Frontend und im Backend.<br>
> Macht euch einen Unterordner für euer Feauture, das ihr testet (z.B. `register`, `login` etc.) <br>
> Wenn Funktionen zu groß sind um eine Funktion zu testen zieht sie auseinander. <br>

## 🔴 Bald:

### Hoher Aufwand

#### 1. Benachrichtigung bei neuer Location in der Datenbank auslösen (Supabase):

In diesem Feature soll beim Einfügen einer neuen Location automatisch eine Benachrichtigung an alle Nutzer gesendet werden. Ziel ist es, dass Clients – z. B. auf der Startseite oder im Notification-Bereich – in Echtzeit über neue Locations informiert werden.

Die Umsetzung erfolgt vollständig über Supabase Realtime. Dafür wird ein Realtime-Listener im Frontend eingerichtet, der sich auf die Tabelle `locations` abonniert und auf neue Einträge (`INSERT`) lauscht. Der Listener wird in einem Custom Hook wie _./hooks/useLocationNotifications.ts_ implementiert und verwendet `supabase.channel(...).on('postgres_changes', ...)`. Sobald eine neue Location erkannt wird, in _components/user/Profile/LeftSide/Notifications.tsx_ eingefügt.

Um Benachrichtigungen auch für Offline-Nutzer bereitzuhalten, sollen neue Einträge zusätzlich in einer `notifications`-Tabelle gespeichert werden. Wenn man eine neue Location einfügt wird diese Tabelle gefüllt und beim Login eines Nutzers wird geguckt ob es noch nicht erhaltene Benachrichtigungen gibt.

Ein REST-Endpunkt zur Abfrage dieser Notifications ist bereits vorbereitet unter **`api/profile/notifications`**. Es muss lediglich die Logik in der Service-Schicht ergänzt werden – konkret in _services/profile.service.ts_ – sowie der Controller über _router/profile.routes.ts_ angepasst werden.

---

#### 3. Ratings anzeigen lassen

HTTP-Request an den Pfad "/profile/favorites" in _backend/src/routes/profile.routes.ts_ und _backend/src/controllers/profile.controller.ts_ bzw.
_backend/src/services/profile.service.ts_, un die Logik zu implementieren (Backend hierfür steht noch nicht).
In der DB auf Supabase gibt es eine Zwischentabelle für Bewertungen (Benutzer - Locations).

---

#### 5. Karte muss interaktiv werden

---

#### 6. Administratoren moderieren Einträge und verwalten Nutzerkonten

## 🟡 Gegen Ende vom Projekt:

- Funktionen/Components verkleinern und auseinander ziehen (ein usecase pro Datei - wie in Software Eng. besproche)
- Kommentare wie in Software Projekt einfügen
