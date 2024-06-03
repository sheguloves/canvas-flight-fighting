export class Target {
  constructor(canvas) {
    this.canvas = canvas;
    this.img = new Image();
    this.generateRandomPosition();
    this.drawTarget();
  }

  generateRandomPosition() {
    this.x = Math.random() * this.canvas.width;
    this.y = 0;
  }

  drawTarget() {
    this.img.src = './assets/heart.png';
    this.img.onload = () => {
      this.refresh();
    }
  }

  refresh() {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.img, this.x, this.y, 48, 48);
  }

  destroy() {
    const context = this.canvas.getContext('2d');
    context.clearRect(this.x, this.y, 48, 48);
  }
}

export default class Targets {
  constructor(canvas) {
    this.canvas = canvas;
    this.generateTarget();
    this.refresh();
  }
  speed = 20;
  targets = [];
  count = 0;

  generateTarget() {
    this.targets.push(new Target(this.canvas));
  }

  refresh() {
    this.count = this.count + 1;
    this.targets = this.targets.filter(item => {
      item.destroy();
      const y = item.y + 1;
      if (y > this.canvas.height) {
        return false;
      } else {
        item.y = y;
        item.refresh();
        return true;
      }
    });
    if (this.count > 100) {
      this.count = 0;
      this.generateTarget();
    }
    requestAnimationFrame(this.refresh.bind(this));
  }

}