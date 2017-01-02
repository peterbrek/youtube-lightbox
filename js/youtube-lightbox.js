// load Youtube API code asynchronously
var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";

// put Youtube API before the first script tag
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// boolean check for iOS devices
var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null

var youTubeLightBox = document.getElementById('youTubeLightBox')
var player // variable to hold new YT.Player() instance

// Hide lightbox when clicked on

youTubeLightBox.addEventListener('click', function() {
    this.style.display = 'none'
    player.stopVideo()
}, false)

// Exclude youtube iframe from above action
youTubeLightBox.querySelector('.centeredChild').addEventListener('click', function(e) {
    e.stopPropagation()
}, false)

// define onYouTubeIframeAPIReady() function and initialize lightbox when API is ready
function onYouTubeIframeAPIReady() {
    createLightBox()
}

// Extracts the Youtube video ID from a well formed Youtube URL
function getYouTubeId(link) {
    // Assumed Youtube URL formats
    // https://www.youtube.com/watch?v=Pe0jFDPHkzo
    // https://youtu.be/Pe0jFDPHkzo
    // https://www.youtube.com/v/Pe0jFDPHkzo
    // and more

    //See http://stackoverflow.com/a/6904504/4360074
    var youTubeIdReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    return youTubeIdReg.exec(link)[1] // return Youtube video ID portion of link
}

// Creates a new YT.Player() instance
function createYouTubePlayer(videourl) {
    player = new YT.Player('player', {
        videoId: videourl,
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            autoplay: 1
        }
    })
}

function onPlayerStateChange(event) {
    console.log(event.data);

    if (event.data == 0) {
        console.log('end!');

        var delay = 3000;

        setTimeout(function() {
            youTubeLightBox.style.display = 'none';
            player.stopVideo();
        }, delay);


    }
}

// Main Youtube lightbox function
function createLightBox() {
    var targetlinks = document.querySelectorAll('.lightbox')
    for (var i = 0; i < targetlinks.length; i++) {
        var link = targetlinks[i]
        link._videoid = getYouTubeId(link) // store youtube video ID portion of link inside _videoid property
        targetlinks[i].addEventListener('click', function(e) {
            youTubeLightBox.style.display = 'block'
            if (typeof player == 'undefined') { // if video player hasn't been created yet
                createYouTubePlayer(this._videoid)
            } else {
                if (isiOS) { // iOS devices can only use the "cue" related methods
                    player.cueVideoById(this._videoid)
                } else {
                    player.loadVideoById(this._videoid)
                }
            }
            e.preventDefault()
        }, false)
    }
}
