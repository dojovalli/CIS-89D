// JavaScript Document

function initiate(){
	// Set up the sources
	source1=document.getElementById('image');
	source1.addEventListener('dragstart', dragged, false);
	setupDraggable('image',dragged, null, null);
	
	// Set up the Targets
	target=document.getElementById('targetbox');
	target.addEventListener('dragenter', function(e)
	{ e.preventDefault(); }, false);
	target.addEventListener('dragover', function(e)
	{ e.preventDefault(); }, false);
	target.addEventListener('target', targetped, false);
}
function dragged(e){
var code='<img src="'+source1.getAttribute('src')+'">';
e.dataTransfer.setData('Text', code);
}
function targetped(e){
e.preventDefault();
target.innerHTML=e.dataTransfer.getData('Text');
}

// Used to setup the Draggable Sources
function setupDraggable(	sourceId, 
						dragStartCallback, 
						dragCallback, 
						dragEndCallback) {
	// Get a reference to the source object
	var source = document.getElementById(sourceId);
	
	// If the callbacks are null, override the defaults
	if (dragStartCallback == null) {
		dragStartCallback = function(e) { e.preventDefault(); };
	}
	if (dragCallback == null) {
		dragCallback = function(e) { e.preventDefault(); };
	}
	if (dragEndCallback == null) {
		dragEndCallback = function(e) { e.preventDefault(); };
	}
	
	// Set up the object listeners
	source.addEventListener('dragstart', dragStartCallback, false);
	source.addEventListener('drag', dragCallback, false);
	source.addEventListener('dragstart', dragEndCallback, false);
}

// Used to setup the Droppable Targets
function setupDroppable(	targetId, 
						dragEnterCallback, 
						dragOverCallback, 
						dropCallback, 
						dragLeaveCallback) {
	// Get a reference to the source object
	var target = document.getElementById(targetId);
	
	// If the callbacks are null, override the defaults
	if (dragEnterCallback == null) {
		dragEnterCallback = function(e) { e.preventDefault(); };
	}
	if (dragOverCallback == null) {
		dragOverCallback = function(e) { e.preventDefault(); };
	}
	if (dropCallback == null) {
		dropCallback = function(e) { e.preventDefault(); };
	}
	if (dragLeaveCallback == null) {
		dragLeaveCallback = function(e) { e.preventDefault(); };
	}
	
	// Set up the object listeners
	target.addEventListener('dragenter', dragEnterCallback, false);
	target.addEventListener('dragover', dragOverCallback, false);
	target.addEventListener('drop', dropCallback, false);
	target.addEventListener('dragleave', dragLeaveCallback, false);
}

window.addEventListener('load', initiate, false);