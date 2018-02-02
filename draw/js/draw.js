'use strict';

const canvasTag = document.getElementById('draw');
const canvas = canvasTag.getContext('2d');
let draw = false, hue = 0;
let width, height, x, y, lineWidth = 100, inc = true;
setSizeCanvas();

window.addEventListener('resize', () => {
  draw = false;
  canvas.clearRect(0, 0, width, height);
  setSizeCanvas();
});

function setSizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvasTag.width = width;
  canvasTag.height = height;
}

canvasTag.addEventListener('mousedown', (event) => {
  if (!draw && (event.buttons & 1) === 1) {
    draw = true;
    x = event.offsetX;
    y = event.offsetY;
  }
});

canvasTag.addEventListener('mouseleave', notDraw);
canvasTag.addEventListener('mouseup', notDraw);
canvasTag.addEventListener('dblclick', () => {
  notDraw();
  canvas.clearRect(0, 0, canvasTag.width, canvasTag.height);
});

canvasTag.addEventListener('mousemove', (event) => {
  if (draw) {

    if (draw) {
      if (event.shiftKey && hue !== 0) {
        hue--;
      } else if (hue !== 359) {
        hue++;
      }
    }

    if (inc && lineWidth === 100) {
      inc = false;
    } else if (!inc && lineWidth === 5) {
      inc = true;
    }

    if (inc) {
      lineWidth++;
    } else {
      lineWidth--;
    }



    canvas.fillStyle = `hsl(${hue}, 100%, 50%)`;
    canvas.lineJoin = 'radius';
    canvas.lineCap = 'radius';

    canvas.beginPath();
    canvas.arc(event.offsetX, event.offsetY, lineWidth / 2, 0, Math.PI *2);
    canvas.fill();

    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineWidth = lineWidth;
    canvas.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    canvas.quadraticCurveTo(event.offsetX, event.offsetY, event.offsetX , event.offsetY);
    canvas.stroke();
    x = event.offsetX;
    y = event.offsetY;
  }
});

function notDraw () {
  draw = false;
  hue = 0;
  lineWidth = 100;
  inc = true;
}