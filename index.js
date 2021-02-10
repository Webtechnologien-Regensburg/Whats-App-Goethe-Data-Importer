/* eslint-env node */

import DatabaseImporter from "./lib/DatabaseImporter.js";
import DataParser from "./lib/DataParser.js";

let dbFile = process.argv[2],
    dataPathForLetters = process.argv[3],
    dataPathForPersons = process.argv[4];

function onLetterParsed(letter) {
    console.log(`Importing letter from ${letter.from} to ${letter.to}`);
    DatabaseImporter.importLetter(letter);
}

function onPersonParsed(person) {
    console.log(`Importing information on ${person.name}`);
    DatabaseImporter.importPerson(person);
}

function onDatabaseReady() {
    DataParser.setLetterParserListener(onLetterParsed);
    DataParser.setPersonParserListener(onPersonParsed);
    // TODO: Ergänzen Sie hier ggf. selbst erstellte Filter
    DataParser.parseLettersFrom(dataPathForLetters);
    DataParser.parsePersonsFrom(dataPathForPersons);
}

DatabaseImporter.prepare(dbFile, onDatabaseReady);