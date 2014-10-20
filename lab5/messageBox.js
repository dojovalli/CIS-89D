// JavaScript Document

var DEBUG = false;
var reachedMaxChar = false;
var count;

// 'Main' Message Method
function mainMessage() {
	if (DEBUG) alert("Enter mainMessage()");
	// Create constants for the MAX_CHAR_COUNT
	var MAX_CHAR_COUNT = 140;
	
	// Get the message from the textField
	//var message = getMessage("userMessage");
	var message = getTextField("userMessage");
	
	// If the count exceeds the max, deny the user the ability to type
	count = message.length;
	if ( count > MAX_CHAR_COUNT ) {
		// Exit the app without incrementing count or displaying keypressed
		return false;
	}
	
	if (DEBUG) alert("message.value: " + message.value);
	// Setup the character count display field
	setupCharCountMessage(message.value, MAX_CHAR_COUNT);
	
	// Setup the character ASCII code display field
	setupASCIICodeMessage(message.value, "ascCode");
	
	return true;
}

/* Returns a string representing the users message */
function getMessage(htmlId) {
	if (DEBUG) {
		alert("Enter getMessage()" + "\n"
			+ "htmlId: " + htmlId + "\n");
	}
	// Get the message by its id
	var divObject = document.getElementById(htmlId);
	var str = divObject.innerHTML;
	
	return str;
}

function getTextField(htmlId) {
	if (DEBUG) {
		alert("Enter getTextField()" + "\n"
			+ "htmlId: " + htmlId + "\n");
	}
	// Get the message by its id
	var divObject = document.getElementById(htmlId);
	return divObject;
}

/* Retrieves the last index of a message */
function getLastIndex(message) {
	if (DEBUG) alert("Enter getLastIndex(message)");
	// Get the last index of message
	var pos = message.length;
	return pos;
}

/* Retrieves the last char of a message */
function getLastChar(message) {
	if (DEBUG) alert("Enter getLastChar(message)");
	var char = str.charAt(message.length);
	return char;
}

/* Retrieves the ASCII value for a char
	ASSUMPTION: 	Assumes that the string is only one character long, 
					else the first character's code is returned
*/
function getASCIICode(char) {
	if (DEBUG) alert("Enter getASCIICode(char)");
	var code = char.charCodeAt(0);
	return code;
}

function getLastCharASCIICode(message) {
	if (DEBUG) {
		alert("Enter getASCIICode(message)" + "\n"
			+ "message.length: " + message.length);
	}
	var char = message.charAt(message.length - 1);
	var code = message.charCodeAt(message.length - 1);
	if (DEBUG) alert("char for code: " + char + " = " + code);
	
	return code;
}

function calcRemainCharsMessage(message, maxChars, alertUser) {
	if (DEBUG) alert("Enter calcRemainCharsMessage(message, maxChars)");
	// Reset the local var representing the returnText
	var returnText = "";
	
	// Get the length of the message
	var charCount = message.length;
	if (DEBUG) alert("charCount: " + charCount);
	
	// Check to see if the length is equal to or greater than the maxChars
	if ( charCount >= maxChars ) {
		returnText =  "0 character. Stop now.";	
		if(alertUser) alert("You have reached the character limit for this Message!");
		reachedMaxChar = true;
	} else {
		// Else we are less than the limit, report the charCount
		returnText = charCount + "/" + maxChars + " Characters";
	}
	
	if (DEBUG) alert("charCountMessage: " + returnText);
		
	return returnText;
}

function setupCharCountMessage(message, maxChars) {
	if (DEBUG) alert("Enter setupCharCountMessage(message, maxChars)");
	var displayMessage = "";
	
	
	displayMessage = calcRemainCharsMessage(message, maxChars, false);
	
	// Get the displayContainer
	var charCountHtml = document.getElementById('characterCount');
	charCountHtml.innerHTML = displayMessage;
}

function setupASCIICodeMessage(message, field) {
	if (DEBUG) alert("Enter setupASCIICodeMessage(field)");
	
	// Set the inner html of the field
	var textField = document.getElementById(field);
	textField.innerHTML = displayMessage;
	
	var displayMessage = "";
	if (DEBUG) alert("message.length: " + message.length);
	// Build the Display Message
	if (message.length != 0) {
		if (DEBUG) alert("pre-code message: " + message);
		textField.innerHTML = "Last key in ASCII code: " + getLastCharASCIICode(message);
	} else {
		textField.innerHTML = "No characters present!";
	}
	
}