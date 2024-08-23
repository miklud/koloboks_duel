// ===
// constants
// ===
const BULLET_RADIUS = 10;
const MIN_X_VELOCITY = 10;
const INCLINE_ARR = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];

// ===
// module vars
// ===
let bulletIDs = -1;

// ===
// main
// ===
export default class JSBullet {
  // id: "left" | "right"

  constructor({ ctx, radius, id, maxX, maxY, bulletCoord, color }) {
    this.ctx = ctx;
    this.x =
      id === "left"
        ? bulletCoord.x + radius + BULLET_RADIUS
        : bulletCoord.x - radius - BULLET_RADIUS;
    this.y = bulletCoord.y;

    this.maxX = maxX;
    this.maxY = maxY;
    this.dx = id === "left" ? Math.random() * 10 : -Math.random() * 10;
    this.dx =
      Math.abs(this.dx) < MIN_X_VELOCITY
        ? this.dx * (MIN_X_VELOCITY / Math.abs(this.dx))
        : this.dx;
    const incline =
      INCLINE_ARR[Math.floor((Math.random() * 10) % INCLINE_ARR.length)];
    this.dy = Math.floor((Math.random() * 10) % 3)
      ? 0
      : Math.floor(Math.random() * 10) % 2
      ? this.dx / incline
      : -this.dx / incline;
    this.radius = BULLET_RADIUS;
    this.id = id;
    this.bulletID = ++bulletIDs;
    this.color = color;
  }

  setPause() {
    this.dx = 0;
    this.dy = 0;
  }

  restore(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    this.render();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.fill();

    this.x += this.dx;
    this.y += this.dy;
  }

  getID() {
    return this.id;
  }
}
