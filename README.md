# Flashcard-Generator
Week 6 - Advanced JavaScript Contructors Assignment 

Created during Week 6 of Rutgers Coding Bootcamp. The challenge was to create the backend for a basic flashcard application with Node JS. Via the command line, the app essentially allows users to:

1. Run through flashcards from questions that have already been created.

2. Run through flashcards from questions that they themselves create. 

Users have the option to view or create flashcards in a **basic** flashcard format or **cloze-deleted** flashcard format.

* **Basic** flashcards have a front (_"Who was the first president of the United States?"_) and a back (_"George Washington"_).

* **Cloze-Deleted** flashcards present _partial_ text (_"... was the first president of the United States."_).

#### Cloze Deletions

A **cloze deletion** is simply a sentence that has had some of its text removed. For example, given the sentence:

	"George Washington was the first president of the United States."

	...We can create a "cloze deletion" by removing the words "George Washington":

	"... was the first president of the United States."

This is useful for building flash card applications that forces users to remember the important part of a sentence, and is [a common device in educational applications](https://en.wikipedia.org/wiki/Cloze_test).

## Getting Started

- Clone down repo.
- Run command `npm install` in Terminal or GitBash to install necessary npms
- Run command `node app.js` in Terminal or GitBash to run the application
- You will then be given a menu of options:
  * `Show flashcards from stored library` will allow you to view flashcards from questions already created.
  * `Create new flashcards` will allow you to create your own set of questions to use as flashcards. 
  * `Quit` will allow you to quit the applicaton.
- You will then be able to view or create flashcards in a basic flashcard format or cloze flashcard format.
- Once you have run through all of the flashcards, you will be taken back to the original menu.

## Tech used
- Node.js
- Inquirer NPM Package - https://www.npmjs.com/package/inquirer
- FS (File System) NPM Package - A core node package for reading and writing files

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```

## Built With

* Sublime Text - Text Editor

## Authors

* **Nicole Carvalho** - *Node JS* - [Nicole Carvalho](https://github.com/nicolelcarvalho)


