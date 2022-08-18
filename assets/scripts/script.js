const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Alone',
    artist: 'Alan Walker',
    coverPath: 'assets/images/Alan1.jpg',
    discPath: 'assets/music/music 1.mp3',
    duration: '2:43',
  },
  {
    title: 'Darkside',
    artist: 'Alan Walker',
    coverPath: 'assets/images/Alan1.jpg',
    discPath: 'assets/music/music 2.mp3',
    duration: '3:31',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    coverPath: 'assets/images/Alan1.jpg',
    discPath: 'assets/music/music 3.mp3',
    duration: '3:32',
  },
  {
    title: 'Alone Pt. II',
    artist: 'Alan Walker',
    coverPath: 'assets/images/Alan1.jpg',
    discPath: 'assets/music/music 4.mp3',
    duration: '4:05',
  },
  {
    title: 'On My Way',
    artist: 'Alan Walker',
    coverPath: 'assets/images/Alan1.jpg',
    discPath: 'assets/music/music 5.mp3',
    duration: '3:36',
  },
  {
    title: 'Baby',
    artist: 'Justin Beiber',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 9.mp3',
    duration: '3:39',
  },
  {
    title: 'Intentions',
    artist: 'Justin Beiber',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 10.mp3',
    duration: '3:44',
  },
  {
    title: 'Love Me Like U Do',
    artist: 'Justin Beiber',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 11.mp3',
    duration: '3:50',
  },
  {
    title: 'Can We Kiss Forever?',
    artist: 'Adriana Proenza',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 13.mp3',
    duration: '3:07',
  },
  {
    title: 'Into Your Arms',
    artist: 'Witt Lowry',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 14.mp3',
    duration: '2:20',
  },
  {
    title: 'Señorita',
    artist: 'Shawn Mendes & Camila Cabello ',
    coverPath: 'assets/images/yummy_cover.jpg',
    discPath: 'assets/music/music 15.mp3',
    duration: '3:25',
  },
  {
	 title:'Mass maranam',
	 artist:'Anirudh Ravichander',
	 coverPath:'assets/images/Ani2.jpg',
	 discPath:'assets/music/music6.mp3',
	 duration:'3:14',
  },
  {
    title:'Kadhal Kaviye',
    artist:'Sid sriram',
    coverPath:'assets/images/sid1.jpg',
    discPath:'assets/music/music 7.mp3',
    duration:'5:10',
  },
  {
    title:'Theethiriyaai',
    artist:'Sid sriram',
    coverPath:'assets/images/sid1.jpg',
    discPath:'assets/music/Music8.mp3',
    duration:'2:47',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}
// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
