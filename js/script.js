let playBtn = `<span class="material-icons">play_arrow</span>`,
  pauseBtn = `<span class="material-icons">pause</span>`,
  changeVolume = `<span class="material-icons">volume_up</span>`,
  muteVolume = `<span class="material-icons">volume_mute</span>`,
  media = document.querySelector('#media'),
  play = document.querySelector('#play'),
  bar = document.querySelector('#bar'),
  progress = document.querySelector('#progress'),
  mute = document.querySelector('#mute'),
  volume = document.querySelector('.volume'),
  volumeWrapper = document.querySelector('.control'),
  flag = true,
  player = document.querySelector("#darkplayer"),
  playImg = document.querySelector('#playImg'),
  videoPlayInterval,
  wrapperVideos = document.querySelector('.wrapper-videos'),
  fullScreen = document.querySelector('#fullscreen');

function initiate() {
  play.addEventListener('click', video);
  fullScreen.addEventListener('click', openFullScreen);
  resetOptions();
}

addEventListener('load', initiate);

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && flag && media.paused) {
    playVideo();
    flag = false;
  } else if (event.code === 'Space' && flag && !media.paused && !media.ended) {
    pauseVideo();
    flag = false;
  }
});

document.addEventListener('keyup', function (event) {
  if (event.code === 'Space') {
    flag = true;
  }
});

function video() {
  if (!media.paused && !media.ended) {
    pauseVideo();
  } else {
    playVideo();
  }
}

function openFullScreen() {
  if (media.requestFullscreen) {
    media.requestFullscreen();
  } else if (media.webkitRequestFullscreen) {
    media.webkitRequestFullscreen();
  } else if (media.msRequestFullScreen) {
    media.msRequestFullScreen();
  }
}

bar.addEventListener('click', (e) => {
  let posX = e.pageX - bar.getBoundingClientRect().left;
  let timePos = (posX * 100) / 400;
  progress.style.width = timePos + '%';
  media.currentTime = Math.round((timePos * Math.round(media.duration)) / 100);
});
mute.addEventListener('click', sound);

function sound() {
  if (mute.innerHTML == changeVolume) {
    media.muted = true;
    mute.innerHTML = muteVolume;
    mute.style.background = '#ddd';
  } else {
    mute.style.background = '#00adef';
    media.muted = false;
    mute.innerHTML = changeVolume;
  }
}

volumeWrapper.addEventListener('click', (e) => {
  let posX = e.pageX - volumeWrapper.getBoundingClientRect().left;
  let timePos = posX;
  volume.style.width = timePos + '%';
  media.volume = Math.round(timePos) / 100;
});

function playVideo() {
  play.innerHTML = playBtn;
  media.play();
  videoPlayInterval = setInterval(function () {
    let videoTime = Math.round(media.currentTime);
    let videoLength = Math.round(media.duration);
    progress.style.width = (videoTime * 100) / videoLength + '%';
  }, 10);
  player.style.cssText = `display: none;`;
  playImg.style.cssText = `display: none;`;
}

function pauseVideo() {
  clearInterval(videoPlayInterval);
  play.innerHTML = pauseBtn;
  media.pause();
  player.style.cssText = `display: block;`;
  playImg.style.cssText = `display: block;`;
}

wrapperVideos.addEventListener('click', (e) => {
  if (e.target && !e.target.classList.contains('wrapper-videos')) {
    switch (e.target.className) {
      case 'vi1':
        chooseVideo('video/v1.mp4');
        break;
      case 'vi2':
        chooseVideo('video/hi.mp4');
        break;
      case 'vi3':
        chooseVideo('video/video.mp4');
        break;
      case 'vi4':
        chooseVideo('video/v2.mp4');
        break;
      case 'vi5':
        chooseVideo('video/wt.mp4');
        break;
      default:
        chooseVideo('video/v1.mp4');
        break;
    }
  }
});

function chooseVideo(numVideo) {
  media.src = `${numVideo}`;
  resetOptions();
}

function resetOptions() {
  pauseVideo();
  progress.style.width = 0;
  media.muted = false;
  mute.innerHTML = changeVolume;
  media.volume = 0.5;
  volume.style.width = 50 + '%';
}