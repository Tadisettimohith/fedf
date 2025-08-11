const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bullets = [];
let enemies = [];
let score = 0;

// Load images
const shooterImg = new Image();
shooterImg.src = "assets/shooter.png";

const bulletImg = new Image();
bulletImg.src = "assets/bullet.png";

const enemyImg = new Image();
enemyImg.src = "assets/enemy.png";

// Load sound
const shootSound = new Audio("assets/shoot.mp3");

// Shooter
const shooter = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 120,
  width: 100,
  height: 100,
};

// Bullet constructor
function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 10;
}

function Enemy(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 3;
}

// Handle shooting
window.addEventListener("click", () => {
  bullets.push(new Bullet(shooter.x + 40, shooter.y));
  shootSound.currentTime = 0;
  shootSound.play();
});

// Game Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(shooterImg, shooter.x, shooter.y, shooter.width, shooter.height);

  // Draw bullets
  bullets.forEach((b, i) => {
    ctx.drawImage(bulletImg, b.x, b.y, 20, 40);
    b.y -= b.speed;
    if (b.y < 0) bullets.splice(i, 1);
  });

  // Draw enemies
  enemies.forEach((e, ei) => {
    ctx.drawImage(enemyImg, e.x, e.y, 80, 80);
    e.y += e.speed;

    // Check collision
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + 60 &&
        b.x + 20 > e.x &&
        b.y < e.y + 60 &&
        b.y + 20 > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });

    if (e.y > canvas.height) enemies.splice(ei, 1);
  });

  // Draw score
  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  requestAnimationFrame(draw);
}

// Spawn enemies
setInterval(() => {
  const x = Math.random() * (canvas.width - 80);
  enemies.push(new Enemy(x, -100));
}, 1000);

// Move shooter with mouse
canvas.addEventListener("mousemove", (e) => {
  shooter.x = e.clientX - shooter.width / 2;
});

draw();
