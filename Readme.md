# What's App Goethe? Data-Importer

Mit diesem Skript können Sie den Import der im *JSON*-Format vorliegenden Briefe und Personenbeschreibungen in die benötigte SQLite-Datenbank automatisieren. Wir haben Ihnen dazu einen Teil des Skripts bereits vorgegeben. Sie müssen noch eine geeignete Datenbankstruktur erstellen und die SQL-Querys zum Eintragen der einzelnen Geschichten schreiben. Aktuell erstellt das Skript eine leere SQLite-Datenbank, iteriert über einen angegebenen Ordner und wandelt die dortigen Dateien in JavaScript-Objekte um, die einzelne Briefe und Personen repräsentieren. Für jeden Brief bzw. jede Biographie wird in dem zentralen Modul der Anwendung (`index.js`) einmal die jeweilige *Callback*-Methode (`onLetterParsed` bzw. `onPersonParsed`) aufgerufen. Im Parameter finden Sie ein JavaScript-Objekt, dass die jeweiligen Inhalte repräsentiert und via Methodenaufruf bereits an das `DatabaseImporter`-Modul weitergeben wird. Dort müssen die Informationen aus dem JavaScript-Objekt dann in die SQLite-Datenbank übertragen werden.

**Bei Fragen zu diesem Teil der Aufgabe wenden Sie sich bitte an Alexander Bazo.**

## Grundlagen

Der Skript funktioniert mit den JSON-formatierten Brief- und Biopgraphie-Dateien, die wir Ihnen in [einem separaten Datensatz](https://files.mi.ur.de/f/182542f1081d4df8b99a/?dl=1) bereitgestellt haben. Die Inhalte sind dabei nach diesem Schema aufgebaut:

### Letter

```
{ 
  "from": "", 
  "to": "", 
  "date": "",
  "place": "",
  "text": ""
}
```

### Person

```
{
    "name": "",
    "dateOfBirth": "",
    "placeOfBirth": "",
    "dateOfDeath": ",
    "placeOfDeath": "",
    "biography": ""
}
```

## Vorbereitung

- Laden Sie den Quellcode über [diesen Link](https://github.com/Webtechnologien-Regensburg/Whats-App-Goethe-Data-Importer/archive/master.zip) herunter. 
- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm install` aus, um alle notwendigen Abhängigkeiten zu installieren.
- Erstellen Sie einen Ordner `data` im Projektverzeichnis und kopieren Sie die [bereitgestellten JSON-Dateien](https://files.mi.ur.de/f/182542f1081d4df8b99a/?dl=1) dort hinein. Briefe und Biographien werden dabei in separaten Unterordnern `letters` und `people` abgelegt.

## Starten des Import-Skripts

- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm start` aus
- Der Skript erstellt eine leere SQLite-Datenbank (`db.sqlite`) und versucht alle JSON-Dateien aus dem `data`-Verzeichnis zu importieren

### TODOs

- Ergänzen Sie im Modul `DatabaseImporter.js` die notwendige Funktionalität zum Erstellen eines geeigneten Datenbankschemas
- Vervollständigen Sie im Modul `DatabaseImporter.js` die Methode zum Überführen des JavaScript-OBjekts in die Datenbank