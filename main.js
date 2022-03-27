synth = window.speechSynthesis;
img = "";
status1 = "";
object = [];
confidence = 0;
value = "";
var utterThis;

function setup() {
    canvas = createCanvas(500,400);
    canvas.position(530, 340);
    video = createCapture(VIDEO);
    video.size(500,400)
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Models";
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        fill(52, 91, 235);
        noFill();
        stroke(52, 91, 235);
        for(i = 0; i < object.length; i++) {
            confidence = Math.floor(object[i].confidence*100);
            text(object[i].label+' '+confidence+'%',object[i].x+5,object[i].y+13);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label == value) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("iffound").innerHTML = "Found " + value;
                utterThis = new SpeechSynthesisUtterance(value+" is found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("iffound").innerHTML = value + " Not found";
            }
        }
    }
}

function modelLoaded() {
    console.log("The Model is Loaded");
    status1 = "true";
}

function gotResult(error,result) {
    if(error){
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}

function startcheck() {
    value = document.getElementById("inputcoco").value;
}