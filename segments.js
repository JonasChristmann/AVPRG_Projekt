
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return [x,y]
}

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

let rectClicks = 0;

let singleCoordinates = []

let coordinates = [];

let firstRect = true;
let first = true;

segmentCaption(coordinates.length);

canvas.addEventListener('mousedown', (e)=>{

    ctx.strokeStyle = '#9A1F40';
    ctx.fillStyle = '#9A1F40';
    ctx.lineWidth = 5;

    if  (coordinates.length < 7){

        
        ctx.fillRect(getCursorPosition(canvas, e)[0]-5, getCursorPosition(canvas, e)[1]-5, 10, 10);

        if (rectClicks >= 1 && firstRect) {
            ctx.lineTo(...getCursorPosition(canvas, e));
            ctx.stroke();
        } else {
            ctx.moveTo(...getCursorPosition(canvas, e));
            firstRect = true;
        }

        if (rectClicks == 0) {
            
            ctx.beginPath();
            ctx.moveTo(...getCursorPosition(canvas, e));
        }

        rectClicks++;

        if (rectClicks == 4 ) {
            rectClicks = 0;
            coordinates.push(singleCoordinates);
            singleCoordinates = [];
            ctx.closePath();
            ctx.stroke();
            firstRect = false;
            segmentCaption(coordinates.length);

        }

        singleCoordinates.push(getCursorPosition(canvas, e));

        console.log(coordinates);

    }

});


function segmentCaption(i){
    let text = document.querySelector("#segmentCaption");
    switch (i) {
        case 0:
            text.innerHTML = "Define the Kick section";
            break;

        case 1:
            text.innerHTML = "Define the Left-Tom section";
            break;

        case 2:
            text.innerHTML = "Define the Right-Tom section";
            break;
        
        case 3:
            text.innerHTML = "Define the Snare section";
            break;

        case 4:
            text.innerHTML = "Define the Hi-Hat section";
            break;

        case 5:
            text.innerHTML = "Define the Floor Tom section";
            break;
             
        case 6:
            text.innerHTML = "Define the Cymbal section";
            break;

        default:
            break;
    }

}