var objetcs = [];
var model_status = "";

function preload() {
    video = createVideo("video.mp4");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
    console.log("Modelo Carregado.");
    model_status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objetcs = results;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (model_status != "") {
        objectDetector.detect(video, gotResult);
        for (index = 0; index < objetcs.length; index++) {
            document.getElementById("status").innerHTML = "Objetos Detectados.";
            document.getElementById("number_obj").innerHTML = "Quantidade de objetos detectados: " + objetcs.length;
            fill("#FF0000");
            var percent = floor(objetcs[index].confidence * 100);
            text(objetcs[index].label + " " + percent + "%", objetcs[index].x + 15, objetcs[index].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objetcs[index].x, objetcs[index].y, objetcs[index].width, objetcs[index].height);
        }
    }
}
