// JavaScript Document
// DEBUG
var DEBUG = true;
var DEBUG_DD = true;
var DEBUG_DMS = true;
var DEBUG_NODES = false;
var DEBUG_DISPLAY_RESULTS = false;
var DEBUG_CALC_DISTANCE = true;

// CONSTANTS
var GEO_SUPPORTED =  "Geolocation supported.";
var GEO_UNSUPPORTED = "Geolocation is not supported in your browser.";
var LOCATION_UPDATED = "Location successfully updated.";

// FLAGS
var ACTIVE = 0;
var ERROR = -1;


// GLOBAL VARIABLES
var PASSED_LOOP = false;

	// Tracks the positions
	var currentLocation = null;
	var previousLocation = null;
	
	// ODOMETER MEMBERS
	var totalDistanceTravelled;

// Coordinate Class
function Coordinate(value) {
	// Members
	this.coordinateValue = value;
	
	// Methods	
	this.format = function(formatType) {
		var formatCoord;
		// Determine the format
		switch (formatType) {
			case "dec":
			case "decimal":
			case "DEC":
			case "DECIMAL":
			case "DD":
			case "dd":
				formatCoord = this.coordinateValue;
				break;
			case "dms":
			case "DMS":
				formatCoord = formatAsDMS(this.coordinateValue);
				break;	
		}
		
		return formatCoord;
	}
	this.asDD = function() {
		if (DEBUG && DEBUG_DD) console.log("DD Format: "  + this.format("DD"));
		return this.format("DD");	
	}
	this.asDMS = function() {
		if (DEBUG && DEBUG_DD) console.log("DMS Format: "  + this.format("DMS"));
		return this.format("DMS");	
	}
}

function formatAsDMS(decimalCoordinate) {
	this.deg = Math.abs(parseInt(degree));
	this.min = (Math.abs(degree) - this.deg) * 60;
	this.sec = this.min;
	this.min = Math.abs(parseInt(this.min));
	this.sec = Math.round((this.sec - this.min) * 60 * 1000000) / 1000000;
	this.sign = (degree < 0) ? -1 : 1;
	this.dir = (lat_long == 'lat') ? ((this.sign > 0) ? 'N' : 'S') :
	((this.sign > 0) ? 'E' : 'W');
	this.toString = function(dir) {
	if (isNaN(dir))
	return (this.deg * this.sign) + "\u00b0 " + this.min + "' " +
	this.sec + '" ';
	else
	return this.deg + "\u00b0 " + this.min + "' " + this.sec + '" ' +
	this.dir;
	};
}

// Location Class
function Location (latitude, longitude) {
	// Members
    this.latitude = latitude;
    this.longitude = longitude;
	this.latAsRadian = 
	
	// Methods
    this.getLat = function() {
        return this.latitude;
    };
	this.getLong = function() {
		return this.longitude;
	}
	this.getLatAsRadian = function() {
		return toRadians(this.latitude);	
	}
	this.getLongAsRadian = function() {
		return toRadians(this.longitude);	
	}
	
}

function DistanceCalculator (location1, location2) {
	
	// CONSTANTS
	var EARTH_RADIUS_KM = 6371;
	
	// Members
	this.loc1 = location1;
	this.loc2 = location2;
	
	// Methods
	this.getLocation1 = function() {
		return this.loc1;
	}
	this.getLocation2 = function() {
		return this.loc2;
	}
	
	this.toRadians = function() {
		this.value * (Math.PI/180);	
	}
	
	this.calculateDistance = function() {
		if (DEBUG && DEBUG_NODES) console.log("Enter calculateDistance()");
		
		var lat1 = this.loc1.getLat();
		var lat2 = this.loc2.getLat();
		var lon1 = this.loc1.getLong();
		var lon2 = this.loc2.getLong();
		
		// ********************** PROGRAM BREAKS HERE @ LINE 130 ************************
		console.log("Local Vars - Lat/Long" + "\n"
				+ "lat1: " + lat1 + "\n"
				+ "lat2: " + lat2 + "\n"
				+ "lon1: " + lon1 + "\n"
				+ "lon2: " + lon2 + "\n");
		var lat1Radians = toRadians(lat1);
		var lat2Radians = toRadians(lat2);
		var deltaTheta = toRadians(lat2-lat1);
		var deltaLambda = toRadians(lon2-lon1);
		console.log("Local Vars - Deltas/Radians" + "\n"
				+ "lat1Radians: " + lat1Radians + "\n"
				+ "lat2Radians: " + lat2Radians + "\n"
				+ "deltaTheta: " + deltaTheta + "\n"
				+ "deltaLambda: " + deltaLambda + "\n");
		
		var a = Math.sin(deltaTheta/2) * Math.sin(deltaTheta/2) + Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		
		if (DEBUG && DEBUG_CALC_DISTANCE ) console.log("Calculate Distance Values" + "\n"
												+ "a: " + a + "\n"
												+ "c: " + c + "\n");
		
		var d = EARTH_RADIUS_KM * c;
		return d;
	}
		
}

function toRadians(degrees) {
		return degrees * (Math.PI / 180);	
	}


// Gets tag by id
function getTag(tagId) {
	return document.getElementById(tagId);	
}



// Handles updating the view with the new results
function displayResults(position) {
	if(DEBUG && DEBUG_NODES && PASSED_LOOP) console.log("Enter displayResults()");
	// Get the 'Value' tags
	var latField = getTag("latitudeValue");
	var longField = getTag("longitudeValue");
	var accuracyField = getTag("accuracyValue");
	var timeField = getTag("timeValue");
	var currentDistanceField = getTag("currentDistanceValue");
	var totalDistanceField = getTag("totalDistanceValue");
	
	/*
	if (DEBUG && DEBUG_DISPLAY_RESULTS) {
		// Only log on the first pass
		if (!PASSED_LOOP) {
			console.log("Before position.coords.latitude");
			console.log("Geo-Values" + "\n"
					+ "latitude: " + position.coords.latitude + "\n"
					+ "longitude: " + position.coords.longitude + "\n");
			console.log("GOT HERE");
		}
		PASSED_LOOP = true;
	}
	*/
	
	// Set the InnerHTML of the Fields
		// Get the Attributes from the Coors object
		//latField.innerHTML = coordinateFormat(position.coords.latitude, "dms");
		latField.innerHTML = position.coords.latitude;
		
		longField.innerHTML = position.coords.longitude;
		accuracyField.innerHTML = position.coords.accuracy + " meters";
		timeField.innerHTML = position.timestamp;
		
		// Get the Current Location Location Objects
		currentLocation = new Location(position.coords.latitude, position.coords.longitude);
		console.log("Location" + "\n"
				+ "latitude: " + currentLocation.getLat() + "\n"
				+ "longitude: " + currentLocation.getLong() + "\n");
				
		// If this is the first pass, set the previous location to current location
		if (previousLocation == null) {
			previousLocation = currentLocation;	
		}
		
		
		// Calculate the distance travelled between the currentPosition and the previousPosition
		var distanceCalc = new DistanceCalculator(previousLocation, currentLocation);
		console.log("Distance: " + distanceCalc.calculateDistance());
		console.log("Passed Code");
		
		// Calculate the Distances
		var currentDistance = distanceCalc.calculateDistance();
		totalDistanceTravelled = totalDistanceTravelled + currentDistance;
		
		// Display the results
		currentDistanceField.innerHTML = currentDistance;
		totalDistanceField.innerHTML = totalDistanceTravelled;
		
		// Have passed the loop once
		PASSED_LOOP = true;
		
		// Set the Message 
		setMessage(LOCATION_UPDATED, ACTIVE);
		
		// Finally, Set the current location to previous location
		previousLocation = currentLocation;
}

// Shows an error message
function showError(error){
	//
	console.log('Error: '+error.code+' '+error.message);
	var errorMessage = 'Error: '+error.code+' '+error.message;
	setMessage(errorMessage, ERROR);
}

// Displays Message in MessageContainer
function setMessage(message, messageType) {
	var messageContainer = getTag("messageContainer");
	messageContainer.innerHTML = message;
	
	switch (messageType) {
		case ERROR:
			messageContainer.setAttribute("class", "messageContainer error");
			break;
		case ACTIVE:
			messageContainer.setAttribute("class", "messageContainer success");
			break;
	}
}

/*
// Handles watching the user's current location over time and updating the view as necessary
function run() {
	// Get the user's current position
	currentPosition = watchPosition(displayResults, showError);
	
	// If this is the first pass, we must set the previous position
	if (!PASSED_LOOP) previousPosition = currentPosition;
	
	// Convert the Positions into a Location Objects
	var location1 = Location(currentPosition.getLat(), currentPosition.getLong());
	var location2 = Location(previousPosition.getLat(), previousPosition.getLong());
	
	// Calculate the distance between the Locations and add it the to total distance travelled
	var distanceCalc = DistanceCalculator(location1, location2);
	totalDistanceTravelled += distanceCalc.calculateDistance();
	
	// Display the results in the VIEW
	displayResults();
		
	// The app has ran at least 1 time
	PASSED_LOOP = true;
}
*/


// Gets a single instance of User's Location
function getlocation(){
	// showinfo is the successCallback function
	navigator.geolocation.getCurrentPosition(showinfo);
}


// Starts the Current 'Watch' loop for monitor a User's location
function monitorLocationAccess() {
	
	var control = null;
	var geoconfig={	enableHighAccuracy: true,
					maximumAge: 60000			};
	
	control=navigator.geolocation.watchPosition(displayResults, showError, geoconfig);	
}

// Handles running the app from the time the user loads the page
function init() {
	
	if ( navigator.geolocation ) {
		// Set up the initial value of totalDistanceTravelled
		totalDistanceTravelled = 0;
		
		// Set the location message
		setMessage(GEO_SUPPORTED, ACTIVE);
		
		// Request Users Current location
		monitorLocationAccess();
		
	} else {
		// Set the Location Message
		setMessage(GEO_UNSUPPORTED, ERROR);
	}
	
}
	
window.addEventListener("load", init, false);

