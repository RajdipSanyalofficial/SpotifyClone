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
    title: 'On My Way',
    artist: 'Alan Walker, Sabrina Carpenter & Farruko',
    coverPath: 'images/on my way.jpg',
    discPath: 'music/On My Way.mp3',
    duration: '3:13',
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    coverPath: 'images/shape of you.jpg',
    discPath: 'music/Shape Of You.mp3',
    duration: '3:55',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    coverPath: 'images/Faded.jpg',
    discPath: 'music/Alan Walker - Faded.mp3',
    duration: '3:32',
  },
  {
    title: 'Despacito',
    artist: 'Daddy Yankee, Luis Fonsi',
    coverPath: 'images/Despacito.jpg',
    discPath: 'music/Despacito.mp3',
    duration: '4:41',
  },
  {
    title: 'Senorita',
    artist: 'Shawn Mendes, Camila Cabello',
    coverPath: 'images/Senorita.jpg',
    discPath: 'music/Senorita.mp3',
    duration: '3:25',
  },
  {
    title: 'Machayenge',
    artist: 'Emiway Bantai',
    coverPath: 'images/Machayenge.jpg',
    discPath: 'music/Machayenge.mp3',
    duration: '2:32',
  },
  {
    title: 'Chor Denge',
    artist: 'Sachet Parampara, Yogesh Dubey',
    coverPath: 'images/chhor Denge.jpg',
    discPath: 'music/Chor Denge.mp3',
    duration: '4:28',
  },
  {
    title: 'Muqabla - Street Dancer',
    artist: 'Yash Narvekar, Parampara Thakur',
    coverPath: 'images/Muqabla.jpg',
    discPath: 'music/Muqabla - Street Dancer.mp3',
    duration: '2:56',
  },
  {
    title: 'Tera Suit',
    artist: 'Tony Kakkar',
    coverPath: 'images/tera suit.jpg',
    discPath: 'music/Tera Suit.mp3',
    duration: '2:39',
  },
  {
    title: 'তাকে অল্প কাছে ডাকছি (প্রেম tame)',
    artist: 'Mahatim Shakib',
    coverPath: 'images/Takey Olpo Kachhe Dakchhi.jpg',
    discPath: 'music/Takey Olpo Kachhe Dakchhi.mp3',
    duration: '3:03',
  },
  {
    title: 'বিষণ্ণ চিমনি (বর্ণ পরিচয়)',
    artist:'Anupam Roy, Arijit Singh',
    coverPath: 'images/bornoporichoy.jpg',
    discPath: 'music/Bishonno Chimney.mp3',
    duration: '4:33',
  },
  {
    title: 'গ্যাস বেলুন (Vinci Da)',
    artist:'Anupam Roy',
    coverPath: 'images/gas balloon.jpg',
    discPath: 'music/Gas Balloon (Vinci Da).mp3',
    duration: '3:46',
  },
  {
    title: 'রাত পোহালে (ড্রাকুলা স্যার)',
    artist:'Ishan Mitra',
    coverPath: 'images/Raat-Pohale.jpg',
    discPath: 'music/Raat Pohale.mp3',
    duration: '2:52',
  },
  {
    title: 'পূর্ণিমা সন্ধ্যায়, তোমার রজনীগন্ধায়',
    artist:'Lyricist : Rabindranath Tagore',
    coverPath: 'images/purnima.jpg',
    discPath: 'music/Purnima Sondhay Tomar Rojonigondhay.mp3',
    duration: '0:43',
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
