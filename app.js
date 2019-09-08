//Handtrack config
const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 4, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.8, // confidence threshold for predictions.
};


//Get media from webcam for different browsers
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

//Select from html
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');

//Model for handtrack
let model;

handTrack.startVideo(video).then(status => {
    if (status) {
        //Send video to #video from html
        navigator.getUserMedia({
            video: {}
        }, stream => {
            video.srcObject = stream;
            //Run detection
            setInterval(runDetection, 300);
        }, err => {
            console.log(err);
        });
    }
});

//Detection function
function runDetection(){
    model.detect(video).then(predictions =>{
        if(predictions.length !==0){
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            console.log(x)
            console.log(y)

            //If y-axis is less than 200
            if(y>200){
                if(x<200){
                    audio.src = './sounds/bubbles.mp3';
                }
                else if(x>400){
                    audio.src = './sounds/clay.mp3';
                }
                else if(x>300 && x<400){
                    audio.src = './sounds/confetti.mp3';
                }
                else if(x>200 && x<300){
                    audio.src = './sounds/glimmer.mp3';
                }
            }
            audio.play();
        }
    })
};



//Load model
handTrack.load(modelParams).then(lmodel =>{
    //Change the model to lmodel after loading
    model = lmodel;
});