"use strict";
var music = document.querySelector('audio');
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var playButton = document.getElementById('play');
var progressContainer = document.getElementById('progress-container');
var progressBar = document.getElementById('progress');
var songDuration = document.getElementById('duration');
var songCurrentTime = document.getElementById('current-time');
var image = document.querySelector('img');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var playlist = [
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
];
var isPlaying = false;
function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}
function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}
playButton.addEventListener('click', function () { return (isPlaying ? pauseSong() : playSong()); });
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
function updateProgressBar(e) {
    if (isPlaying) {
        var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
        var progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + "%";
        var durationMinutes = Math.floor(duration / 60);
        var durationSeconds = Math.floor(duration % 60);
        var durationSecs = durationSeconds.toString();
        if (durationSeconds < 10) {
            durationSecs = "0" + durationSeconds;
        }
        if (durationSeconds) {
            songDuration.textContent = durationMinutes + ":" + durationSecs;
        }
        var currentMinutes = Math.floor(currentTime / 60);
        var currentSeconds = Math.floor(currentTime % 60);
        var currentSecs = currentSeconds.toString();
        if (currentSeconds < 10) {
            currentSecs = "0" + currentSeconds;
        }
        songCurrentTime.textContent = currentMinutes + ":" + currentSecs;
    }
}
function setProgressBar(e) {
    var width = progressContainer.clientWidth;
    var posX = e.offsetX;
    var duration = music.duration;
    music.currentTime = (posX / width) * duration;
}
var songIndex = 0;
function nextSong() {
    songIndex++;
    if (songIndex >= playlist.length) {
        songIndex = 0;
    }
    loadSong(playlist[songIndex]);
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    loadSong(playlist[songIndex]);
}
function loadSong(song) {
    title.textContent = song.songname;
    artist.textContent = song.artist;
    music.src = "music/" + song.filename + ".mp3";
    image.src = "img/" + song.filename + ".jpg";
    progressBar.style.width = "0%";
    if (isPlaying) {
        playSong();
    }
}
loadSong(playlist[songIndex]);
