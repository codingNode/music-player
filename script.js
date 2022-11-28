const image = document.querySelector('img')
const music = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const totalTime = document.getElementById('duration')
const cTime= document.getElementById('current-time')


// Music
const song = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];

  
let isPlaying = false;

function playMusic()
{
    isPlaying= true;
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause')
}

function pauseMusic()
{
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play')
}

function loadSong(song)
{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

    playMusic()
}

let songIndex =0;

function prevSong()
{
    songIndex--;
    if(songIndex<0)
    {
        songIndex = song.length -1;
    }
    loadSong(song[songIndex])
}
function nextSong()
{
    songIndex++;
    if(songIndex > song.length-1)
    {
        songIndex = 0;
    }
    loadSong(song[songIndex])
}

function progressUpdate(e)
{
    const {currentTime, duration} = e.srcElement;
    
    if(isPlaying)
    {
        // updating the width of progress bar
        progress.style.width =`${(currentTime/duration)*100}%`;

        // updating the duration
        let durationSeconds = Math.floor(duration % 60);

        if(durationSeconds<10)
        {
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds)
        {
            totalTime.textContent =`${Math.floor(duration/60)}:${durationSeconds}`
        }
        
    }
     // updating the currentTime
     let currentSeconds = Math.floor(currentTime % 60);
     if(currentSeconds<10)
     {
         currentSeconds = `0${currentSeconds}`
     }
     if(currentSeconds)
     {
         cTime.textContent =`${Math.floor(currentTime/60)}:${currentSeconds}`
     }
     
 }
// Set Progress Bar
function setProgressBar(e) {
    // this->progressContainer(receive the event e) | this.clientWidth =style->progress-container->width
    const width = this.clientWidth;
    const clickX = e.offsetX;
    // duration(audio property): Returns the length of the current audio/video (in seconds)
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
  }
     
    
playBtn.addEventListener('click',()=>{isPlaying ? pauseMusic() : playMusic()});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate', progressUpdate)
progressContainer.addEventListener('click', setProgressBar);
