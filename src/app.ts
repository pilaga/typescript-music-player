
const music = document.querySelector('audio')! as HTMLAudioElement;
//player control elements
const prevButton = document.getElementById('prev')! as HTMLElement;
const nextButton = document.getElementById('next')! as HTMLElement;
const playButton = document.getElementById('play')! as HTMLElement;
const progressContainer = document.getElementById('progress-container')! as HTMLDivElement;
const progressBar = document.getElementById('progress')! as HTMLDivElement;
const songDuration = document.getElementById('duration')! as HTMLSpanElement;
const songCurrentTime = document.getElementById('current-time')! as HTMLSpanElement;
//music info elements
const image = document.querySelector('img')! as HTMLImageElement;
const title = document.getElementById('title')! as HTMLHeadingElement;
const artist = document.getElementById('artist')! as HTMLHeadingElement;

interface Song {
    filename: string,
    songname: string,
    artist: string
}

//playlist
const playlist: Song[] = [
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
function playSong(): void {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong(): void {
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
function updateProgressBar(e: any): void {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        let durationSecs = durationSeconds.toString();
        if(durationSeconds < 10) {
            durationSecs = `0${durationSeconds}`;
        }        
        //delay switching duration to avoid NaN
        if(durationSeconds) {
            songDuration.textContent = `${durationMinutes}:${durationSecs}`;
        }
        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        let currentSecs = currentSeconds.toString();
        if(currentSeconds < 10) {
            currentSecs = `0${currentSeconds}`;
        } 
        songCurrentTime.textContent = `${currentMinutes}:${currentSecs}`;
    }
}

//set time from progress bar
function setProgressBar(e: any): void {    
    const width = progressContainer.clientWidth;
    const posX = e.offsetX;
    const { duration } = music;
    music.currentTime = (posX / width) * duration;
}

//current song
let songIndex = 0;

function nextSong(): void {
    songIndex++;
    if(songIndex >= playlist.length) {
        songIndex = 0;
    }
    loadSong(playlist[songIndex]);
}

function prevSong(): void {
    songIndex--;
    if(songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    loadSong(playlist[songIndex]);
}

//update DOM
function loadSong(song: Song) {
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