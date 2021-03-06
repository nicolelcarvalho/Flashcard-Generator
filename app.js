
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");


var basicCardsArr = [];        // Holds the stored basic flashcard objects
var clozeCardsArr = [];        // Holds the stored cloze flashcard objects
var editedClozeArr = [];       // Holds the stored cloze flashcard objects, with the partial property added
var count = 0;  // Count variable allows us to advance to the next question as the questions are being read from the .txt files


// Start the first prompt 
function startPrompt() {
	inquirer.prompt([
		{
			name: "select",
			type: "list",
			message: "What would you like to do?",
			choices: ["Show flashcards from stored library.", "Create new flashcards.", "Quit."]
		}

		]).then(function(userSelect) {
			if(userSelect.select === "Show flashcards from stored library.") {
				typeOfFlashCards();
			} else if(userSelect.select === "Create new flashcards.") {
				createNewFlashCards();
			} else if(userSelect.select === "Quit.") {
				console.log("Thanks for playing!");
			}

		});
}
startPrompt();


// Allow the user to choose what type of flashcards they would like to use from the stored questions: cloze or basic 
function typeOfFlashCards() {
	inquirer.prompt([
		{
			name: "flashcard",
			type: "list",
			message: "What type of flashcard would you like to use?",
			choices: ["basic-flashcards", "cloze-flashcards"]
		}

		]).then(function(kindOf) {
			if(kindOf.flashcard === "basic-flashcards") {
				createBasicFlashCards(); // Create basic flashcards here, then call the show basic flashcards above
			} else if (kindOf.flashcard === "cloze-flashcards") {
				createClozeFlashCards();
			}
		}); 
}


// Function to create basic flashcards so that the user has a stored library to start from
function createBasicFlashCards() { 

	var firstPresident = new BasicCard(
		"Who was the first president of the United States?", "George Washington");

	var worldWar = new BasicCard(
		"World War I began in what year?", "1914");

	var independence = new BasicCard(
		"In what city was the Declaration of Independence signed?", "Philadelphia");

	var manOnMoon = new BasicCard(
		"In what year did America land the first man on the moon?", "1969");

	var louisianaPurchase = new BasicCard(
		"Which country did America buy the Louisiana Purchase from?", "France");

	var wrightBrothers = new BasicCard(
		"Who were the first people to fly an airplane?", "The Wright Brothers");

	var lightBulb = new BasicCard(
		"Who invented the electric light bulb?", "Thomas Edison");

	var discoveringAmerica = new BasicCard(
		"Who is credited with discovering America?", "Christopher Columbus");

	basicCardsArr.push(firstPresident);
	basicCardsArr.push(worldWar);
	basicCardsArr.push(independence);
	basicCardsArr.push(manOnMoon);
	basicCardsArr.push(louisianaPurchase);
	basicCardsArr.push(wrightBrothers);
	basicCardsArr.push(lightBulb);
	basicCardsArr.push(discoveringAmerica);

	// Write questions in JSON format to questions.json file
	fs.writeFile("questions.json", JSON.stringify(basicCardsArr, null, 2), function(error, data) {
		if(error) {
			console.log(error);
		}
		// Then show the basic flashcards
		showBasicFlashCards();
	});
}


// Function to create cloze flashcards so that the user has a stored library to start from
function createClozeFlashCards() {

	var firstPresident = new ClozeCard(
		"George Washington was the first President of the United States.", "George Washington");
	
	var worldWar = new ClozeCard(
		"The first World War began in 1914.", "1914");

	var independence = new ClozeCard(
		"The Declaration of Independence was signed in the city of Philadelphia in 1776.", "Philadelphia");

	var manOnMoon = new ClozeCard(
		"In 1969 America landed the first man on the moon.", "1969");

	var louisianaPurchase = new ClozeCard(
		"America bought The Louisiana Purchase from France.", "France");

	var wrightBrothers = new ClozeCard(
		"The Wright Brothers were the first people to fly an airplane.", "Wright Brothers");

	var lightBulb = new ClozeCard(
		"The electric light bulb was invented by Thomas Edison.", "Thomas Edison");

	var discoveringAmerica = new ClozeCard(
		"Christopher Columbus is credited with discovering America.", "Christopher Columbus");

	clozeCardsArr.push(firstPresident);
	clozeCardsArr.push(worldWar);
	clozeCardsArr.push(independence);
	clozeCardsArr.push(manOnMoon);
	clozeCardsArr.push(louisianaPurchase);
	clozeCardsArr.push(wrightBrothers);
	clozeCardsArr.push(lightBulb);
	clozeCardsArr.push(discoveringAmerica);

	// Loop through the array of cloze question objects
	for (var i = 0; i < clozeCardsArr.length; i++) {
			var partial = clozeCardsArr[i].partial();
			// Add the partial property that contains the partial text of the question
			var clozeObj = {
				fullText: clozeCardsArr[i].text,
				cloze: clozeCardsArr[i].cloze,
				partial: partial
			}
			// Push the clozeObj that contains all three needed properties to its own array and write this array to the questions.json file
			editedClozeArr.push(clozeObj);
			// Write questions in JSON format to questions.json file
			fs.writeFile("questions.json", JSON.stringify(editedClozeArr, null, 2), function(error, data) {
				if(error) {
					console.log(error);
				}
			});
	}
		// Then show the cloze flashcards
		showClozeFlashCards();
}


// Read from stored basic flashcard questions and write them to the console via prompts
function showBasicFlashCards() {

	fs.readFile("questions.json", "utf8", function(error, data){

		var basicCardsObj = JSON.parse(data);

		if(count < basicCardsObj.length) {
			currentFlashcard = basicCardsObj[count];
		
			inquirer.prompt([
			{
				name: "question",
				type: "input",
				message: basicCardsObj[count].front
			}

			]).then(function(answer){
				if(answer.question === basicCardsObj[count].back) {
						console.log("That's correct!");
				} else {
					console.log("Sorry, the answer was " + basicCardsObj[count].back);
				}

				showBasicFlashCards();
				count++
			});

		} else {
			count = 0;
			basicCardsArr = [];
			completedFlashCards();
		}
	});
} 


// Read from stored cloze flashcard questions and write them to the console via prompts
function showClozeFlashCards() {
	fs.readFile("questions.json", "utf8", function(error, data){

		var clozeCardsObj = JSON.parse(data);

		if(count < clozeCardsObj.length) {
			currentFlashcard = clozeCardsObj[count];

			inquirer.prompt([
			{
				name: "question",
				type: "input",
				message: clozeCardsObj[count].partial
			}

			]).then(function(answer){

				if(answer.question === clozeCardsObj[count].cloze) {
							console.log("That's correct!");
					} else {
						console.log("Sorry, the answer was " + clozeCardsObj[count].cloze);
				}

				showClozeFlashCards();
				count++
			});

		} else {
			count = 0;
			clozeCardsArr = [];
			editedClozeArr = [];
			completedFlashCards();
		}
	});
}


//Prompts for the user to create their own cards.
function createNewFlashCards() {
	inquirer.prompt([
		{
			name: "question",
			type: "list",
			message: "What type of flashcards would you like to create?",
			choices: ["basic-flashcards", "cloze-flashcards"]
		}

		]).then(function(kindOf) {
			if(kindOf.question === "basic-flashcards") {
				userCreatesBasicCards();
			} else if (kindOf.question === "cloze-flashcards") {
				userCreatesClozeCards();
			}
		});
}


// Allows the user to create their own basic flashcards
function userCreatesBasicCards() {
	inquirer.prompt([
		{
			name: "basicFront",
			type: "input",
			message: "What would you like the front of the flashcard to say?"
		},
		{
			name: "basicBack",
			type: "input",
			message: "What would you like the back of the flashcard to say?"
		},
		{
			name: "newOrShow",
			type: "list",
			message: "Would you like to create another flashcard or begin showing your flashcards?",
			choices: ["Create another basic flashcard", "Begin showing flashcards"]
		}

		]).then(function(basic) {
			var newBasicCard = new BasicCard(basic.basicFront, basic.basicBack);
			// Store this newly created card in an array of objects
			basicCardsArr.push(newBasicCard);

			fs.writeFile("questions.json", JSON.stringify(basicCardsArr, null, 2), function(error, data) {
				if(error) {
					console.log(error);
				}
			});

				if(basic.newOrShow === "Create another basic flashcard") {
					userCreatesBasicCards();
				} else if(basic.newOrShow === "Begin showing flashcards") {
					showBasicFlashCards();
				}
		}); 
}


// Allows the user to create their own cloze flashcards
function userCreatesClozeCards() {
	inquirer.prompt([
		{
			name: "fullText",
			type: "input",
			message: "Write the full sentence including the cloze."
		},
		{
			name: "cloze",
			type: "input",
			message: "Write just the cloze.",
			validate: function(value) {
				if(!value) {
					console.log("Please enter a valid cloze.");
				} else {
					return true;
				}
			}
		},
		{
			name: "newOrShow",
			type: "list",
			message: "Would you like to create another or begin showing your flashcards?",
			choices: ["Create another cloze flashcard", "Begin showing flashcards"]
		}

		]).then(function(cloze) {
			var newClozeCard = new ClozeCard(cloze.fullText, cloze.cloze);
			clozeCardsArr.push(newClozeCard);

				if(cloze.newOrShow === "Create another cloze flashcard") {
					userCreatesClozeCards();
				} else if(cloze.newOrShow === "Begin showing flashcards") {

						for (var i = 0; i < clozeCardsArr.length; i++) {
							var partial = clozeCardsArr[i].partial();
						
							var clozeObj = {
								fullText: clozeCardsArr[i].text,
								cloze: clozeCardsArr[i].cloze,
								partial: partial
							}
								editedClozeArr.push(clozeObj);
							}

						fs.writeFile("questions.json", JSON.stringify(editedClozeArr, null, 2), function(error, data) {
							if(error) {
								console.log(error);
							}
						});

						showClozeFlashCards();
				}
		});
}


function completedFlashCards() {
	inquirer.prompt([
		{
			name: "next",
			type: "list",
			message: "You completed this set of flashcards! What would you like to do next?",
			choices: ["Show flashcards from stored library.", "Create new flashcards.", "Quit."]
		}

		]).then(function(userSelect) {
			if(userSelect.next === "Show flashcards from stored library.") {
				typeOfFlashCards();
			} else if(userSelect.next === "Create new flashcards.") {
				createNewFlashCards();
			} else if(userSelect.next === "Quit.") {
				console.log("Thanks for playing!");
			}
		});
}


