import Flight from './module/flight.js';
import Targets from './module/target.js';

const canvas = document.getElementById('canvas');
let flight;
let targets;

function syncCanvasSize() {
  const container = document.getElementById('container');
  canvas.height = container.clientHeight - 10;
  canvas.width = container.clientWidth - 10;
}

function listenEvents() {
  window.addEventListener('resize', () => {
    syncCanvasSize();
  });
}


function main() {
  syncCanvasSize();
  listenEvents();
  flight = new Flight(canvas);
  targets = new Targets(canvas);
}

main();