function initYouTube() {
    // 1. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

// height: '338',
// width: '600',
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {

        videoId: 'XSGBVzeBUbk',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 4. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for 16 seconds and then stop.
// var done = false;

function onPlayerStateChange(event) {
    // var c = document.getElementById('console');
    //
    // var newcontent = document.createElement('p');
    // newcontent.innerHTML = event.data;
    // c.appendChild(newcontent);

    // if (event.data == YT.PlayerState.PLAYING && !done) {
    // 	setTimeout(stopVideo, 16000);
    // 	done = true;
    // }

    if (event.data == 0) {
        console.log('end!');

    }

}

function stopVideo() {
    player.stopVideo();
}

$(document).ready(function() {
    initYouTube();

    // $('#loadSharethrough').click(function() {
    //     var sfp_js = document.createElement('script');
    //     sfp_js.src = "//native.sharethrough.com/assets/sfp.js";
    //     sfp_js.type = 'text/javascript';
    //     sfp_js.charset = 'utf-8';
    //     $('.container').append(sfp_js);
    //     $(this).hide();
    // })
})
