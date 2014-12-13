// JavaScript Document

// DEBUG
var DEBUG = true;
var DEBUG_FLOW = true;
var DEBUG_NODE_FAMILY = false;
var DEBUG_NODE_FAMILY_INNER = false;


// define global variables
var dragTarget; // the list item being dragged
var dropTarget;
var originalLocation;
var newLocation;
var swapItem;
var dragItem;

function initiate() {
	alert("script started");
	//var li = document.getElementsByTagName("li");
	var dragItems = document.getElementsByClassName("quadrantContent");
	// loop through list and make items draggable and
	// set the event handler functions
	for ( var i = 0; i < dragItems.length; i++ ) {
		dragItems[i].draggable = true;
		dragItems[i].ondragover = dragOverHandler;
		dragItems[i].ondragstart = dragStartHandler;
		dragItems[i].ondragend = dragEndHandler;
	}
}

function dragStartHandler(e) {
	dragTarget = e.target;
	e.dataTransfer.setData('text/plain' , null);
	dragTarget.style.opacity = "0.5";
	dragTarget.style.backgroundColor = "red";
	
	// Reset Vars
	dragItem = e.target.parentNode.innerHTML;
	swapItem = null;
	orginalLocation = null;
	newLocation = null;
	dropTarget = null;
}

function dragOverHandler(e) {
	
	
	// make sure the item being dragged isn't the same
	// as the one we're dragTarget over
	// and make sure it has not been removed from the page
	if (dragTarget != e.target && dragTarget.parentNode != null) {
		
		// Save a Reference to the Original Location of the Dragged Item
		originalLocation = dragTarget.parentNode;
		newLocation = e.target.parentNode;
		
	}
		
	// prevent the default behavior
	if (!e.preventDefault) e.preventDefault();
	return false;
}

function logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation) {
	console.log("VALUES" + "\n"
				+ "dragTarget: " + dragTarget + "\n"
				+ "dropTarget: " + dropTarget + "\n"
				+ "swapItem: " + swapItem + "\n"
				+ "originalLocation: " + originalLocation + "\n"
				+ "newLocation: " + newLocation + "\n");
}
function logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation) {
	console.log("VALUES" + "\n");
				if (dragTarget != null) console.log("dragTarget: " + dragTarget.innerHTML + "\n");
				else console.log("dragTarget: " + "null" + "\n");
				if (dropTarget != null) console.log("dropTarget: " + dropTarget.innerHTML + "\n");
				else console.log("dropTarget: " + "null" + "\n");
				if (swapItem != null)  console.log("swapItem: " + swapItem.innerHTML + "\n");
				else console.log("swapItem: " + "null" + "\n");
				if (dragTarget != null) console.log("originalLocation: " + originalLocation.innerHTML + "\n");
				else console.log("originalLocation: " + "null" + "\n");
				if (newLocation != null)  console.log("newLocation: " + newLocation.innerHTML + "\n");
				else console.log("newLocation: " + "null" + "\n");
}

function dragEndHandler(e) {
	
		//dropTarget = 
		//alert("newLocation.length: " + newLocation.firstChild.nodeValue);
		// Get the contents of the div inside the target
		//swapItem = newLocation.firstChild;
		if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		console.log("NEW LOCATION - CHILDEN" + "\n"
					+ "hasChildNodes: " + newLocation.hasChildNodes + "\n"
					+ "count: " + newLocation.childNodes.length + "\n"
					+ "firstChild:" + newLocation.firstChild + "\n"
					+ "lastChild:" + newLocation.lastChild + "\n"
					+ "nextSibling:" + newLocation.nextSibling + "\n"
					+ "previousSibling:" + newLocation.previousSibling + "\n"
					+ "NEW LOCATION - CHILDEN' CHILDREN" + "\n"
					+ "firstChild:" + newLocation.firstChild.firstChild + "\n"
					+ "lastChild:" + newLocation.lastChild.lastChild + "\n"
					);
					
					
		//swapItem = newLocation.firstChild;
		swapItem = newLocation.innerHTML;

		
		if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_FLOW) console.log("originalLocation.removeChild(dragTarget)");
		
		// remove the item being dragged from it's original location
		originalLocation.removeChild(dragTarget);
		
		if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_FLOW) console.log("originalLocation.appendChild(swapItem);");
		
		// Add the target's child to the originalLocation
		//originalLocation.appendChild(newLocation.firstChild);
		//originalLocation.appendChild(swapItem);
		originalLocation.innerHTML = swapItem;
		
		
		if(DEBUG && DEBUG_FLOW) {
			console.log("originalLocation.innerHTML after swap: " + "\n"
									+ originalLocation.innerHTML + "\n");
		}
	
				
		
		if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_FLOW) console.log("newLocation.removeChild(swapItem);");
		
		// Remove the previous item from the new Location
		//newLocation.removeChild(swapItem);
		//newLocation.removeChild(newLocation.firstChild);
		newLocation.innerHTML = swapItem;
		
		if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
		if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);

		if (DEBUG && DEBUG_FLOW) console.log("newLocation.appendChild(dragTarget, e.target);");
		
		// Add the item to the new Location
		//newLocation.appendChild(orginalLocation);
		newLocation.innerHTML = dragItem;
	
	if (DEBUG && DEBUG_NODE_FAMILY) logValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
	if (DEBUG && DEBUG_NODE_FAMILY_INNER) logInnerValues(dragTarget, dropTarget, swapItem, originalLocation, newLocation);
	
	// Reset Styles
	dragTarget.style.opacity = "1.0";
	dragTarget.style.backgroundColor = "lightGray";
	

	var quads = document.getElementsByClassName("quadrantContent");
	for (i = 0; i < quads.length; i++) {
		quads[i].style.opacity = "1.0";
		quads[i].style.backgroundColor = "lightGray";
	}
	var emptyQuad = document.getElementById("contentEmpty");
	emptyQuad.style.backgroundColor = "white";


}
window.addEventListener('load', initiate, false);