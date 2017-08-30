if ($('body').hasClass('isHome') || $('body').hasClass('isLanding')) {
    function homepageVideo() {
        var video = document.querySelector('video');
        var fullScreenButton = document.getElementById('toggleFullScreen');
        var event = document.createEvent('HTMLEvents');
        var inFullScreen = false;

        fullScreenButton.addEventListener('click', function () {
            // Add controls and unmute when entering fullscreen
            video.controls = true;
            inFullScreen = true;
            video.autoplay = true;
            video.play();
            // If fullscreen API is supported...
            if (Modernizr.fullscreen) {
                // Enable full screen button (accounting for various vendor prefixes)
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }
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
                    inFullScreen = false;
                    video.pause();
                    video.currentTime = 0;
                    video.controls = false;
                    video.classList.add('heroVideo');
                }
            }, false);
        });

        // If fullscreen API is not supported, take off autoplay when the webkitendfullscreen event fires
        if (!Modernizr.fullscreen) {
            video.addEventListener('webkitendfullscreen', function () {
                video.autoplay = false;
            });
        }
    }
    homepageVideo();
}
