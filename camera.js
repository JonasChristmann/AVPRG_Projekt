const webCamElement = document.getElementById("webCam");
const canvasElement = document.getElementById("canvas");
const webcam = new Webcam(webCamElement, "user",canvasElement );
print("yes");
webcam.start();
