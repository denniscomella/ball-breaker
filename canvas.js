// import {
//   myHero,
// } from './hero.js';
// import {
//   drawMMap,
// } from './miniMap.js';
// import {
//   blocks,
// } from './map.js';
// import {
//   score,
//   cpuScore
// } from './objects.js';
// import {
//   npc1,
// } from './npc.js';
// import {
//   winTheme,
//   loseTheme,
// } from './audio.js';
import {
  drawGrid,
  getScore
} from './ballgrid.js';

export const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});


function updateGameArea() {
  if (myGameArea.playing) {
    myGameArea.clear();
  } else if (getScores()[0] >= 10) {
    myGameArea.clear();
    c.fillStyle = 'Black';
    c.font = '40px Arial';
    c.fillText('YOU WIN!', c.canvas.width / 2 - 140, c.canvas.height / 2 - 20);
    c.fillText('Hit [spacebar] to play again.', 40, c.canvas.height / 3*2);
  } else {
    myGameArea.clear();
    c.fillStyle = 'Black';
    c.font = '40px Arial';
    c.fillText('YOU LOSE!', c.canvas.width / 2 - 160, c.canvas.height / 2 - 20);
    c.fillText('Hit [spacebar] to play again.', 40, c.canvas.height / 3*2);
  }
}

export var myGameArea = {
  canvas: document.getElementById('canvas1'),
  start: function() {
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
    this.reset();
  },
  reset: function() {
    this.playing = true;
    // pass
  },
  endGame: function() {
    this.playing = false;
  },

  clear: function() {
    c.fillStyle = "Linen";

    var grd = c.createLinearGradient(0, 0, 0, c.canvas.height);
    grd.addColorStop(0, 'rgb(255,240,210)');
    grd.addColorStop(1, 'Linen');
    c.fillStyle = grd;

    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    drawGrid();
    c.fillStyle = 'Black';
    c.fillText('Score: ' + getScore(), c.canvas.width - 160, 20);

  },

}
