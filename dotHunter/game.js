const stageSize = 40;
const dotSize = 16;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stage = [];
var stageFile = document.getElementById('file');
var fileRead = 0;
var stageChange = "";
var dotX = 0;
var dotY = 0;

function keyDownHandler(e) {
    switch (e.key) {
        case "p":
            let stageText = "";
            for (let i = 0; i < stageSize; i++) {
                for (let j = 0; j < stageSize; j++) {
                    stageText += stage[i][j];
                }
                stageText += "\n";
            }
            console.log(stageText);
            break;
        case "0":
            stageChange = "0";
            break;
        case "1":
            stageChange = "1";
            break;
        case "2":
            stageChange = "2";
            break;
        case "3":
            stageChange = "3";
            break;
        case "4":
            stageChange = "4";
            break;
        default:
            break;
    }
}
function keyUpHandler(e) {
    switch (e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
            stageChange = "";
            break;
        default:
            break;
    }
}
function mouseDownHandler(e) {
    if (fileRead && e.offsetX != e.clientX && e.offsetY != e.client) {
        let mouseX = (e.offsetX - e.offsetX % dotSize) / dotSize;
        let mouseY = (e.offsetY - e.offsetY % dotSize) / dotSize;
        if (mouseX >= 0 && mouseX < stageSize && mouseY >= 0 && mouseY < stageSize) {
            stage[mouseY][mouseX] = String((Number(stage[mouseY][mouseX]) + 1) % 5);
        }
    }
}
function mouseMoveHandler(e) {
    if (fileRead && stageChange != "" && e.offsetX != e.clientX && e.offsetY != e.client) {
        let mouseX = (e.offsetX - e.offsetX % dotSize) / dotSize;
        let mouseY = (e.offsetY - e.offsetY % dotSize) / dotSize;
        if (mouseX >= 0 && mouseX < stageSize && mouseY >= 0 && mouseY < stageSize) {
            stage[mouseY][mouseX] = stageChange;
        }
    }
}
function readStageFile(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    if (!file.type.match('text/plain')) {
        alert("error 1");
        document.location.reload();
    }
    else {
        reader.readAsText(file);

        reader.onload = function (ev) {
            let str = reader.result.replace(/\r?\n/g, "");

            if (str.length != stageSize * stageSize) {
                alert("error 2");
                document.location.reload();
            }
            else {
                for (let i = 0; i < stageSize; i++) {
                    stage[i] = [];
                    for (let j = 0; j < stageSize; j++) {
                        stage[i][j] = str.charAt(i * stageSize + j);
                        if (stage[i][j] == "S") {
                            dotX = j * dotSize;
                            dotY = i * dotSize;
                        }
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
document.addEventListener("mousemove", mouseMoveHandler, false);
stageFile.addEventListener("change", readStageFile, false);

function drawStage() {
    for (let i = 0; i < stageSize; i++) {
        for (let j = 0; j < stageSize; j++) {
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
                    ctx.fillStyle = "red";
                    break;
                case "3":
                    ctx.fillStyle = "green";
                    break;
                case "4":
                    ctx.fillStyle = "blue";
                    break;
                case "S":
                    break;
                case "G":
                    ctx.fillStyle = "gold";
                    break;
                default:
                    alert("error : " + stage[i][j]);
                    document.location.reload();
                    break;
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawDot(){
    ctx.beginPath();
    ctx.rect(dotX, dotY, dotSize, dotSize);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fileRead) {

        drawStage();
        drawDot();
    }
}
draw();