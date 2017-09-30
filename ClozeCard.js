

var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;
}

ClozeCard.prototype.fullText = function() {
	var fullText = this.text;
}

ClozeCard.prototype.partial = function() {
	var partialText = this.text;
	// Separate the words in the string by commas and place into an array with .split()
	// Pass this.cloze into .split in order to locate and replace the cloze keyword in the array
	// Replace the defaulted comma with ... by using .join("...")
	var partialTextArr = partialText.split(this.cloze).join("...");
	if(partialTextArr = partialText.split(this.cloze).join("...")) {
		
	}

	return(partialTextArr);
}


module.exports = ClozeCard;





