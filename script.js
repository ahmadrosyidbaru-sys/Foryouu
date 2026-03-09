// Guest Name Logic
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('nama-penerima').innerText = urlParams.get('to') || 'Tamu Undangan';

// YouTube Player Setup
let player;
const VIDEO_ID = '_ooM-zhA580'; // Maher Zain - For The Rest of My Life

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: VIDEO_ID,
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0, 'mute': 1 },
        events: { 'onReady': (e) => console.log("Music Engine Ready") }
    });
}

function bukaUndangan() {
    // 1. Reveal Main Content
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('music-container').style.display = 'block';
    
    // 2. Play Music with Fade In
    if (player) {
        player.unMute();
        player.setVolume(70);
        player.playVideo();
    }

    // 3. Smooth Transition
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });

    // 4. Initial Reveal
    window.addEventListener('scroll', revealElements);
    setTimeout(revealElements, 500);
}

// Reveal Animation (Intersection Observer alternative)
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

// Music Control Toggle
let isPlaying = true;
document.getElementById('music-btn').onclick = function() {
    if (isPlaying) {
        player.pauseVideo();
        this.classList.remove('rotate');
    } else {
        player.playVideo();
        this.classList.add('rotate');
    }
    isPlaying = !isPlaying;
};

// Copy Text Helper
function copyText(text, btn) {
    navigator.clipboard.writeText(text);
    const original = btn.innerText;
    btn.innerText = "TERSALIN!";
    btn.style.borderColor = "#fff";
    btn.style.color = "#fff";
    setTimeout(() => {
        btn.innerText = original;
        btn.style.borderColor = "var(--accent)";
        btn.style.color = "var(--accent)";
    }, 2000);
}

// RSVP Local Logic
document.getElementById('rsvp-form').onsubmit = function(e) {
    e.preventDefault();
    alert("Jazakumullahu Khairan. Doa Anda telah kami terima.");
    this.reset();
}