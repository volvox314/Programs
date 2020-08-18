const playerSize = 2;
const bossSize = 40;
const moveSpeed = 4;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var px = canvas.width / 2;
var py = canvas.height * 7 / 8;
var ex = canvas.width / 2;
var ey = canvas.height / 8;
var bCount = 0;
var score = 0;
var pressW = false;
var pressA = false;
var pressS = false;
var pressD = false;
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
        else
            py = playerSize;
    }
    if (pressA) {
        if (px > playerSize)
            px -= moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
        else
            px = playerSize;
    }
    if (pressS) {
        if (py < canvas.height - playerSize)
            py += moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
        else
            py = canvas.height - playerSize;
    }
    if (pressD) {
        if (px < canvas.width - playerSize)
            px += moveSpeed / (diagonalJudge() ? Math.sqrt(2) : 1) / (slowMove ? 2 : 1);
        else
            px = canvas.width - playerSize;
    }
}

function moveBoss() {
    ex = canvas.width / 2 - 180 * Math.sin(Math.PI * bCount / 60);
    ey = canvas.height / 2 - 300 * (Math.cos(Math.PI * bCount / 150));
    bCount++;
}

function drawBoss() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(ex, ey);
    ctx.rotate(bCount * Math.PI / 20);
    ctx.translate(-ex, -ey);
    ctx.fillStyle = "purple";
    ctx.rect(ex - bossSize / 2, ey - bossSize / 2, bossSize, bossSize);
    ctx.fill();
    ctx.restore();
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

function createBullet(s = 1, a = Math.random()) {
    bullets++;
    bullet.push({
        x: ex,
        y: ey,
        angle: Math.PI * 2 * a,
        speed: Math.random() + s,
        size: 6 + Math.floor(bCount / 300)
    });
}

function collisionBullet(ID) {
    for (let i = 0; i < bullets; i++) {
        let dx = Math.abs(px - bullet[i].x);
        let dy = Math.abs(py - bullet[i].y);
        if (Math.sqrt(dx * dx + dy * dy) < playerSize + bullet[i].size) {
            ctx.font = "Bold 120px MS Mincho";
            ctx.fillStyle = "red";
            ctx.fillText("草", canvas.width / 2 - 60, canvas.height / 2);
            ctx.font = "Bold 14px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("W  A  R  O  T  A", canvas.width / 2 - 50, canvas.height / 2 + 36);
            cancelAnimationFrame(ID);
        }
    }
}

function drawBullet() {
    for (let i = 0; i < bullets; i++) {
        bullet[i].x += Math.cos(bullet[i].angle) * bullet[i].speed;
        bullet[i].y += Math.sin(bullet[i].angle) * bullet[i].speed;
        ctx.beginPath();
        ctx.arc(bullet[i].x, bullet[i].y, bullet[i].size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(80,80,80)";
        ctx.fill();
    }
}

function deleteBullet() {
    for (let i = 0; i < bullets; i++) {
        if (bullet[i].x > canvas.width + 10) {
            bullet.splice(i, 1);
            bullets--;
            i--;
            score++;
        }
        else if (bullet[i].x < -10) {
            bullet.splice(i, 1);
            bullets--;
            i--;
            score++;
        }
        else if (bullet[i].y > canvas.height + 10) {
            bullet.splice(i, 1);
            bullets--;
            i--;
            score++;
        }
        else if (bullet[i].y < -10) {
            bullet.splice(i, 1);
            bullets--;
            i--;
            score++;
        }
    }
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "Black";
    ctx.fill();

    movePlayer();
    moveBoss();
    createBullet();
    deleteBullet();
    drawBoss();
    drawPlayer();
    drawBullet();
    collisionBullet(requestID);
    ctx.font = "italic 16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score : " + score, 350, 20);

} draw();