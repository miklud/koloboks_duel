// ===
// import
// ===
import JSBullet from "./JSBullet";

// ===
// constants
// ===
const MARGIN = 10;
const SEC = 1000;
const DEFAULT = 5;
const COLORS = ["#b46034", "#3fa6cd"];
const SHOT_COLORS = ["#A9B535", "#BB3FCC"];

// ===
// main
// ===
export default class JSCircle {
  // id: "left" | "right"
  static velocities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  static bulletDelays = [1.5, 1, 0.7, 0.4, 0.2];
  static originRadius = 30;
  static recharge(circle) {
    window.setTimeout(() => (circle.isRecharged = true), circle.delay);
  }

  constructor({ ctx, radius, id, maxX, maxY }) {
    this.ctx = ctx;
    if (id === "left") {
      this.x = radius + MARGIN;
    } else {
      this.x = maxX - radius - MARGIN;
    }
    this.y = Math.random() * maxY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.sign = Math.random() - 0.5 < 0 ? -1 : 1;
    this.dy = this.sign * JSCircle.velocities[DEFAULT];
    this.radius = radius;
    this.id = id;
    this.color = id === "left" ? COLORS[0] : COLORS[1];
    this.bulletColor = this.color;
    this.isRecharged = true;
    this.delay = JSCircle.bulletDelays[2] * SEC;

    // this.timeout = this.timeout.bind(this);
  }

  setPause() {
    this.dy = 0;
    this.delay = Number.POSITIVE_INFINITY;
  }

  setRestore(dy, delay) {
    this.dy = dy;
    this.delay = delay;
  }

  setVelocity(num) {
    if (num < 1 || num > 10) throw new Error("Velocity not correct");
    this.dy = this.sign * JSCircle.velocities[num - 1];
  }

  setDelay(num) {
    const delaysArr = JSCircle.bulletDelays;
    if (num < 1 || num > 5) throw new Error("Bullets Frequency not correct");
    this.delay = delaysArr[num - 1] * SEC;
  }

  getShot() {
    this.color = this.id === "left" ? SHOT_COLORS[0] : SHOT_COLORS[1];
    this.radius = JSCircle.originRadius * 0.3333;
    new Promise((resolve) => {
      window.setTimeout(() => {
        this.radius = JSCircle.originRadius * 1.3333;
        resolve();
      }, 50);
    }).then(() => {
      window.setTimeout(() => {
        this.radius = JSCircle.originRadius;
        this.color = this.id === "left" ? COLORS[0] : COLORS[1];
      }, 50);
    });
  }

  changeDirection() {
    this.dy = -this.dy;
  }

  setBulletColor(color) {
    this.bulletColor = color;
  }

  fire() {
    let circlesArr = undefined;
    const bulletCoord = { x: this.x, y: this.y };

    if (this.isRecharged) {
      circlesArr = new JSBullet({
        ctx: this.ctx,
        radius: this.radius,
        id: this.id,
        maxX: this.maxX,
        maxY: this.maxY,
        bulletCoord,
        color: this.bulletColor,
      });

      this.timeout();
    }

    return circlesArr;
  }

  timeout() {
    this.isRecharged = false;
    JSCircle.recharge(this);
  }

  randomBool() {
    return Boolean((Math.random() * 10) % 2);
  }

  randomNum() {
    const sign = Math.random() - 0.5;
    const num = sign * 10;

    if (num + this.delay < 0) {
      return 0;
    }

    return num;
  }

  draw() {
    if (this.y + this.radius > this.maxY) {
      this.y = this.maxY - this.radius;
      this.dy = -this.dy;
      this.sign = this.sign === 1 ? -1 : 1;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.dy = -this.dy;
      this.sign = this.sign === 1 ? -1 : 1;
    }

    this.render();
  }

  getID() {
    return this.id;
  }

  getXY() {
    return [this.x, this.y];
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.fill();

    this.y += this.dy;
  }
}
