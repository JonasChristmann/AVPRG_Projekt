
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


const hihatImage = new Image(50, 50);
hihatImage.src = "./images/hi-hat.png";

const cymbalImage = new Image(50, 50);
cymbalImage.src = "./images/cymbal.png";

const floorTomImage = new Image(50, 50);
floorTomImage.src = "./images/floor-tom.png";

const kickImage = new Image(50, 50);
kickImage.src = "./images/kick.png";

const snareImage = new Image(50, 50);
snareImage.src = "./images/snare-drum.png";

const tomLeftImage = new Image(50, 50);
tomLeftImage.src = "./images/tom-left.png";

const tomRightImage = new Image(50, 50);
tomRightImage.src = "./images/tom-right.png";


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

        singleCoordinates.push(getCursorPosition(canvas, e));

        if (rectClicks == 4 ) {
            rectClicks = 0;
            coordinates.push(singleCoordinates);
            singleCoordinates = [];
            ctx.closePath();
            ctx.stroke();
            firstRect = false;
            segmentCaption(coordinates.length);
            drawInCenter(coordinates.length-1);

        }

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
        case 7: 
            text.innerHTML = "All sections Set, ready to play "
            break;

        default:
            break;
    }

}

function drawInCenter(i){

    let sumX = 0;
    let sumY = 0;

    
    coordinates[[coordinates.length-1]].forEach(element => {
        sumX += element[0];
        sumY += element[1];
    });

    let width = 50;
    let height = 50;

    let x = sumX / 4 - width / 2;
    let y = sumY / 4 - height / 2;


        
    switch (i) {
        case 0:
            // text.innerHTML = "Define the Kick section";
            ctx.drawImage(kickImage, x, y, width, height);

            break;

        case 1:
            // text.innerHTML = "Define the Left-Tom section";
            ctx.drawImage(tomLeftImage, x, y, width, height);

            break;

        case 2:
            // text.innerHTML = "Define the Right-Tom section";
            ctx.drawImage(tomRightImage, x, y, width, height);

            break;
        
        case 3:
            // text.innerHTML = "Define the Snare section";
            ctx.drawImage(snareImage, x, y, width, height);

            break;

        case 4:
            // text.innerHTML = "Define the Hi-Hat section";
            ctx.drawImage(hihatImage, x, y, width, height);

            break;

        case 5:
            // text.innerHTML = "Define the Floor Tom section";
            ctx.drawImage(floorTomImage, x, y, width, height);

            break;
             
        case 6:
            // text.innerHTML = "Define the Cymbal section";
            ctx.drawImage(cymbalImage, x, y, width, height);

            break;

        default:
            break;
    }
}