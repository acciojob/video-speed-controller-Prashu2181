// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const playButton = document.createElement("button");
    const volumeControl = document.createElement("input");
    const playbackSpeedControl = document.createElement("input");
    const rewindButton = document.createElement("button");
    const forwardButton = document.createElement("button");
    const progressContainer = document.createElement("div");
    const progressBar = document.createElement("div");

    // Add classes for styling
    playButton.classList.add("player__button");
    volumeControl.classList.add("volume");
    playbackSpeedControl.classList.add("playbackSpeed");
    rewindButton.classList.add("rewind");
    forwardButton.classList.add("forward");
    progressContainer.classList.add("progress");
    progressBar.classList.add("progress__filled");

    // Set default properties
    playButton.textContent = "►"; // Default to play symbol
    volumeControl.type = "range";
    volumeControl.min = "0";
    volumeControl.max = "1";
    volumeControl.step = "0.05";
    volumeControl.value = video.volume;

    playbackSpeedControl.type = "range";
    playbackSpeedControl.min = "0.5";
    playbackSpeedControl.max = "2";
    playbackSpeedControl.step = "0.1";
    playbackSpeedControl.value = video.playbackRate;

    rewindButton.textContent = "« 10s";
    forwardButton.textContent = "25s »";

    // Append elements to the body
    document.body.appendChild(playButton);
    document.body.appendChild(volumeControl);
    document.body.appendChild(playbackSpeedControl);
    document.body.appendChild(rewindButton);
    document.body.appendChild(forwardButton);
    document.body.appendChild(progressContainer);
    progressContainer.appendChild(progressBar);

    // Toggle play/pause
    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.textContent = "❚ ❚";
        } else {
            video.pause();
            playButton.textContent = "►";
        }
    });

    // Update volume
    volumeControl.addEventListener("input", () => {
        video.volume = volumeControl.value;
    });

    // Update playback speed
    playbackSpeedControl.addEventListener("input", () => {
        video.playbackRate = playbackSpeedControl.value;
    });

    // Rewind video by 10 seconds
    rewindButton.addEventListener("click", () => {
        video.currentTime -= 10;
    });

    // Forward video by 25 seconds
    forwardButton.addEventListener("click", () => {
        video.currentTime += 25;
    });

    // Update progress bar
    video.addEventListener("timeupdate", () => {
        const progressPercent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    // Seek video when clicking on the progress bar
    progressContainer.addEventListener("click", (event) => {
        const clickX = event.offsetX;
        const totalWidth = progressContainer.offsetWidth;
        const seekTime = (clickX / totalWidth) * video.duration;
        video.currentTime = seekTime;
    });
});
