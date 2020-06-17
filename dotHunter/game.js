const stageSize = 40;
const dotSize = 16;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stage = [];
var stageFile = document.getElementById('file');
var fileRead = 0;


function keyDownHandler(e) {
    if (e.key == "p") {
        var stageText = "";
        for (var i = 0; i < stageSize; i++) {
            for (var j = 0; j < stageSize; j++) {
                stageText += stage[i][j];
            }
            stageText += "\n";
        }
        console.log(stageText);
    }

}
function keyUpHandler(e) {

}
function mouseDownHandler(e) {
    var mouseX = (e.offsetX - e.offsetX % dotSize) / dotSize;
    var mouseY = (e.offsetY - e.offsetY % dotSize) / dotSize;
    if (e.offsetX == e.clientX && e.offsetY == e.clientY) console.log("outside canvas");
    else if (mouseX >= 0 && mouseX < stageSize && mouseY >= 0 && mouseY < stageSize) {
        stage[mouseY][mouseX] = String((Number(stage[mouseY][mouseX]) + 1) % 5);
    }
}
function readStageFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    if (!file.type.match('text/plain')) {
        alert("error 1");
        document.location.reload();
    }
    else {
        reader.readAsText(file);

        reader.onload = function (ev) {
            var str = reader.result.replace(/\r?\n/g, "");

            if (str.length != stageSize * stageSize) {
                alert("error 2");
                document.location.reload();
            }
            else {
                for (var i = 0; i < stageSize; i++) {
                    stage[i] = [];
                    for (var j = 0; j < stageSize; j++) {
                        stage[i][j] = str.charAt(i * stageSize + j);
                    }
                }
                fileRead = 1;
            }
        }
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
stageFile.addEventListener("change", readStageFile, false);

function drawStage() {
    for (var i = 0; i < stageSize; i++) {
        for (var j = 0; j < stageSize; j++) {
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