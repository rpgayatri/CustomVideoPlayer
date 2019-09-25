/** Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled ");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

/* building functions */
/* playing the video */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/* update the play/pause button icon */
function updateButton() {
  const icon = this.paused ? "►" : "▌▌";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function updateHandleProgress(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function playerFullScreen() {
  isFullScreen = isFullScreen ? false : true;
  if (!isFullScreen) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}

/* hooking up video listeners */
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

let mouseDown = false;
progress.addEventListener("click", updateHandleProgress);
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
progress.addEventListener("mousemove", () => {
  if (mouseDown) {
    updateHandleProgress;
  }
});

let isFullScreen = false;
fullscreen.addEventListener("click", playerFullScreen);
