const stageSize = 40;
const dotSize = 16;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var speed = 2;
var frame = 0;
var stage = [];
var stageInit = [];
var temp = [];
var stageFile = document.getElementById('file');
var fileRead = 0;
var startCount = 0;
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
var jumpPad = 0;
var riseFlag = false;

function keyDownHandler(e) {
    switch (e.key) {
        case "p":
            let stageText = "";
            for (let i = 0; i < stageSize; i++) {
                for (let j = 0; j < stageSize; j++) {
                    stageText += stage[i][j].block;
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
        case "r":
            stageChange = "R";
            break;
        case "t":
            stageChange = "T";
            break;
        case "j":
            stageChange = "J";
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
        case "r":
        case "t":
        case "j":
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
            stage[mouseY][mouseX].block = "0";
        }
    }
}
function mouseMoveHandler(e) {
    if (fileRead && stageChange != "" && e.offsetX != e.clientX && e.offsetY != e.client) {
        let mouseX = (e.offsetX - e.offsetX % dotSize) / dotSize;
        let mouseY = (e.offsetY - e.offsetY % dotSize) / dotSize;
        if (mouseX >= 0 && mouseX < stageSize && mouseY >= 0 && mouseY < stageSize) {
            stage[mouseY][mouseX].block = stageChange;
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
                    stageInit[i] = [];
                    temp[i] = [];
                    for (let j = 0; j < stageSize; j++) {
                        stage[i][j] = {};
                        stageInit[i][j] = {};
                        temp[i][j] = {};
                        stage[i][j]["block"] = str.charAt(i * stageSize + j);
                        stage[i][j]["exist"] = (stage[i][j].block == "7") ? 0 : 1;
                        stageInit[i][j] = { ...stage[i][j] };
                        if (stage[i][j].block == "S") {
                            startCount++;
                            dotX = j * dotSize;
                            dotY = i * dotSize;
                            dotXInit = dotX;
                            dotYInit = dotY;
                        }
                    }
                }
                if (startCount != 1) alert("error : Start");
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

function resetStage(flag) {
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
            if (!flag) {
                dotX = dotXInit;
                dotY = dotYInit;
                stage[i][j] = { ...stageInit[i][j] };
            }
            else if (stage[i][j].block == "8" || stage[i][j].block == "9") stage[i][j].exist = 0;
        }
    }
}

function drawStage(ID) {
    for (let i = 0; i < stageSize; i++) {
        for (let j = 0; j < stageSize; j++) {
            let block = "";
            ctx.beginPath();
            ctx.rect(j * dotSize, i * dotSize, dotSize, dotSize);
            block += stage[i][j].exist ? stage[i][j].block : "0";
            switch (block) {
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
                case "R":
                    ctx.fillStyle = "#622d18";
                    break;
                case "T":
                    ctx.fillStyle = "#043c78";
                    break;
                case "J":
                    ctx.fillStyle = "#47266e";
                    break;
                default:
                    cancelAnimationFrame(ID);
                    alert("error : " + stage[i][j].block);
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
    if (pressW && jumpFlag && jumpTime < 40 && !jumpPad && !riseFlag) {
        collisionUp();
        jumpTime++;
        dotY -= speed;
    }
    else if (jumpPad > 0 && jumpPad <= 80 && !riseFlag) {
        jumpPad++;
        collisionUp();
        dotY -= speed;
    }
    else if (riseFlag) {
        collisionUp();
        dotY -= speed;
    }
    else {
        jumpPad = 0;
        collisionDown();
        dotY += speed;
    }
}

function collisionDown() {
    if (!(dotY % 16)) {
        let posD = dotY / 16 + 1;
        let posL = Math.floor(dotX / 16);
        let posR = Math.floor((dotX + 15) / 16);
        let posDLR = "";
        posDLR += stage[posD][posL].exist ? stage[posD][posL].block : "0";
        posDLR += stage[posD][posR].exist ? stage[posD][posR].block : "0";
        switch (posDLR) {
            case "TT":
            case "T0":
            case "0T":
            case "T1":
            case "1T":
            case "T2":
            case "2T":
            case "01":
            case "10":
            case "11":
            case "12":
            case "21":
            case "S1":
            case "1S":
            case "G1":
            case "1G":
            case "34":
            case "43":
            case "6T":
            case "60":
            case "61":
            case "62":
            case "66":
            case "T6":
            case "06":
            case "16":
            case "26":
            case "7T":
            case "70":
            case "71":
            case "72":
            case "76":
            case "77":
            case "T7":
            case "07":
            case "17":
            case "27":
            case "67":
            case "9T":
            case "90":
            case "91":
            case "92":
            case "96":
            case "97":
            case "99":
            case "T9":
            case "09":
            case "19":
            case "29":
            case "69":
            case "79":
                jumpFlag = true;
                jumpTime = 0;
                dotY -= speed;
                break;
            case "03":
            case "30":
            case "13":
            case "31":
            case "23":
            case "32":
            case "3S":
            case "S3":
            case "3G":
            case "G3":
            case "33":
            case "3T":
            case "T3":
            case "36":
            case "63":
            case "37":
            case "73":
            case "39":
            case "93":
                jumpFlag = true;
                jumpTime = 0;
                dotY -= speed;
                dotX -= speed;
                break;
            case "04":
            case "40":
            case "14":
            case "41":
            case "24":
            case "42":
            case "S4":
            case "4S":
            case "4G":
            case "G4":
            case "44":
            case "4T":
            case "T4":
            case "46":
            case "64":
            case "47":
            case "74":
            case "49":
            case "94":
                jumpFlag = true;
                jumpTime = 0;
                dotY -= speed;
                dotX += speed;
                break;
            case "05":
            case "50":
            case "15":
            case "51":
            case "25":
            case "52":
            case "35":
            case "53":
            case "45":
            case "54":
            case "S5":
            case "5S":
            case "G5":
            case "5G":
            case "55":
            case "5T":
            case "T5":
            case "56":
            case "65":
            case "57":
            case "75":
            case "59":
            case "95":
                jumpPad++;
                dotY -= speed;
                break;
            default:
                jumpFlag = false;
                break;
        }
    }
}

function collisionUp() {
    if (!(dotY % 16)) {
        let posU = dotY / 16 - 1;
        let posL = Math.floor(dotX / 16);
        let posR = Math.floor((dotX + 15) / 16);
        let posUL = stage[posU][posL].exist ? stage[posU][posL].block : "0";
        let posUR = stage[posU][posR].exist ? stage[posU][posR].block : "0";
        switch (posUL) {
            case "0":
            case "S":
            case "T":
                switch (posUR) {
                    case "0":
                    case "S":
                    case "T":
                        break;
                    case "1":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "9":
                        jumpTime = 40;
                        jumpFlag = false;
                        jumpPad = 0;
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
            case "9":
                jumpTime = 40;
                jumpFlag = false;
                jumpPad = 0;
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
        let posUS = stage[posU][posS].exist ? stage[posU][posS].block : "0";
        let posDS = stage[posD][posS].exist ? stage[posD][posS].block : "0";
        let posUDS = posUS + posDS;
        for (let i = 1; i < 10; i++) {
            if (i == 2 || i == 8) continue;
            if (posUDS.indexOf(String(i)) != -1) {
                dotX += fixSpeed;
                break;
            }
        }
    }
}

function collisionBG(ID) {
    let posEdge
        = stage[Math.floor(dotY / 16)][Math.floor(dotX / 16)].block
        + stage[Math.floor(dotY / 16)][Math.floor((dotX + 15) / 16)].block
        + stage[Math.floor((dotY + 15) / 16)][Math.floor(dotX / 16)].block
        + stage[Math.floor((dotY + 15) / 16)][Math.floor((dotX + 15) / 16)].block;
    let posEdgeState
        = String(stage[Math.floor(dotY / 16)][Math.floor(dotX / 16)].exist)
        + String(stage[Math.floor(dotY / 16)][Math.floor((dotX + 15) / 16)].exist)
        + String(stage[Math.floor((dotY + 15) / 16)][Math.floor(dotX / 16)].exist)
        + String(stage[Math.floor((dotY + 15) / 16)][Math.floor((dotX + 15) / 16)].exist);
    if (posEdge.indexOf("6") != -1 || posEdge.indexOf("7") != -1) {
        for (let i = 0; i < 4; i++) {
            let judge = posEdge.substring(i, i + 1) + posEdgeState.substring(i, i + 1);
            if (judge == "61" || judge == "71") {
                resetStage(0);
                break;
            }
        }
    }
    if (posEdge.indexOf("2") != -1) resetStage(0);
    else if (posEdge.indexOf("8") != -1) resetStage(1);
    else if (posEdge.indexOf("R") != -1) {
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) temp[39 - i][39 - j] = { ...stage[i][j] };
        }
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) stage[i][j] = { ...temp[i][j] };
        }
    }
    else if (posEdge.indexOf("G") != -1) {
        cancelAnimationFrame(ID);
        alert("Clear!!");
        document.location.reload();
    }
    if (posEdge.indexOf("T") != -1) {
        jumpFlag = true;
        jumpTime = 0;
        riseFlag = true;
    }
    else if (posEdge.indexOf("T") == -1) riseFlag = false;
    if (posEdge.indexOf("J") != -1) {
        jumpFlag = true;
        jumpTime = 39;
    }
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (fileRead) {
        if (!(frame % 90)) {
            for (let i = 0; i < 40; i++) {
                for (let j = 0; j < 40; j++) {
                    if (stage[i][j].block == "6" || stage[i][j].block == "7") stage[i][j].exist ^= 1;
                }
            }
        }
        moveDot();
        collisionBG(requestID);
        drawStage(requestID);
        drawDot();
        frame++;
    }
}
draw();