const musicContainer = document.getElementById("music-container");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentSong = document.querySelector(".current-song");
const totalSongs = document.querySelector(".total-song");
const volumeIndicator = document.querySelector(".volume-indicator");

// Song titles
const songs = ['El-Shaddai', 'Jurassic-Park', 'Star-Wars'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Display total songs
totalSongs.innerHTML = `${songs.length}`;

// Update song details
function loadSong(song) {
  title.innerText = `Song: ${song}`;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  currentSong.innerHTML = `${songIndex + 1}`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  // playBtn.querySelector('i.fas').classList.remove('fa-play');
  // playBtn.querySelector('i.fas').classList.add('fa-pause');
  playBtn.querySelector("i.fas").classList.replace("fa-play", "fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  // playBtn.querySelector('i.fas').classList.remove('fa-pause');
  // playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector("i.fas").classList.replace("fa-pause", "fa-play");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  
  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  // const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  // const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;  
  audio.currentTime = (clickX / width) * duration;
}

// Update volume (increase or decrease)
function changeVolume() {
  audio.volume = volume.value;
  volumeIndicator.innerHTML = `${(audio.volume) * 100}%`;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  }
  else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Change Volume
volume.addEventListener("change", changeVolume);
volume.addEventListener("input", changeVolume);