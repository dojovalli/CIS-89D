// JavaScript Document

<script type="text/javascript">
		// DEBUG
		var DEBUG = true;
		var DEBUG_NODES = true;
		var DEBUG_ALERT_TRANSACTIONS = true;
		var DEBUG_LOG_TRANSACTIONS = true;
	
		// CONSTANT KEYS
		
			// DB KEY
			var VERSION = 1;
			var KEY_LINK_STORE = "LinkStore";
			
			// TABLE KEY
			var KEY_LINKS = "links";
			
			// FEILD KEYS
			var KEY_ID = "id";
			var KEY_NAME = "siteName";
			var KEY_URL = "siteUrl";
			var KEY_DESC = "siteDescription";
			var KEY_PERS_DESC = "personalDescription";
		
		
		// GLOBAL VARIABLES
		var LinkStore;
		
		// LIFE-CYCLE METHODS
		function initiate() {
			
			if (!window.indexedDB) {
				window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
			}
			
			// Setup the indexDB
			setupIndexDB();
			
			// Setup onClickListeners
			setupOnClickListeners();
			
		}
		
		function setupIndexDB() {
			if (DEBUG && DEBUG_NODES) console.log("Enter setupIndexDB()");
			
			// Request Connection to indexDB
			var request = indexedDB.open("LinkStore");
			
			// Update DB
			indexedDB.createDB = function (e) {
				if (DEBUG && DEBUG_NODES) console.log("Enter createDB(e)");
				// Create an ObjectStore for Links with an ID Column/Field
				LinkStore = indexedDB.createObjectStore("links", { keyPath: "id" });
				
  				
				// Add the Properties of Links as Columns/Fields
				LinkStore.createIndex(KEY_NAME, KEY_NAME, {unique: false});
				LinkStore.createIndex(KEY_URL, KEY_URL, {unique: false});
				LinkStore.createIndex(KEY_DESC, KEY_DESC, {unique: false});
				LinkStore.createIndex(KEY_PERS_DESC, KEY_PERS_DESC, {unique: false});
				
				if (DEBUG && DEBUG_NODES) console.log("Exit createDB(e)");
			}
			
			// Start DB
			indexedDB.start = function(e){
				if (DEBUG && DEBUG_NODES) console.log("Enter start(e)");
				
				// Set the LinkStore to the target.result reference
				LinkStore = null;
				LinkStore = e.target.result;
				
				
				if (LinkStore != null) console.log("Connected to IndexedDB!");
				else console.log("Failed to setup IndexedDB!");
				if (DEBUG && DEBUG_NODES) console.log("Exit start(e)");
			}
			
			// ERROR HANDLING
			indexedDB.showError = function(e){
				alert('Error: ' + e.code + ' ' + e.message + "\n"
				+ "Database error: " + e.target.errorCode);
			}

			
			request.addEventListener('error', indexedDB.showError);
			request.addEventListener('success', indexedDB.start);
			request.addEventListener('upgradeneeded', indexedDB.createDB);
			
			
			// TRANSACTION EVENTS
			indexedDB.show = function(keyword) {
				if (DEBUG && DEBUG_NODES) console.log("Enter show(keyword)");
				var getTransaction = LinkStore.transaction([KEY_LINKS]);
				LinkStore = getTransaction.objectStore(KEY_LINKS);
				
				var request = LinkStore.get(keyword);
				request.addEventListener('success', showList);
				if (DEBUG && DEBUG_NODES) console.log("Exit show(keyword)");
			}
			
			indexedDB.showList = function(e){
				if (DEBUG && DEBUG_NODES) console.log("Enter showList(e)");
				// Retrieve the Result Set
				var result = e.target.result;
				
				if (result != null) {
					// LOGGING
					if (DEBUG && DEBUG_ALERT_TRANSACTIONS) {
						alert("LINK" + "\n"
							+ "id: " + result.id + "\n"
							+ "siteName: " + result.siteName + "\n"
							+ "siteUrl: " + result.siteUrl + "\n"
							+ "siteDescription: " + result.siteDescription + "\n"
							+ "personalDescription: " + result.personalDescription + "\n");
					}
					if (DEBUG && DEBUG_LOG_TRANSACTIONS) {
						console.log("LINK" + "\n"
									+ "id: " + result.id + "\n"
									+ "siteName: " + result.siteName + "\n"
									+ "siteUrl: " + result.siteUrl + "\n"
									+ "siteDescription: " + result.siteDescription + "\n"
									+ "personalDescription: " + result.personalDescription + "\n");
					}
				} else {
					alert("No Records were found!");
				}
				
				if (DEBUG && DEBUG_NODES) console.log("Exit showList(e)");
			}
			
			indexedDB.show = function(){
				if (DEBUG && DEBUG_NODES) console.log("Enter show(e)");
				
				linkList.innerHTML = '';
				var getAllLinks = LinkStore.transaction([KEY_LINKS]);
				LinkStore = getAllLinks.objectStore(KEY_LINKS);
				
				var allLinksCursor = LinkStore.openCursor();
				
				allLinksCursor.addEventListener('success', showlist);
				
				if (DEBUG && DEBUG_NODES) console.log("Exit show()");
			}
			
			
			
			if (LinkStore != null) console.log("Setup Complete!");
			if (DEBUG && DEBUG_NODES) console.log("Exit setupIndexDB()");
		}
		
		// INDEX DB METHODS
			// LIFE-CYCLE METHODS - IndexDB
			
		
			
			
			
			
						
		
		// ON-CLICK LISTNERS
		function setupOnClickListeners() {
			// Get References to buttons
			var addLinkButton = document.getElementById("addLink");
			var showLinkButton = document.getElementById("showLinks");
			
			// Add Listeners
			addLinkButton.addEventListener('click', addLink, false);
			showLinkButton.addEventListener('click', showLinks, false);	
		}
		
		function addLink() {
			// Get the Values of the input fields
			var siteName = getValue("siteName");
			var siteUrl = getValue("siteUrl");
			var siteDescription = getValue("siteDescription");
			var personalDescription = getValue("personalDescription");
			
			// Setup the transaction
			var addLinkTransaction = LinkStore.transaction([KEY_LINKS], "readwrite");
			LinkStore = addLinkTransaction.objectStore(KEY_LINKS);
			addLinkTransaction.addEventListener('complete', function(){ show(keyword) });
			
			// Create a new 'Link' record in indexDB
			LinkStore.add(	{	KEY_NAME : siteName,
								KEY_URL : siteUrl,
								KEY_DESC : siteDescription,
								KEY_PERS_DESC : personalDescription } );
		}
		
		function showLinks() {
			// Get all the links stored in indexDB in the LinkStore
			
			// For each link, display the link
			
		}
		
		// CONVENIENCE METHODS
		function getLink(linkId) {
			// Get the link from the LinkStore with the provided Identifier
				
		}
		
		function getValue(element) {
			var elem = document.getElementById(element);
			return elem.value;
		}
		
		
		
		window.addEventListener('load', initiate, false);
	</script>