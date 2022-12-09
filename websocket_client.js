
let websocketClient;

document.addEventListener('DOMContentLoaded', function(){

    websocketClient = new WebSocket("ws://localhost:12345/");

    websocketClient.onopen = function(){
        console.log("Site fully loaded");

        websocketClient.onmessage = function(message) {
            console.log(message.data);
        }
    };

}, false);

websocketClient.onopen = function(){
    websocketClient.onmessage = function(message) {
        console.log(message.data);
    }
};

function sendPoints(pointArray) {
    websocketClient.send(pointArray.toString());
}
