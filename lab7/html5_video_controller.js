// JavaScript Document - HTML5 Video Controller

// MEMBERS
var video;
var unmutedVolume;
var passedEventLoopOnce = false;
	
	// CONVENIENCE METHODS
	// Sets up the Javascript references to the HTML5 Video Controller
	function setupVideoController() {
		// Set the Video Variable by selecting the first Video tag on the page
		video = document.getElementsByTagName("video")[0];
		
		// Get References to the Video Controller Buttons
		var btn_play = document.getElementById("btn_play");
		var btn_pause = document.getElementById("btn_pause");
		var btn_mute = document.getElementById("btn_mute");
		var sld_volume = document.getElementById('volume');
		
		// Setup the Timeline
		
		// Add Event Listener to monitor the Timeline
		video.addEventListener('timeupdate', updateTime, false);
		video.addEventListener('durationchange', initsld_seekbar, false);
		sld_seekbar.addEventListener('change', changeTime, false);
		
		// Add Event Listeners to the buttons
		btn_play.addEventListener('click', doPlay, false);
		btn_pause.addEventListener('click', doPause, false);
		btn_mute.addEventListener('click', doMute, false);
		
		// Setup the volume button by first getting the current volume value, then set listener
		sld_volume.value = video.volume;
		// Set the Volume Button Listener using an Anonymous Function
		sld_volume.addEventListener(	'change',
										function(e) {
											myVol= e.target.value;
											video.volume=myVol;
											if (myVol==0) {
												video.muted = true;
											} else {
												video.muted = false;
											}
												return false;
											}, 
										true);
	};
	
	// Setup Video
	function setupVideo() {
		// Get Reference
		video = document.getElementsByTagName("video")[0];
		
		// Set Event Listeners
		video.addEventListener('timeupdate', updateTime, false);
		video.addEventListener('durationchange', initsld_seekbar, false);
		
		return video;
	}
	
	// Setup All Video Controls
	function setupVideoControls() {
		
		// Setup Controls Left to Right
		setupPlayButton();
		setupPauseButton();
		setupTimelineSlider();
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
		
		// Get Reference
		var sld_seekbar = document.getElementById("btn_mute");
		
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
		
		return sld_seekbar;
	}
	
	// Sets up the Volume Slider
	function setupVolumeSlider() {
		// Get Reference
		var sld_volume = document.getElementById('volume');
		
		// Setup Event Listeners -- Using an Anonymous Function
		// Setup the volume button by first getting the current volume value, then set listener
		sld_volume.value = video.volume;
		// Set the Volume Button Listener using an Anonymous Function
		sld_volume.addEventListener(	'change',
										function(e) {
											myVol= e.target.value;
											video.volume=myVol;
											if (myVol==0) {
												video.muted = true;
											} else {
												video.muted = false;
											}
												return false;
											}, 
										true);
	}
	
	
	// Sets up the Mute Button
	function setupMuteButton() {
		// Get Reference
		var btn_mute = document.getElementById("btn_mute");
		
		// Add Event Listener
		btn_mute.addEventListener('click', doMute, false);
		
		return btn_mute;
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
			unmutedVolume = document.getElementById('volume').value
			
			// Mute the Volume
			document.getElementById('volume').value = 0;
			video.muted = true;
		} else {
			// Reset the volume to its previous value
			document.getElementById('volume').value = unmutedVolume;
			video.muted = false;
		};
		
	};
	
	// TIMELINE METHODS
	// Sets up the isStreamingVideo var
	function isStreamingVideo() {
		
		if (video.startTime == 0) {
			isStreamingVideo = false;
		} else {
			isStreamingVideo = true;
		}
		
		if ( ! passedEventLoopOnce ) {
			alert("video.startTime: " + video.startTime + "\n"
					+ "isStreamingVideo: " + isStreamingVideo);
		}
		passedEventLoopOnce = true;
		
		return isStreamingVideo;
	}
	
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
		if ( ! isStreamingVideo ) {
			// Set the min and max duration/times
			sld_seekbar.min = video.startTime;
			sld_seekbar.max = video.duration;
			sld_seekbar.value = video.currentTime;
		}
		
	};
	
	// Initializes the Seek Bar
	function initSeekbar() {
		
		if ( isStreamingVideo() ) {
			// The video is streaming, hide the sld_seekbar and display 'Streaming Video...'
			
		} else {
			// The video is a file
			sld_seekbar.min = 0;
			sld_seekbar.max = video.duration;
			sld_seekbar.value = 0;		
		}
			
	};
	
	// Updates the Cursor's position on the Seek Bar to match the current percentage
	function changeTime() {
		video.currentTime = sld_seekbar.value;
	}