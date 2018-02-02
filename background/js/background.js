'use strict';

const canvasTag = document.getElementById('wall');
canvasTag.width = canvasTag.offsetWidth;
canvasTag.height = canvasTag.offsetHeight;
const canvas = canvasTag.getContext('2d');
canvas.strokeStyle = 'white';
const shapes = Math.floor(50 + Math.random() * 151);
const countCircles = Math.round(shapes / 2);
const countCrosses = Math.round(shapes / 2);
let arrCircles = [];
let arrCrosses = [];

const functions = [
  (x, y, time) => {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    }
  },
  (x, y, time) => {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];

class Shape {

  constructor() {
    this.func = functions[Math.round(Math.random())];
    this.x = Math.floor(Math.random() * (canvasTag.width + 1));
    this.y = Math.floor(Math.random() * (canvasTag.height + 1));
    this.size = 0.1 + Math.random() * 0.5;
  }

  get pos() {
    return this.func(this.x, this.y, Date.now());
  }

  get thick() {
    return 5 * this.size;
  }
}

class Circle extends Shape {
  get radius() {
    return 12 * this.size;
  }

  paint() {
    canvas.beginPath();
    canvas.lineWidth = this.thick;
    canvas.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    canvas.stroke();
  }

}

class Cross extends Shape {
  constructor() {
    super();
    //радианы
    this.corner = Math.floor(Math.random() * 361) * Math.PI / 180;
  }

  get side() {
    return 20 * this.size;
  }

  paint() {
    this.rotate();
    canvas.beginPath();
    canvas.lineWidth = this.thick;
    canvas.moveTo(-this.side / 2, 0);
    canvas.lineTo(this.side / 2, 0);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(0, -this.side / 2);
    canvas.lineTo(0, this.side / 2);
    canvas.stroke();
    canvas.restore();
  }

  rotate() {
    canvas.save();
    const speed = this.speed;
    canvas.translate(this.pos.x, this.pos.y);
    canvas.rotate(this.corner + speed);
    this.corner += speed;
  }
//радианы
  get speed() {
    return (Math.random() * 0.4 - 0.2);
  }

}

for(let i=1; i<=countCircles; i++) {
  arrCircles.push(new Circle());
}

for(let i=1; i<=countCrosses; i++) {
  arrCrosses.push(new Cross());
}

if (!window.requestAnimationFrame) {

  window.requestAnimationFrame = (function() {

    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 20);
      };

  })();

}

animate();

function animate() {
  requestAnimationFrame(animate);
  draw();
}

function draw() {
  canvas.clearRect(0, 0, canvasTag.width, canvasTag.height);

  for(const circle of arrCircles) {
    circle.paint();
  }

  for(const cross of arrCrosses) {
    cross.paint();
  }
}
