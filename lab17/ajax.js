// JavaScipt demonstrating AJAX

	function initiate() {
			console.log("Enter initiate()");
			// Get reference to 'Ask the Server' button
			var processAjaxButton = document.getElementById("processAjax");
			// Add Event Listener to trigger running the Ajax
			processAjaxButton.addEventListener("click", processAjax, false);
			console.log("Exit initiate()");
		}
		
	function processAjax() {
		console.log("Enter processAjax()");
		// Get the info from the form
		var number_A = getValue("num_A");
		var number_B = getValue("num_B");
		
		console.log("VALUES" + "\n"
					+ "number_A: " + number_A + "\n"
					+ "number_B: " + number_B + "\n");
		
		// Package the info into a FormData Object
		var data = new FormData();
		data.append('num_A',number_A);
		data.append('num_B',number_B);	
		
		// Pass the FormData Object to the Server using XMLHttpRequest Object
			// Define the URL
			var url="add.php";
			// Create a XMLHttpRequest Object
			var request=new XMLHttpRequest();
			// Setup an EventListenter to respond the 'load' event
			// (AKA handle what needs to happen with the response is completed)
			request.addEventListener('load',show,false);
			// Initialize the actual request to the server (connect to the server)
			request.open("POST", url, true);
			// Send the Data over to the Server 
			request.send(data);
			
		console.log("Exit processAjax()");
	}
	
	function show(e) {
		console.log("Enter show(e)");
		// Handle the response from the Server
			// Get the answer div
			var answerDiv = document.getElementById("answer");
			// Set its contents to the Response
			answerDiv.innerHTML = e.target.responseText;
		// Change the CSS style - visibility - from hidden to visible
		answerDiv.parentNode.style.visibility = "visible";
		console.log("Exit show(e)");
	}
	
	function getValue(field) {
		console.log("Enter getValue(field)");
		
		// Get the Value of the Element
		var value = document.getElementById(field).value;
		
		console.log("value: " + value);
		console.log("Exit getValue(field)");
		return value;	
	}
	
	window.addEventListener("load", initiate, false);