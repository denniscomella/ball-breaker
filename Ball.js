const c = document.getElementById('canvas1').getContext('2d', {
  alpha: false
});

let randomChoice = arr => arr[Math.floor(arr.length * Math.random())];

export class Ball {
  constructor(x, y, z = 0) {
    let red = [255, 0, 0];
    let green = [0, 255, 0];
    let blue = [0, 0, 255];
    let yellow = [255, 255, 0];
    let cyan = [0, 255, 255];
    let magenta = [255, 0, 255];

    let difficulty = 5;
    this.x = x;
    this.y = y;
    this.color = randomChoice([red, green, blue, yellow, cyan, magenta].slice(0, difficulty));
    this.selected = false;
    this.radius = 20;
  }

  draw(i = null, j = null) {
    let padding = 50;
    let x = 125;
    let y = 125;
    if (i != null && j != null) {
      [this.y, this.x] = [i * 50 + padding, j * 50 + padding]
    }
    let color = [];

    c.beginPath();
    c.fillStyle = `rgb(${this.color[0]/2}, ${this.color[1]/2}, ${this.color[2]/2})`
    c.strokeStyle = 'black';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.stroke();
    c.fill();
    c.closePath();

    for (let i = 0; i < 10; i++) {
      c.beginPath();
      c.fillStyle = `rgba(${this.color[0]+i*20}, ${this.color[1]+i*20}, ${this.color[2]+i*20}, ${i/10+.1})`
      c.arc(this.x + this.radius * i / 30, this.y - this.radius * i / 30, this.radius * (10 - i) / 12, 0, Math.PI * 2);
      c.fill();
      c.closePath();
    }
  }
}
