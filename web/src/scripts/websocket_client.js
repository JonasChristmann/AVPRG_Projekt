
let websocketClient;

document.addEventListener('DOMContentLoaded', function(){

    websocketClient = new WebSocket("ws://localhost:12345/");

    websocketClient.onopen = function(){

        console.log("connected to server");

        // websocketClient.addEventListener('message', (event) => {
        //     let message = event.data;
        //     console.log('Message from server: ', message);
        // });

        websocketClient.onmessage = (message)=>{
            console.log("received server data", message.data);
            websocketClient.send("recieved: " + message.data);
            if(message.data != "42"){
                playSound(message.data);
            }
        }
    };

});


function sendPoints(pointArray) {
    websocketClient.send(pointArray.toString());
}

