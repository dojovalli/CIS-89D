// Keys
var KEY_DB_NAME = "LinkStoreDatabase";
var VERSION = 2;
// Global Variables
var linkList
var linkInfo
var db;
var passedCursorLoop;

// Sets up the View
function initiate(){
	
	// References to Displays
	linkList = document.getElementById('linkList');
	linkInfo = document.getElementById('linkInfo');
	
	// References to Buttons
	var addLinkButton = document.getElementById('addLink');
	var showLinksButton = document.getElementById('showLinks');
	addLinkButton.addEventListener('click', addObject);
	showLinksButton.addEventListener('click', show);
	
	var request = indexedDB.open("LinkDatabaseIndexedDB");
	request.addEventListener('error', showerror);
	request.addEventListener('success', start);
	request.addEventListener('upgradeneeded', createdb);
}

	// ERROR HANDLERS
	function showerror(e){
		console.log("There was an Error!");
		alert('Error: ' + e.code + ' ' + e.message);
	}
	
	// LIFE-CYCLE METHODS - indexedDB
	function start(e){
		console.log("Initiating Database...");
		db = e.target.result;
		//show();
	}
	
	
	function createdb(e){
		console.log("Creating new IndexedDb");
		// Get a Refence to the database
		var linkDatabase = e.target.result;
		// Request the LinkStore
		var LinkStore = linkDatabase.createObjectStore('linkTable', {keyPath: 'id'});
		
		// Create Columns/Fields
		LinkStore.createIndex('LinkIndex', 'siteName', {unique: false});
		LinkStore.createIndex('UrlIndex', 'siteUrl', {unique: false});
		LinkStore.createIndex('DescIndex', 'siteDescription', {unique: false});
		LinkStore.createIndex('NoteIndex', 'siteNotes', {unique: false});
	}
	
function addObject(){
	console.log("Adding LinkIndex to IndexedDB");
	// Get values for the Form
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	var siteDesc = document.getElementById('siteDescription').value;
	var persDesc = document.getElementById('siteNotes').value;
	
	// Create a TRANSACTION to INSERT NEW LINK
	var addLinkTransaction = db.transaction(['linkTable'], "readwrite");
	var LinkStore = addLinkTransaction.objectStore('linkTable');
	
	/*********************************************************/
	// Set a Callback Method when the Transaction Completes
	addLinkTransaction.addEventListener('complete', doNothing); 
	/*********************************************************/
	
	// INSERT NEW LINK
	// Add link with a JSON Literal
	var request = LinkStore.add({	id: siteName, 
									siteName: siteName, 
									siteUrl: siteUrl, 
									siteDescription: siteDesc, 
									siteNotes: persDesc	});
									
	// Reset the Form Fields to Empty Strings
	document.getElementById('siteName').value = '';
	document.getElementById('siteUrl').value = '';
	document.getElementById('siteDescription').value = '';
	document.getElementById('siteNotes').innerHTML = '';
}

function doNothing() {}

function show(){
	passedCursorLoop = false;
	console.log("Showing linkTable...");
	linkList.innerHTML = "&lt;&lt; No Links &gt;&gt;";
	// Create a TRANSACTION to READ LINKS in LinkStore
	var getLinksTransaction = db.transaction(['linkTable']); //db.transaction(['linkTable'], "readwrite");
	var store = getLinksTransaction.objectStore('linkTable');
	
	// Create a CURSOR using the PRIMARY KEY
	var myindex = store.index('LinkIndex');
	var newcursor = myindex.openCursor(null, "prev");
	newcursor.addEventListener('success', showList); 
}

/* Receives & Processes CURSOR Object
 * Note: This method is used as a 'Callback' within Cursor Loop
 * each iteration is a new record in the store! This method handles
 * a single pass (alternatively, the processing of a single StoreItem).
 *
 * The 'continue()' method increments the cursor to the next Record/StoreItem
 */
function showList(e){
	console.log("Reading LinkIndex from IndexedDB...");
	var cursor = e.target.result;
	if(cursor) {
		console.log("Cursor has value");
		// Clear/Reset the LinkIndex List
		if (!passedCursorLoop) linkList.innerHTML = '<em class="italic">Links you\'ve added so far:</em>';
		
		// Open new Div
		linkList.innerHTML += '<div>';
		linkList.innerHTML += '<a href="' + cursor.value.siteUrl + '">' + cursor.value.siteName + '</a>';
		linkList.innerHTML += ' ( ';
		//linkList.innerHTML += cursor.value.siteUrl + ' - ';
		//linkList.innerHTML += cursor.value.siteDescription;
		
		// Create Details LinkIndex/Button
		linkList.innerHTML += '<a href="#" onclick="displayDetails(\'' + cursor.value.id + '\')">Details</a>';

		// Add Buffer
		linkList.innerHTML += " ";
				
		// Create Remove LinkIndex/Button
		//linkList.innerHTML += ' <input type="button" ';
		linkList.innerHTML += '<a href="#" onclick="removeObject(\'' + cursor.value.id + '\')">Delete</a>';
		
		// Close the Div
		linkList.innerHTML += ')';
		linkList.innerHTML += '</div>';
		
		// Iterate to next Record/StoreItem
		cursor.continue();
	} else {
			console.log("Cursor Returned Null");
			linkList.innerHTLM = "&lt;&lt; No Links &gt;&gt;";
	}
	passedCursorLoop = true;
	console.log("Exiting showList(e)");
}

function displayDetails(id){
		console.log("Retreiving LinkIndex Details from IndexedDB...");
		// Reset Field
		linkInfo.innerHTML = '';
		
		// Run Transaction
		var addLinkTransaction = db.transaction(['linkTable'], "readwrite");
		var LinkStore = addLinkTransaction.objectStore('linkTable');
		var request = LinkStore.get(id);
		
		request.onerror = function(event) {
			alert("Couldn't find the record!");
		};
		request.onsuccess = function(event) {
			// Display the Info
			linkInfo.innerHTML += '<label class="resultLabel">' + request.result.siteName + '</label><br>';
			linkInfo.innerHTML += '<label class="resultLabel">Url: </label>';
			linkInfo.innerHTML += request.result.siteUrl + '<br>';
			linkInfo.innerHTML += '<label class="resultLabel">Description: </label>';
			linkInfo.innerHTML += request.result.siteDescription + '<br>';
			linkInfo.innerHTML += '<label class="resultLabel">Notes: </label>';
			linkInfo.innerHTML += request.result.siteNotes + '<br>';
		};
		
		
}
function removeObject(id){
	if(confirm('Are you sure?')){
		var deleteTransaction = db.transaction(['linkTable'], "readwrite");
		var LinkStore = deleteTransaction.objectStore('linkTable');
		deleteTransaction.addEventListener('complete', show);
		var request = LinkStore.delete(id);
	}
}

addEventListener('load', initiate);