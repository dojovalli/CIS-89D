// JavaScript Document

// GLOBAL VARS
var bodyTag = document.getElementById("body");
var KEY_BACKGROUND_COLOR = "backgroundColor";
var KEY_TEXT_COLOR = "textColor";
var KEY_TEXT_SIZE = "textSize";


function updateSettings(){
	// Get Values
	var backgroundColor = getValue("backgroundColor"); //document.getElementById('backgroundColor').value;
	var textColor = getValue("textColor"); //document.getElementById('textColor').value;
	var textSize = getSelectedValue("textSize"); //document.getElementById('textSize').value;
	
	// Save Values
	localStorage.setItem(KEY_BACKGROUND_COLOR, backgroundColor);
	localStorage.setItem(KEY_TEXT_COLOR, textColor);
	localStorage.setItem(KEY_TEXT_SIZE, textSize);

	// Display Results
	refreshPageSetting();

}

function refreshPageSettings(){
	
	// Loop through the Local Storage
	document.body.style.backgroundColor = localStorage.getItem(KEY_BACKGROUND_COLOR);
	document.body.style.color = localStorage.getItem(KEY_TEXT_COLOR);
	document.body.style.fontSize = localStorage.getItem(KEY_TEXT_SIZE);
}

	function run() {
			console.log("Enter run()");
			
			bodyTag.style.backgroundColor = getValue("backgroundColor");
			bodyTag.style.color = getValue("textColor");
			bodyTag.style.fontSize = getSelectedValue("textSize");

			
			console.log("VALUES" + "\n"
						+ "bodyTag.style.backgroundColor:" + bodyTag.style.backgroundColor + "\n"
						+ "bodyTag.style.color:" + bodyTag.style.color + "\n"
						+ "bodyTag.style.fontSize:" + bodyTag.style.fontSize + "\n");
			console.log("Exit run()");
	}
	
	function getValue(element) {
		var elem = document.getElementById(element);
		return elem.value;
	}
	
	function getSelectedValue(element) {
		var answer = document.getElementById(element);
		return answer[answer.selectedIndex].value;
	}

	function initiate(){
		// Add the onClickListener
		var saveButton = document.getElementById('save');
		saveButton.addEventListener('click', updateSettings, false);
		
		// Refresh the styles based on the LocalStorage Settings
		refreshPageSettings();
	}

window.addEventListener('load', initiate, false);