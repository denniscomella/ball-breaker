import {
  myGameArea,
} from './canvas.js'
import {
  getGrid,
  setSelected,
  removeSelected,
} from './ballgrid.js'


export function startGame() {
  myGameArea.start();
}


var elem = document.getElementById('canvas1'),
  elemLeft = elem.offsetLeft + elem.clientLeft,
  elemTop = elem.offsetTop + elem.clientTop,
  context = elem.getContext('2d'),
  elements = [];

// Add event listener for `click` events.
elem.addEventListener('click', function(event) {
  var clickX = event.pageX - elemLeft,
    clickY = event.pageY - elemTop;
  // console.log(x,y);
  let balls = getGrid();
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls[i].length; j++) {
      let ball = balls[i][j];
      if (Math.pow(clickX - ball.x, 2) + Math.pow(clickY - ball.y, 2) <= Math.pow(ball.radius, 2)) {
        console.log('hit!');
        if (balls[i][j].selected){
          removeSelected();
        }
        else setSelected(j, i); // x, y
        break;
      }
    }
  }
});

document.onkeypress = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  // console.log(charCode,charStr);
  let dx;
  let dy;
  // alert(charStr);
  if (charStr === ' ' && !myGameArea.playing) {
    myGameArea.reset();
    // something happens when you hit spacebar
  } else if (charStr === 'a') { // strafe left
    dx = -.1 * Math.cos(myHero.angle * Math.PI / 180)
    dy = +.1 * Math.sin(myHero.angle * Math.PI / 180);
    myHero.setSpeed(dx, dy);
  } else if (charStr === 's') { // walk back
    dx = -.1 * Math.sin(myHero.angle * Math.PI / 180);
    dy = -.1 * Math.cos(myHero.angle * Math.PI / 180);
    myHero.setSpeed(dx, dy);
  } else if (charStr === 'd') { // strafe right
    dx = +.1 * Math.cos(myHero.angle * Math.PI / 180);
    dy = -.1 * Math.sin(myHero.angle * Math.PI / 180);
    myHero.setSpeed(dx, dy);
  } else if (charStr === 'w') { // walk forward
    dx = +.1 * Math.sin(myHero.angle * Math.PI / 180)
    dy = +.1 * Math.cos(myHero.angle * Math.PI / 180)
    myHero.setSpeed(dx, dy);
  } else if (charStr === 'q') { // turn left
    myHero.dAngle = -5;
  } else if (charStr === 'e') { // turn right
    myHero.dAngle = 5;
  }
};

document.onkeyup = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);
  // console.log(charCode,charStr);
  // alert(charStr);
  if (charStr === ' ') {
    // something happens when you release the spacebar
  } else if (charStr === 'Q') { // turn left
    myHero.dAngle = 0;
  } else if (charStr === 'E') { // turn right
    myHero.dAngle = 0;
  } else {
    myHero.setSpeed(0, 0);

  }
};
