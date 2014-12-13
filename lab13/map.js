// JavaScript Document

// DEBUGGING VARS
var DEBUG = true;
var DEBUG_NODES = true;
var DEBUG_ADD_MARKER = true;
var DEBUG_RANDOM_LOCATION = true;

// CONSTANTS
var RANDOM_UP_SIZE = 999999;

// GLOBAL VARIABLES
var lat = 37.09;
var lng = -95.71;
var mapBounds;
var markers = [];

// Location Class
function Location (latitude, longitude) {
	// Members
    this.latitude = latitude;
    this.longitude = longitude;
	
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
	this.asGoogleLatLng = function() {
		return new google.maps.LatLng(this.latitude,this.longitude);
	}
	
	
	// Convenience Methods
	function toRadians(degree) {
		return degree * ( Math.PI / 180 );	
	}
	this.randomLocation = function(northEastLatLng, southWestLatLng) {
		
		// Confine Range
		var minLat = southWestLatLng.lat();
		var maxLat = northEastLatLng.lat();
		var minLng = southWestLatLng.lng();
		var maxLng = northEastLatLng.lng();
		// The difference between the Min & Max is the acceptable range value
		var latRange = maxLat - minLat;
		var lngRange = maxLng - minLng;
		
		if (DEBUG && DEBUG_RANDOM_LOCATION) {
			console.log("Map Range" + "\n"
						+ "minLat: " + minLat + "\n"
						+ "maxLat: " + maxLat + "\n"
						+ "minLng: " + minLng + "\n"
						+ "maxLng: " + maxLng + "\n"
						+ "latRange: " + latRange + "\n"
						+ "lngRange: " + lngRange + "\n");
		}
		
		// Get a random number
		var r = Math.random() * RANDOM_UP_SIZE;
		var r2 = Math.random() * RANDOM_UP_SIZE;
		
		if (DEBUG && DEBUG_RANDOM_LOCATION) {
			console.log("Random Numbers" + "\n"
					+ "r: " + r + "\n"
					+ "r2: " + r2 + "\n");
		}
		
		// Get a random number between the Ranges
		var randLatValue = r % latRange;
		var randLngValue = r2 % lngRange;
		
		if (DEBUG && DEBUG_RANDOM_LOCATION) {
			console.log("Random Lat/Lng Values" + "\n"
						+ "randLatValue: " + randLatValue + "\n"
						+ "randLngValue: " + randLngValue + "\n");
		}
		
		// Add the values to the Minimums to places them within the map area
		this.latitude = minLat + randLatValue;
		this.longitude = minLng + randLngValue;
	}
	
}


function initiate(){
	if (window.navigator.geolocation) {
 		navigator.geolocation.getCurrentPosition(updateLocation, showerror);
	} else {
		alert('Your browser does not natively support geolocation.');
		// we use the default values
	}
}

function updateLocation(position){
	
	/*
	// Get the Location of the User
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	*/
	
	// Creating a reference to the mapDiv
    var mapDiv = document.getElementById('map');

    // Creating a latLng for the center of the map
    var mapCenter = new google.maps.LatLng(lat, lng);

    // Creating an object literal containing the properties
    // we want to pass to the map
    var options = {
      center: mapCenter,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  streetViewControl: true
    };
    // Creating the map
    var map = new google.maps.Map(mapDiv, options);
	
	google.maps.event.addListener(map, 'bounds_changed', function() {
		// Clear all previouse markers
		deleteMarkers();
		
		// Get the Bounds of the Current Map Area
		mapBounds = map.getBounds();
		
		// Add X random Markers to the map
		createRandomMarkers(50, map);
	});
	
	
	
	// Add a Marker using a Location Object
	var location = new Location(37.319762, -122.046439);
	addMarker(location, map);
	
}

function addMarker(location, map) {
	if (DEBUG && DEBUG_NODES) {
		console.log("Enter addMarker(location)");
	}
	if (DEBUG && DEBUG_ADD_MARKER) {
		console.log("Marker Location" + "\n"
				+ "latitude: " + location.getLat() + "\n"
				+ "longitude: " + location.getLong() + "\n");
	}
	
	var marker = new google.maps.Marker({
		position: location.asGoogleLatLng(),
		map: map
	});
}

function createRandomMarkers(numbRandomMarkers, map) {
	
	// Determine the area of the Map
	console.log(mapBounds);
	var northEastCorner = mapBounds.getNorthEast();
	var southWestCorner = mapBounds.getSouthWest();
	
	console.log("googleLatLngBounds Object" +"\n"
				+ mapBounds.toString());
	console.log("northEastCorner: " + northEastCorner + "\n"
				+ "southWestCorner: " + southWestCorner + "\n");
	
	for (i = 0; i < numbRandomMarkers; i++) {
		// Create a new Location
		var loc = new Location(0,0);
		
		// Change the Location to a random location within the Map area
		loc.randomLocation(northEastCorner, southWestCorner);
		
		// Add a the Marker for the given Location to the Map
		addMarker(loc,map);
	}
}

function showerror(error){
	alert('Error: '+error.code+' '+error.message);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


window.addEventListener('load', initiate, false);