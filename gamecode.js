var mapWidth = 10;
var mapHeight = 10;

var playerX = 2;
var playerY = 2;

var gameAreaWidth = 0;
var gameAreaHeight = 0;
var sqaureWidth = 0;
var sqaureHeight = 0;

var playerHealth = 100;
var maxHealth = 100;

var maps = []

cmap = 0;

maps[0] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

maps[1] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

maps[2] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var map = maps[cmap];

var keys = []

var gameCode = 0;
var ctx = 0;
var c=0;

function gameInit() {
  c = document.getElementById("gameArea");
  gameCode = document.getElementById("gameCodeArea");
  ctx = c.getContext("2d");
  gameAreaWidth = c.width;
  gameAreaHeight = c.height;
  sqaureWidth = gameAreaWidth / mapWidth;
  sqaureHeight = gameAreaHeight / mapHeight;
  setInterval(gameLoop, 10);
}

function gameLoop() {
  sqaureWidth = gameAreaWidth / mapWidth;
  sqaureHeight = gameAreaHeight / mapHeight;
  ctx.clearRect(0, 0, c.width, c.height);
  for (var i=0;i<mapHeight;i++) {
    for (var j=0;j<mapWidth;j++) {
      if (map[i][j] == 1) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(j * sqaureWidth, i * sqaureHeight, sqaureWidth, sqaureHeight);
        ctx.fill();
      } else if (map[i][j] == 2) {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.rect(j * sqaureWidth, i * sqaureHeight, sqaureWidth, sqaureHeight);
        ctx.fill();
      }
    }
  }
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.rect(playerX * sqaureWidth, playerY * sqaureHeight, sqaureWidth, sqaureHeight);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.rect(296, 0, (100 / maxHealth) * playerHealth, 20);
  ctx.fill();
  ctx.beginPath()
  ctx.lineWidth = "4";
  ctx.strokeStyle = "blue";
  ctx.rect(292, 0, 104, 20);
  ctx.stroke()
  
}

function runCode() {
  if (playerHealth > 0) {
    eval(gameCode.value);
  }
}

function moveRight(x) {
  for (var z=0;z<x;z++) {
    playerX+=1;
    if (collide(playerY, playerX)) {
      playerX-=1;
    }
  }
}
function moveLeft(x) {
  for (var z=0;z<x;z++) {
    playerX-=1;
    if (collide(playerY, playerX)) {
      playerX+=1;
    }
  }
}
function moveDown(x) {
  for (var z=0;z<x;z++) {
    playerY+=1;
    if (collide(playerY, playerX)) {
      playerY-=1;
    }
  }
}
function moveUp(x) {
  for (var z=0;z<x;z++) {
    playerY-=1;
    if (collide(playerY, playerX)) {
      playerY+=1;
    }
  }
}

function collide(x, y) {
  if (map[y][x] == 1) {
    playerHealth -= 1;
    return true;
  } else if (map[y][x] == 2) {
    cmap += 1;
    map = maps[cmap];
    playerX = 2;
    playerY = 2;
    return true;
  }
  return false;
}
