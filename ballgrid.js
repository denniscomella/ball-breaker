import {
  Ball,
} from './Ball.js';

const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});

function arraysEqual(a, b) {
  /*
      Array-aware equality checker:
      Returns whether arguments a and b are == to each other;
      however if they are equal-lengthed arrays, returns whether their
      elements are pairwise == to each other recursively under this
      definition.
  */
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length) // assert same length
      return false;
    for (var i = 0; i < a.length; i++) // assert each element equal
      if (!arraysEqual(a[i], b[i]))
        return false;
    return true;
  } else {
    return a == b; // if not both arrays, should be the same
  }
}

let balls = [];
let selected = [];
let score = 0;

function createGrid(w = 6, h = 5) {
  let row;
  for (let i = 0; i < w; i++) {
    row = []
    for (let j = 0; j < h; j++) {
      row.push(new Ball(50 * i + 50, 50 * j + 50));
    }
    balls.push(row);
  }
}

createGrid();

export function getGrid() {
  return balls;
}

export function drawGrid() {
  // highlights
  c.fillStyle = 'black';
  for (let coords of selected) {
    let [y, x] = coords;
    c.fillRect(x * 50 + 25, y * 50 + 25, 50, 50);
    c.fill();
  }
  // draw balls
  for (let y = 0; y < balls.length; y++) {
    for (let x = 0; x < balls[y].length; x++) {
      let ball = balls[y][x];
      ball.draw(x, y);
    }
  }
  // for (let row of balls) {
  //   for (let ball of row) {
  //     ball.draw();
  //   }
  // }
}

function checkAdj(i, j) {
  let connected = [];
  if (i > 0 && arraysEqual(balls[j][i - 1].color, balls[j][i].color) && !balls[j][i - 1].selected) {
    console.log('above')
    connected.push([i - 1, j]);
    balls[j][i - 1].selected = true;
  }
  if (i < balls[j].length - 1 && arraysEqual(balls[j][i + 1].color, balls[j][i].color) && !balls[j][i + 1].selected) {
    console.log('below')
    connected.push([i + 1, j]);
    balls[j][i + 1].selected = true;
  }
  if (j > 0 && arraysEqual(balls[j - 1][i].color, balls[j][i].color) && !balls[j - 1][i].selected) {
    console.log('left')
    connected.push([i, j - 1]);
    balls[j - 1][i].selected = true;
  }
  if (j < balls.length - 1 && arraysEqual(balls[j + 1][i].color, balls[j][i].color) && !balls[j + 1][i].selected) {
    console.log('right')
    connected.push([i, j + 1]);
    balls[j + 1][i].selected = true;
  }


  let newAdj = [];
  for (const newBall of connected) { // recursively check newly selected balls
    newAdj = newAdj.concat(checkAdj(...newBall));
  }
  connected = connected.concat(newAdj);
  return connected;
}

export function setSelected(i, j) {
  for (let coords of selected) {
    let [x, y] = coords;
    balls[y][x].selected = false;
  }
  selected = checkAdj(i, j);
}

export function removeSelected() {
  selected.sort();
  let len = balls[0].length;
  for (let i = selected.length-1; i>=0; i--){
    let [x,y] = selected[i];
    balls[y].splice(x,1);
    balls[y].push(new Ball(50 * len + 50, 50 * y + 50));
  }
  score += addScore(selected.length);
  selected = [];
}

function addScore(numberOfBalls) { // arithmetic sum of all whole numbers
  return (1 + numberOfBalls) * numberOfBalls / 2;
}

export function getScore(){
  return score;
}
