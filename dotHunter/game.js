const stageSize = 40;
const dotSize = 16;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stage = [];
var stageFile = document.getElementById('file');
var fileRead = 0;


function keyDownHandler(e) {

}
function keyUpHandler(e) {

}
function readStageFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();


    if (!file.type.match('text/plain')) document.location.reload();
    reader.readAsText(file);

    reader.onload = function (ev) {
        var str = reader.result.replace(/\r?\n/g, "");
        if (str.length != stageSize * stageSize) document.location.reload();
        for (var i = 0; i < stageSize; i++) {
            stage[i] = [];
            for (var j = 0; j < stageSize; j++) {
                stage[i][j] = str.charAt(i * stageSize + j);
            }
        }
        fileRead = 1;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
stageFile.addEventListener("change", readStageFile, false);

function drawStage() {
    for (var i = 0; i < stageSize; i++) {
        for (var j = 0; j < stageSize; j++) {
            console.log("ok");
            ctx.beginPath();
            ctx.rect(j * dotSize, i * dotSize, dotSize, dotSize);
            switch (stage[i][j]) {
                case "0":
                    ctx.fillStyle = "black";
                    break;
                case "1":
                    ctx.fillStyle = "gray";
                    break;
                case "2":
                    ctx.fillStyle = "green";
                    break;
                case "3":
                    ctx.fillStyle = "blue";
                    break;
                case "4":
                    ctx.fillStyle = "purple";
                    break;
                default:
                    console.log("default");
                    break;
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    var requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fileRead) {

        drawStage();
    }
}
draw();