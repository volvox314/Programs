const stageSize = 40;
const dotSize = 16;
const speed = 2;
const dotType = 10;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var stage = [];
var stageFile = document.getElementById('file');
var fileRead = 0;
var startFind = false;
var stageChange = "";
var dotX = 0;
var dotY = 0;
var dotXInit = 0;
var dotYInit = 0;
var pressA = false;
var pressD = false;
var pressW = false;
var jumpFlag = true;
var jumpTime = 0;

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
        case "5":
            stageChange = "5";
            break;
        case "6":
            stageChange = "6";
            break;
        case "7":
            stageChange = "7";
            break;
        case "8":
            stageChange = "8";
            break;
        case "9":
            stageChange = "9";
            break;
        case "a":
            pressA = true;
            break;
        case "d":
            pressD = true;
            break;
        case "w":
            pressW = true;
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
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            stageChange = "";
            break;
        case "a":
            pressA = false;
            break;
        case "d":
            pressD = false;
            break;
        case "w":
            pressW = false;
            jumpFlag = false;
            jumpTime = 0;
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
            if (stage[mouseY][mouseX] != "S" && stage[mouseY][mouseX] != "G") {
                stage[mouseY][mouseX] = String((Number(stage[mouseY][mouseX]) + 1) % dotType);
            }
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
                            startFind = true;
                            dotX = j * dotSize;
                            dotY = i * dotSize;
                            dotXInit = dotX;
                            dotYInit = dotY;
                        }
                    }
                }
                if (!startFind) alert("S is not find.");
                else fileRead = 1;
            }
        }
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
stageFile.addEventListener("change", readStageFile, false);

function drawStage(ID) {
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
                case "5":
                    ctx.fillStyle = "magenta";
                    break;
                case "6":
                    ctx.fillStyle = "cyan";
                    break;
                case "7":
                    ctx.fillStyle = "yellow";
                    break;
                case "8":
                    ctx.fillStyle = "orange";
                    break;
                case "9":
                    ctx.fillStyle = "pink";
                    break;
                case "S":
                    ctx.fillStyle = "black";
                    break;
                case "G":
                    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
                    break;
                default:
                    cancelAnimationFrame(ID);
                    alert("error : " + stage[i][j]);
                    document.location.reload();
                    break;
            }
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawDot() {
    ctx.beginPath();
    ctx.rect(dotX, dotY, dotSize, dotSize);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function moveDot() {
    if (pressA && !pressD) {
        collisionSide("a");
        dotX -= speed;
    }
    else if (!pressA && pressD) {
        collisionSide("d");
        dotX += speed;
    }
    if (pressW && jumpFlag && jumpTime < 40) {
        collisionUp();
        jumpTime++;
        dotY -= speed;
    }
    else {
        collisionDown();
        dotY += speed;
    }
}

function collisionDown() {
    if (!(dotY % 16)) {
        let posD = dotY / 16 + 1;
        let posL = Math.floor(dotX / 16);
        let posR = Math.floor((dotX + 15) / 16);
        switch (stage[posD][posL]) {
            case "0":
            case "S":
                switch (stage[posD][posR]) {
                    case "0":
                    case "S":
                        break;
                    case "1":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        jumpFlag = true;
                        dotY -= speed;
                        break;
                    default:
                        break;
                }
                break;
            case "1":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                jumpFlag = true;
                dotY -= speed;
                break;
            default:
                break;
        }
    }
}

function collisionUp() {
    if (!(dotY % 16)) {
        let posU = dotY / 16 - 1;
        let posL = Math.floor(dotX / 16);
        let posR = Math.floor((dotX + 15) / 16);
        switch (stage[posU][posL]) {
            case "0":
            case "S":
                switch (stage[posU][posR]) {
                    case "0":
                    case "S":
                        break;
                    case "1":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        jumpFlag = false;
                        dotY += speed;
                        break;
                    default:
                        break;
                }
                break;
            case "1":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                jumpFlag = false;
                dotY += speed;
                break;
            default:
                break;
        }
    }
}

function collisionSide() {
    if (!(dotX % 16)) {
        let posS = dotX / 16 - 1;
        let fixSpeed = speed;
        if (pressD) {
            posS = dotX / 16 + 1;
            fixSpeed = -speed;
        }
        let posU = Math.floor(dotY / 16);
        let posD = Math.floor((dotY + 15) / 16);
        switch (stage[posU][posS]) {
            case "0":
            case "S":
                switch (stage[posD][posS]) {
                    case "0":
                    case "S":
                        break;
                    case "1":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        dotX += fixSpeed;
                        break;
                    default:
                        break;
                }
                break;
            case "1":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                dotX += fixSpeed;
                break;
            default:
                break;
        }
    }
}

function collisionBG(ID) {
    let posLU = stage[Math.floor(dotY / 16)][Math.floor(dotX / 16)];
    let posRU = stage[Math.floor(dotY / 16)][Math.floor((dotX + 15) / 16)];
    let posLD = stage[Math.floor((dotY + 15) / 16)][Math.floor(dotX / 16)];
    let posRD = stage[Math.floor((dotY + 15) / 16)][Math.floor((dotX + 15) / 16)];
    if (posLU == "2" || posRU == "2" || posLD == "2" || posRD == "2") {
        dotX = dotXInit;
        dotY = dotYInit;
    }
    else if (posLU == "G" || posRU == "G" || posLD == "G" || posRD == "G") {
        cancelAnimationFrame(ID);
        alert("Clear!!");
        document.location.reload();
    }
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fileRead) {
        moveDot();
        collisionBG(requestID);
        drawStage(requestID);
        drawDot();
    }
}
draw();