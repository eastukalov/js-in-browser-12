'use strict';
const canvasTag = document.getElementsByTagName('canvas')[0];
canvasTag.width = canvasTag.offsetWidth;
canvasTag.height = canvasTag.offsetHeight;
const canvas = canvasTag.getContext('2d');
const minStar = 200;
const maxStar = 400;
const colorStars = ['#ffffff', '#ffe9c4', '#d4fbff'];

function drowStars() {
  const countStars = Math.floor(minStar + Math.random() * (maxStar + 1 - minStar));
  canvasTag.style.backgroundColor = 'black';

  for(let star = 0; star < countStars; star++) {
    canvas.beginPath();
    let x = Math.floor(Math.random() * (canvasTag.width + 1));
    let y = Math.floor(Math.random() * (canvasTag.height + 1));
    let radius = Math.random() * 1.1;

    canvas.fillStyle = colorStars[Math.floor(Math.random() * 3)];
    canvas.strokeStyle = 'white';
    canvas.globalAlpha = 0.8 + Math.random() * 0.2;
    canvas.arc(x, y, radius, 0, 2 * Math.PI);
    canvas.fill();
  }
}

drowStars();

canvasTag.addEventListener('click', (event) => {
  canvas.clearRect(0 , 0, event.currentTarget.width, event.currentTarget.height);
  drowStars();
});