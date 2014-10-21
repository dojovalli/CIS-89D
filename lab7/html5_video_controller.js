// JavaScript Document - HTML5 Video Controller

// DEBUG
var DEBUG = true;
var GAPS = false;
var NODES = false;
var VOL = false;
var BUF_VID = true;

// MEMBERS
var video;
var unmutedVolume;
var passedEventLoopOnce = false;
	
	// CONVENIENCE METHODS
	// Sets up the Javascript references to the HTML5 Video Controller
	function setupVideoController() {
		
		video = setupVideo();
		setupVideoControls();
		
		passedEventLoopOnce = true;
		
	};
	
	// Setup Video
	function setupVideo() {
		// Get Reference
		video = document.getElementsByTagName("video")[0];
		
		// Set Event Listeners
		video.addEventListener('timeupdate', updateTime, false);
		video.addEventListener('durationchange', initSeekbar, false);
		
		return video;
	}
	
	// Setup All Video Controls
	function setupVideoControls() {
		
		// Setup Controls Left to Right
		if (DEBUG && GAPS) alert("Got to Buffer Alert before setupPlayButton()!");
		setupPlayButton();
		if (DEBUG && GAPS) alert("Got to Buffer Alert before setupPauseButton()!");
		setupPauseButton();
		if (DEBUG && GAPS) alert("Got to Buffer Alert before setupTimelineSlider()!");
		setupTimelineSlider();
		if (DEBUG && GAPS) alert("Got to Buffer Alert before setupVolumeSlider()!");
		setupVolumeSlider();
		setupMuteButton();
		
	}
	
	// Setups up the Play Button
	function setupPlayButton() {
		// Get Reference
		var btn_play = document.getElementById("btn_play");
		
		// Add Event Listener
		btn_play.addEventListener('click', doPlay, false);
		
		return btn_play;
	}
	
	// Sets up the Pause Button
	function setupPauseButton() {
		// Get Reference
		var btn_pause = document.getElementById("btn_pause");	
		
		// Add Event Listener
		btn_pause.addEventListener('click', doPause, false);
		
		return btn_pause;
	}
	
	// Sets up the Scrubable Timeline Slider
	function setupTimelineSlider() {
		if (DEBUG && NODES) alert("Enter setupTimelineSlider()");
		// Get Reference
		var sld_seekbar = document.getElementById("sld_seekbar");
		
		
		// Determine if the Video is Streaming or a File
		if ( isStreamingVideo() ) {
			// There is no need for a Timeline, but a 'Streaming Video' message may help
			// TODO
		} else {
			// Setup the Slider's initial value to 0
			initSeekbar();
		}
		
		// Setup Event Listeners
		sld_seekbar.addEventListener('change', changeTime, false);
		
		if (DEBUG && NODES) alert("Exit setupTimelineSlider()");
		//return sld_seekbar;
	}
	
	// Sets up the Volume Slider
	function setupVolumeSlider() {
		if (DEBUG && NODES) alert("Enter setupVolumeSlider()");
		// Get Reference
		var sld_volume = document.getElementById('sld_volume');
		
		// Setup Event Listeners -- Using an Anonymous Function
		// Setup the volume button by first getting the current volume value, then set listener
		if (DEBUG && VOL) alert("video.volume: " + video.volume);
		sld_volume.value = video.volume;
		// Set the Volume Button Listener using an Anonymous Function
		sld_volume.addEventListener(	'change',
										function(e) {
												myVol= e.target.value;
												video.volume = myVol;
											if (myVol == 0) {
												video.muted = true;
											} else {
												video.muted = false;
											}
												return false;
											}, 
										true);
		return sld_volume;
	}
	
	
	// Sets up the Mute Button
	function setupMuteButton() {
		// Get Reference
		var btn_mute = document.getElementById("btn_mute");
		
		// Add Event Listener
		btn_mute.addEventListener('click', doMute, false);
	}
	
	
	// EVENT HANDLERS
	// Plays video from current point in timeline, if at the end the video will play from the beginning
	function doPlay(){
		if (video.paused){
			// Play from the current position
			video.play();
		} else if (video.ended) {
			// Video has reached the end, start from the beginning
			video.currentTime=0;
			video.play();
		};
	};
	
	// Pauses the video if the video is currently playing
	function doPause(){
		if (video.play){
			// Pause the vidoe if it is playing
			video.pause();
		};
	};
	
	// Sets the Volume to 0
	/* Currently, there is no storage of the volume level during call to mute */
	function doMute(){
		// If the volume is not muted, get the Current value of volume
		if (video.muted != true) {
			// Set the value of the unmutedVolume
			unmutedVolume = document.getElementById('sld_volume').value;
			
			// Mute the Volume
			document.getElementById('sld_volume').value = 0;
			video.muted = true;
		} else {
			// Reset the volume to its previous value
			document.getElementById('sld_volume').value = unmutedVolume;
			video.muted = false;
		};
		
	};
	
	// TIMELINE METHODS
	// Sets up the isStreamingVideo var
	function isStreamingVideo() {
		var isStreamingVideo;
		
		if (video.startTime == 0) {
			isStreamingVideo = false;
		} else {
			isStreamingVideo = true;
		}
		
		if ( ! passedEventLoopOnce ) {
			if (DEBUG && VOL) alert("video.startTime: " + video.startTime + "\n"
								+ "isStreamingVideo: " + isStreamingVideo);
		}
		
		return isStreamingVideo;
	};
	
	// Updates the Time Label
	function updateTime(){
		
		var sec= video.currentTime;
		var h = Math.floor(sec/3600);
		sec=sec%3600;
		var min =Math.floor(sec/60);
		sec = Math.floor(sec%60);
		if (sec.toString().length < 2) sec="0"+sec;
		if (min.toString().length < 2) min="0"+min;
		document.getElementById('time').innerHTML = h+":"+min+":"+sec;
		
		
		// Update the Values of the sld_seekbar
		if ( isStreamingVideo() ) {
			// Get the Buffered video
			var bufferedVideo = video.buffered;
			
			// Create loop to display all the TimeRanges in the bufferedVideo
			var alertString = "Buffered Video" + "\n";
			alertString += "length: " + bufferedVideo.length + "\n";
			// Add to string for each TimeRange
			for ( i = 0; i < bufferedVideo.length; i++ ) {
				alertString += "start: " + bufferedVideo.start(i) + "\n"
				alertString += "end: " + bufferedVideo.end(i) + "\n"
			}
			
			// Alert all bufferedVideo TimeRanges
			if (DEBUG && BUF_VID) alert( alertString );
			
			// Set the min and max duration/times
			sld_seekbar.min = bufferedVideo.start(0);
			sld_seekbar.max = bufferedVideo.end(0);
			sld_seekbar.value = video.currentTime;
		} else {
			// Set the min and max duration/times
			sld_seekbar.min = video.startTime;
			sld_seekbar.max = video.duration;
			sld_seekbar.value = video.currentTime;
		} 
		
	};
	
	// Initializes the Seek Bar
	function initSeekbar() {
		if (DEBUG && NODES) alert("Enter initSeekbar()");
		
		if ( isStreamingVideo() ) {
			// The video is streaming, hide the sld_seekbar and display 'Streaming Video...'
			if (DEBUG && BUF_VID) alert("isStreamingVideo() == true");
			
		} else {
			if (DEBUG && BUF_VID) alert("isStreamingVideo() == false");
			// The video is a file
			sld_seekbar.min = 0;
			sld_seekbar.max = video.duration;
			sld_seekbar.value = 0;		
		}
		
		if (DEBUG && NODES) alert("Exit initSeekbar()");
		return;	
	};
	
	// Updates the Cursor's position on the Seek Bar to match the current percentage
	function changeTime() {
		video.currentTime = sld_seekbar.value;
	};