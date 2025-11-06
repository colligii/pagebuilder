import registerCustomScript, { registerCreateFunction } from "../script";
import { State } from "../script/state";
import { ClosedComponent } from "./closed-component";

const videoPlayed = new State(false);

registerCustomScript(() => {
    var video = document.getElementById('video');
    var videoSrc = '/public/m3u8/playlist.m3u8';
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
    }
})

registerCreateFunction(() => {
    const video = document.getElementById('video');

    if(!gstate[0]) {
        gstate[0] = true;
        video?.play();
    }
}, 'playVideo', [], [videoPlayed])

export default function playListComponent() {
    return new ClosedComponent({
        key: 'video',
        events: {
            'click': () => playVideo()
        },
        css: {
            'align-self': 'center',
            width: '75%',
            'margin-top': '30px'
        },
        properties: {
            controls: '',
            id: 'video'
        }
    })
}