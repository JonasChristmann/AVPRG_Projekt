const canvas2 = document.querySelector("#canvas2");
const ctx2 = canvas2.getContext('2d');
const video = document.querySelector("video");

video.addEventListener("play", () => {
    function step() {
        ctx2.drawImage(video, 0, 0, canvas2.width, canvas2.height);
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
});

