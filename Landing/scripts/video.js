if ($('body').hasClass('isHome') || $('body').hasClass('isLanding')) {
    function homepageVideo() {
        var video = document.querySelector('video');
        var fullScreenButton = document.getElementById('toggleFullScreen');
        var event = document.createEvent('HTMLEvents');
        var inFullScreen = false;
        // Modernizr will return the prefixed function call, or false if none exists. Firefox uses the 'FullScreen' capitalization.
        var requestFullscreen = Modernizr.prefixed('requestFullscreen', video) || Modernizr.prefixed('requestFullScreen', video) || Modernizr.prefixed('EnterFullscreen', video);
        var exitFullscreen = Modernizr.prefixed('exitFullscreen', video) || Modernizr.prefixed('exitFullScreen', video);

        // Hides the video and resets various properties
        var hideVideo = function() {
            inFullScreen = false;
            video.pause();
            video.currentTime = 0;
            video.controls = false;
            video.classList.add('heroVideo');
        };

        fullScreenButton.addEventListener('click', function () {
            // Add controls and unmute when entering fullscreen
            video.controls = true;
            inFullScreen = true;
            video.autoplay = true;
            video.play();
            // If fullscreen API is supported...
            if (requestFullscreen) requestFullscreen();
            //remove class hiding video when in fullscreen
            video.classList.remove('heroVideo');
        }, false);

        // Account for various vendor prefixes when utilizing the fullscreen API
        ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (event) {
            document.addEventListener(event, function () {
                // Needed separate variable to detect IE 11 fullscreen
                var msFullscreen = document.msFullscreenElement ? document.msFullscreenElement !== null : undefined;
                var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || msFullscreen;

                // Stop video
                //Add class back that hides video when not in fullscreen
                if (!isFullScreen) {
                    hideVideo();
                }
            }, false);
        });

        // Hide the video once it has completed playing
        video.addEventListener('ended', function() {
            // Turn off full screen if we previously activated it
            if (exitFullscreen) {
                exitFullscreen();
                hideVideo();
            }
        });

        // If fullscreen API is not supported, take off autoplay when the webkitendfullscreen event fires
        if (!Modernizr.fullscreen) {
            video.addEventListener('webkitendfullscreen', function () {
                video.autoplay = false;
                hideVideo();
            });
        }
    }
    homepageVideo();
}
