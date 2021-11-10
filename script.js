
const music = document.querySelector('audio');
//player control elements
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const playButton = document.getElementById('play');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const songDuration = document.getElementById('duration');
const songCurrentTime = document.getElementById('current-time');
//music info elements
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

//playlist
const playlist = [
    {
        filename: 'jacinto-1',
        songname: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        filename: 'jacinto-2',
        songname: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        filename: 'jacinto-3',
        songname: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        filename: 'metric-1',
        songname: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]

//check if playing
let isPlaying = false;

//play
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

//listeners
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);

//update progress and time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }        
        //delay switching duration to avoid NaN
        if(durationSeconds) {
            songDuration.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        } 
        songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//set time from progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const posX = e.offsetX;
    const { duration } = music;
    music.currentTime = (posX / width) * duration;
}

//current song
let songIndex = 0;

function nextSong() {
    songIndex++;
    if(songIndex >= playlist.length) {
        songIndex = 0;
    }
    loadSong(playlist[songIndex]);
}

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    loadSong(playlist[songIndex]);
}

//update DOM
function loadSong(song) {
    title.textContent = song.songname;
    artist.textContent = song.artist;
    music.src = `music/${song.filename}.mp3`;
    image.src = `img/${song.filename}.jpg`;

    progressBar.style.width = "0%";
    if(isPlaying) {
        playSong();
    }
}

//onload
loadSong(playlist[songIndex]);