# 📋 ToDo-Liste und Aufgabenverteilung

## ✅ Aufgabenverteilung verteilt nach Person

> **Kurze Rückmeldung am Sonntag Abend wie es läuft** <br> > **Bis dahin alle Tests fertig haben + MEETING:** Montag, 16.06.2025 19 Uhr <br> > **Bis dahin alle Unit/Integration Tests implementert haben** Freitag, 20.06.2025 <br> > **Deployment + MEETING:** Sonntag, 22.06.2025 19 Uhr

## Bugs

- [ ] Wenn man ein neues Profil macht klappt das Übertragen von Daten wie Vorname/Nachname etc. ins Backend nicht (nur veränderrn klappt)
- [ ] Sterne-Bewertungen in PopularLocations auf der Homepage werden nicht angezeigt
- [ ] Ja/Nein Radiobutton bei "Kinderfreundlich?" im Formular zum Erstellen und Ändern einer Location funktioniert nicht
- [ ] Benachrichtigung laden immer neu, auch wenn man auf "gesehen" drückt
- [ ] Favoriten fixen
- [ ] Pages auf Handy-Ansicht anpassen
- [ ] Funktionen/Components verkleinern und auseinander ziehen (ein usecase pro Datei - wie in Software Eng. besproche)

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
- [x] Im Profil eine Seite machen in der man die Locations sieht, die man selbst hinzugefügt hat
- [x] Eigene Locations bearbeitbar machen
- [x] Eigene Locations löschen
- [x] jest config
- [x] Admins können alle Locations verwalten
- [x] Gastrechte beschränken
- [ ] Admins können andere Admins erstellen
- [x] Admins können alle Benutzer verwalten

`Kimia`:

- [x] Größe von Location Cards im Profil anpassen
- [x] Benachrichtigungen bei neuer Location
- [ ] Gucken dass Notification dauerhaft gelöscht wird, wenn man auf "gesehen" klickt

`Nelly`:

- [ ] Gucken dass man von jeder Page aus zu Favoriten hinzufügen/entfernen kann
- [x] Berwertungen schreiben (Sterne-Rating und kurzer Text) und anzeigen auf LocationDetails
  - Bei jeder LocationDetail Seite gibt es über den Bewertungen einen Bereich indem man selbst ein
    Sterne-Rating abgeben kann und einen kurzen Bewertungstext schreiben kann - die eigene Bewertung ist persistiert und änderbar (so ähnlich wie das Ändern von Infos im Formular vielleicht)

`Alex`:

- [x] Interaktive Karte und gucken, dass der Filter funktioniert bei der Karte
- [ ] Fehlende Felder in DB nachtragen bei Locations (es muss alles besetzt sein)
- [x] Pins auf der Karte müssen einen irgendwie zu LocationDetails von der angeklickten Loation führen

---

### Unit-Tests:

- [ ] Regestrierung (`Kimia`)
- [ ] Anmeldung (`Nelly`)
- [ ] Location hinzufügen (`Nelly`)
- [ ] Bewertung schreiben (`Kimia`)
- [ ] Location favorisieren (`Lara`)
- [ ] Admin-Funktionen (`Lara`)
- [x] Suchfunktion im Header (`Alex`)
- [x] Filterfunktion bei Karte und Liste (`Alex`)
- [ ] Nahverkehrsintegration (`Nelly`)
- [ ] Interaktive Karte (`Lara`)
- [ ] Benachrichtigungen (`Kimia`)

> Tests kommen in den `tests`-Ordner jeweils im Frontend und im Backend.<br>
> Macht euch einen Unterordner für euer Feauture, das ihr testet (z.B. `register`, `login` etc.) <br>
> Wenn Funktionen zu groß sind um eine Funktion zu testen zieht sie auseinander. <br>
