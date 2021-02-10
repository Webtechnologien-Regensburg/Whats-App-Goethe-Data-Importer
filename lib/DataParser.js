/* eslint-env node */

import fs from "fs";
import path from "path";

let skippedFiles;

function createLetterFromFile(filePath, filters, callback) {
    let fileContent = fs.readFileSync(filePath, { encoding: "utf8" }),
        letter = Letter.fromJSON(fileContent);
    callback(letter);
}

function createPersonInformationFromFile(filePath, callback) {
    let fileContent = fs.readFileSync(filePath, { encoding: "utf8" }),
        person = Person.fromJSON(fileContent);
    callback(person);
}

class Letter {

    constructor(from, to, date, place, text) {
        this.from = from;
        this.to = to;
        this.date = date;
        this.place = place;
        this.text = text;
        Object.freeze(this);
    }

    static fromJSON(json) {
        let jsonObject = JSON.parse(json);
        return new Letter(jsonObject.from, jsonObject.to, jsonObject.date, jsonObject.place, jsonObject.text);
    }

}

class Person {

    constructor(name, dateOfBirth, placeOfBirth, dateOfDeath, placeOfDeath, biography) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.placeOfBirth = placeOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.placeOfDeath = placeOfDeath;
        this.biography = biography;
        Object.freeze(this);
    }

    static fromJSON(json) {
        let jsonObject = JSON.parse(json);
        return new Person(jsonObject.name, jsonObject.dateOfBirth, jsonObject.placeOfBirth, jsonObject.dateOfDeath, jsonObject.placeOfDeath, jsonObject.biography);
    }

}

class DataParser {

    constructor() {
        this.letterFilters = [];
    }

    setLetterParserListener(callback) {
        this.letterParserListener = callback;
    }

    setPersonParserListener(callback) {
        this.personParserListener = callback;
    }

    parseLettersFrom(dataPath) {
        let files = fs.readdirSync(dataPath);
        skippedFiles = 0;
        for (let i = 0; i < files.length; i++) {
            let filePath = path.join(dataPath, files[i]);
            createLetterFromFile(filePath, this.letterFilters, this.letterParserListener);
        }
    }

    parsePersonsFrom(dataPath) {
        let files = fs.readdirSync(dataPath);
        skippedFiles = 0;
        for (let i = 0; i < files.length; i++) {
            let filePath = path.join(dataPath, files[i]);
            createPersonInformationFromFile(filePath, this.personParserListener);
        }
    }

}

export default new DataParser();