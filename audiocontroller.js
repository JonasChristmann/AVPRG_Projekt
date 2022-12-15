
let drumsetSelector = document.querySelector('#drumSets');

let allSelectors = document.querySelectorAll('select');

drumsetSelector.addEventListener('change', ()=>{
   allSelectors.forEach(element => {
        element.value = drumsetSelector.value;
        
   });
});


let context = new AudioContext();

let cymbal_classic_sound = new Audio("sounds/Classic/Cymbal_Classic.wav");
let cymbal_jazz_sound = new Audio("sounds/Jazz/Cymbal_Jazz.wav");
let cymbal_synth_sound = new Audio("sounds/Synth/Cymbal_Synth.wav");

let floortom_classic_sound = new Audio("sounds/Classic/Tom_Classic.wav");
let floortom_jazz_sound = new Audio("sounds/Jazz/Tom_Jazz.wav");
let floortom_synth_sound = new Audio("sounds/Synth/Tom_Synth.wav");

let hihat_classic_sound = new Audio("sounds/Classic/Hi-Hat_Classic.wav");
let hihat_jazz_sound = new Audio("sounds/Jazz/HiHat_Jazz.wav");
let hihat_synth_sound = new Audio("sounds/Synth/HiHat_Synth.wav");

let kick_classic_sound = new Audio("sounds/Classic/Kick_Classic.wav");
let kick_jazz_sound = new Audio("sounds/Jazz/Kick_Jazz.wav");
let kick_synth_sound = new Audio("sounds/Synth/Kick_Synth.wav");

let snare_classic_sound = new Audio("sounds/Classic/Snare_Classic.wav");
let snare_jazz_sound = new Audio("sounds/Jazz/Snare_Jazz.wav");
let snare_synth_sound = new Audio("sounds/Synth/Snare_Synth.wav");

let leftTom_classic_sound = new Audio("sounds/Classic/Tom_Classic.wav");
let leftTom_jazz_sound = new Audio("sounds/Jazz/Tom2_Jazz.wav");
let leftTom_synth_sound = new Audio("sounds/Synth/Tom_Synth.wav");

let rightTom_classic_sound = new Audio("sounds/Classic/Tom_Classic.wav");
let rightTom_jazz_sound = new Audio("sounds/Jazz/Tom2_Jazz.wav");
let rightTom_synth_sound = new Audio("sounds/Synth/Tom_Synth.wav");


let allSounds = [
    [kick_classic_sound, kick_jazz_sound, kick_synth_sound],
    [leftTom_classic_sound, leftTom_jazz_sound, leftTom_synth_sound],
    [rightTom_classic_sound, rightTom_jazz_sound, rightTom_synth_sound],
    [snare_classic_sound, snare_jazz_sound, snare_synth_sound],
    [hihat_classic_sound, hihat_jazz_sound, hihat_synth_sound],
    [floortom_classic_sound, floortom_jazz_sound, floortom_synth_sound],
    [cymbal_classic_sound, cymbal_jazz_sound, cymbal_synth_sound]
    ]

let gainNode = context.createGain();

allSounds.forEach(element => {
    context.createMediaElementSource(element).connect(gainNode);
});


gainNode.connect(context.destination);

gainNode.gain.value = 0.1;



function playSound (segmentIndex){

    indexToString = {0: 'kick', 1:'toms', 2:'toms', 3:'snare', 4:'hihat', 5:'floorTom', 6:'cymbal'}

    let select = document.querySelector('#' + indexToString[segmentIndex])
    let optionVal = select.value;

    allSounds[segmentIndex][optionVal].play();

}