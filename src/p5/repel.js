export class Repeller {
  constructor(_p5, _x, _y, _mass = 100) {
    this.p5 = _p5;
    this.mass = _mass;
    this.pos = this.p5.createVector(_x, _y);
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(180);
    this.p5.circle(this.pos.x, this.pos.y, this.mass);
  }

  repel(bubble) {
    if (!bubble.burst) {
      let force = this.p5.constructor.Vector.sub(this.pos, bubble.pos);
      let distSq = this.p5.constrain(force.magSq(), 30, 200);
      let G = 0.7;
      let strength = (G * (this.mass * bubble.mass)) / distSq;
      // let strength = G / distSq;
      force.setMag(strength * -1);
      bubble.applyForce(force);
    }
  }
}
