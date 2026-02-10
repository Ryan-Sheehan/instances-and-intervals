import './style.css';

const VIDEO_COUNT = 7;
const VIDEO_DIR = 'video/';

const videoPlayer = document.getElementById('video-player');
const video = videoPlayer.querySelector('.fullscreen-bg__video');
const playlist = videoPlayer.querySelector('.fullscreen-bg__playlist');
const allLinks = playlist.children;
let currentVideo = 0;

// Toggle mute on any click or keypress
function toggleMute() {
  video.muted = !video.muted;
}
document.addEventListener('click', toggleMute);
document.addEventListener('keydown', toggleMute);

// Extract filenames from playlist links
const linkList = Array.from(allLinks).map((link) => {
  const match = link.href.match(/([^/]+)(?=\.\w+$)/);
  return match ? match[0] : '';
});

function playVideo(index) {
  currentVideo = index;
  allLinks[index].classList.add('current-video');
  video.querySelector('source').src = `${VIDEO_DIR}${linkList[index]}.mp4`;
  video.load();
  video.play();
}

// Start a random video on load
const firstVideo = Math.floor(Math.random() * VIDEO_COUNT);
allLinks[firstVideo].classList.add('current-video');
playVideo(firstVideo);

// When a video ends, pick a random unplayed video
video.addEventListener('ended', () => {
  allLinks[currentVideo].classList.remove('current-video');
  allLinks[currentVideo].classList.add('used-video');

  let attempts = 0;
  let nextVideo = Math.floor(Math.random() * VIDEO_COUNT);

  while (allLinks[nextVideo].classList.contains('used-video')) {
    nextVideo = Math.floor(Math.random() * VIDEO_COUNT);
    attempts++;

    // Reset once all videos have been played
    if (attempts >= VIDEO_COUNT) {
      for (let i = VIDEO_COUNT - 1; i >= 0; i--) {
        allLinks[i].classList.remove('used-video');
      }
    }
  }

  allLinks[nextVideo].classList.add('used-video');
  playVideo(nextVideo);
});

