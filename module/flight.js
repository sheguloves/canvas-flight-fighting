class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default class Flight {
  constructor(canvas) {
    this.canvas = canvas;
    this.position = new Position(canvas.width / 2, canvas.height - 48);
    this.context = canvas.getContext('2d');
    this.img = new Image();
    this.drawFlight();
    this.addListener();
  }

  keyMap = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
  };

  drawFlight() {
    this.img.src = './assets/flight.png';
    this.img.onload = () => {
      this.context.drawImage(this.img, this.position.x, this.position.y, 48, 48);
      this.refresh();
    }
  }

  clearPrevious() {
    this.context.clearRect(this.position.x, this.position.y, 48, 48);
  }

  move(offsetX, offsetY) {
    let x = this.position.x + offsetX > 0 ? this.position.x + offsetX : 0;
    x = x > (this.canvas.width - 48) ? (this.canvas.width - 48) : x;
    this.position.x = x;

    let y = this.position.y + offsetY > 0 ? this.position.y + offsetY : 0;
    y = y > (this.canvas.height - 48) ? (this.canvas.height - 48) : y;
    this.position.y = y;
  }

  eventHandler(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      this.keyMap[event.key] = event.type === 'keydown';
    }
  }

  addListener() {
    document.addEventListener('keydown', this.eventHandler.bind(this));
    document.addEventListener('keyup', this.eventHandler.bind(this));
  }

  syncPosition() {
    let offsetX = 0;
    let offsetY = 0;
    if (this.keyMap.ArrowDown) {
      offsetY += 10;
    }
    if (this.keyMap.ArrowUp) {
      offsetY += -10;
    }
    if (this.keyMap.ArrowLeft) {
      offsetX += -10;
    }
    if (this.keyMap.ArrowRight) {
      offsetX += 10;
    }
    this.move(offsetX, offsetY);
  }

  refresh() {
    this.clearPrevious();
    this.syncPosition();
    this.context.drawImage(this.img, this.position.x, this.position.y, 48, 48);
    requestAnimationFrame(this.refresh.bind(this));
  }

}

