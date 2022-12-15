
let websocketClient;

document.addEventListener('DOMContentLoaded', function(){

    websocketClient = new WebSocket("ws://localhost:12345/");

    websocketClient.onopen = function(){

        console.log("Site fully loaded");

        // websocketClient.addEventListener('message', (event) => {
        //     let message = event.data;
        //     console.log('Message from server: ', message);
        // });

        websocketClient.onmessage = (message)=>{
            console.log(message.data)
        }
    };

});


function sendPoints(pointArray) {
    websocketClient.send(pointArray.toString());
}

