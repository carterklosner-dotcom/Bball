const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

// Player setup (3v3)
let players = [
  {x:100,y:250,color:"blue"},
  {x:150,y:200,color:"blue"},
  {x:150,y:300,color:"blue"},
  {x:800,y:250,color:"red"},
  {x:750,y:200,color:"red"},
  {x:750,y:300,color:"red"},
];

let ball = {x:100,y:250};
let score = 0;

// Shot meter
let shooting = false;
let shotPower = 0;
let shotDirection = 1;

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === " ") shooting = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    shooting = false;
    shootBall();
    shotPower = 0;
  }
});

// Shooting logic
function shootBall() {
  // Green zone = middle (40–60)
  if (shotPower > 40 && shotPower < 60) {
    score += 2;
    alert("GREEN! Score!");
  } else {
    alert("Miss!");
  }
}

// Update shot meter
function updateShotMeter() {
  if (shooting) {
    shotPower += shotDirection * 2;

    if (shotPower >= 100 || shotPower <= 0) {
      shotDirection *= -1;
    }
  }
}

// Draw court
function drawCourt() {
  ctx.fillStyle = "#c68642";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // center line
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,0);
  ctx.lineTo(canvas.width/2,canvas.height);
  ctx.stroke();
}

// Draw players
function drawPlayers() {
  players.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,10,0,Math.PI*2);
    ctx.fill();
  });
}

// Draw ball
function drawBall() {
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(ball.x,ball.y,6,0,Math.PI*2);
  ctx.fill();
}

// Draw shot meter
function drawShotMeter() {
  if (shooting) {
    let meterWidth = 200;
    let x = canvas.width/2 - meterWidth/2;
    let y = canvas.height - 50;

    // red background
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,meterWidth,20);

    // green middle zone
    ctx.fillStyle = "green";
    ctx.fillRect(x + meterWidth*0.4, y, meterWidth*0.2, 20);

    // moving bar
    ctx.fillStyle = "white";
    ctx.fillRect(x + (shotPower/100)*meterWidth, y, 5, 20);
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawCourt();
  drawPlayers();
  drawBall();
  drawShotMeter();

  updateShotMeter();

  requestAnimationFrame(gameLoop);
}

gameLoop();
