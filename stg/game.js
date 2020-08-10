const playerSize = 4;
const bossSize = 40;
const bulletSize = 6;
const moveSpeed = 4;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var px = canvas.width / 2;
var py = canvas.height * 7 / 8;
var ex = canvas.width / 2;
var ey = canvas.height / 8;
var pressW = false;
var pressA = false;
var pressS = false;
var pressD = false;
var pressC = false;
var slowMove = false;
var bullets = 0;
var bullet = [];

function keyDownHander(e) {
    switch (e.key) {
        case "w":
        case "W":
            pressW = true;
            break;
        case "a":
        case "A":
            pressA = true;
            break;
        case "s":
        case "S":
            pressS = true;
            break;
        case "d":
        case "D":
            pressD = true;
            break;
        case "c":
        case "C":
            pressC = true;
            break;
        case "Shift":
            slowMove = true;
            break;
        default:
            break;
    }
}

function keyUpHander(e) {
    switch (e.key) {
        case "w":
        case "W":
            pressW = false;
            break;
        case "a":
        case "A":
            pressA = false;
            break;
        case "s":
        case "S":
            pressS = false;
            break;
        case "d":
        case "D":
            pressD = false;
            break;
        case "c":
        case "C":
            pressC = false;
            break;
        case "Shift":
            slowMove = false;
            break;
        default:
            break;
    }
}
document.addEventListener("keydown", keyDownHander, false);
document.addEventListener("keyup", keyUpHander, false);

function diagonalJudge() {
    if (pressW) {
        if (pressA) return true;
        else if (pressD) return true;
        else return false;
    }
    else if (pressS) {
        if (pressA) return true;
        else if (pressD) return true;
        else return false;
    }
}

function movePlayer() {
    if (pressW) {
        if (py > playerSize)
            py -= moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
    }
    if (pressA) {
        if (px > playerSize)
            px -= moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
    }
    if (pressS) {
        if (py < canvas.height - playerSize)
            py += moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
    }
    if (pressD) {
        if (px < canvas.width - playerSize)
            px += moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
    }
}

function drawBoss() {
    ctx.beginPath();
    ctx.rect(ex - bossSize / 2, ey - bossSize / 2, bossSize, bossSize);
    ctx.fillStyle = "purple";
    ctx.fill();
}

function drawPlayer() {
    ctx.beginPath();
    ctx.moveTo(px, py - 20);
    ctx.lineTo(px + 10, py + 10);
    ctx.lineTo(px - 10, py + 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py, playerSize, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();
}

function createBullet() {
    if (pressC) {
        bullets++;
        bullet.push({
            x: ex,
            y: ey,
            angle: Math.PI * Math.random() * 2,
            speed: Math.random() * 2 + 1
        });
    }
}

function drawBullet() {
    for (let i = 0; i < bullets; i++) {
        bullet[i].x += Math.cos(bullet[i].angle) * bullet[i].speed;
        bullet[i].y += Math.sin(bullet[i].angle) * bullet[i].speed;
        ctx.beginPath();
        ctx.arc(bullet[i].x, bullet[i].y, bulletSize, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function deleteBullet() {
    for (let i = 0; i < bullets; i++) {
        if (bullet[i].x > canvas.width + 20) {
            bullet.splice(i, 1);
            bullets--;
            i--;
        }
        else if (bullet[i].x < -20) {
            bullet.splice(i, 1);
            bullets--;
            i--;
        }
        else if (bullet[i].y > canvas.height + 20) {
            bullet.splice(i, 1);
            bullets--;
            i--;
        }
        else if (bullet[i].y < -20) {
            bullet.splice(i, 1);
            bullets--;
            i--;
        }
    }
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    createBullet();
    deleteBullet();
    drawBoss();
    drawPlayer();
    drawBullet();

} draw();