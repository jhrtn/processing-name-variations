import { processingColours } from './sketch';

export class Bubble {
  constructor(_p5, _x, _y, _size, _parent) {
    this.p5 = _p5;
    this.pos = this.p5.createVector(_x, _y);
    this.vel = this.p5.createVector(0, 0.2);
    this.acc = this.p5.createVector(0, 0);
    this.maxSpeed = 4;

    this.col =
      processingColours[Math.floor(Math.random() * processingColours.length)];
    this.life = _size;
    this.mass = _size;
    this.burst = false;
    this.parent = _parent;
    this.decreaseRate = 4.0;
    this.children = [];

    if (this.parent) {
      for (let i = 0; i < 5; i++) {
        this.children.push(
          new Bubble(
            this.p5,
            // these positions are the initial, needs to be the latest position
            this.p5.random(this.pos.x - 10, this.pos.x + 10),
            this.p5.random(this.pos.y - 10, this.pos.y + 10),
            this.p5.random(40, 60),
            false
          )
        );
      }
    } else {
      this.decreaseRate = 2.0;
    }
  }

  draw() {
    if (this.life > 0) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
      // this.vel.limit(2);
    }

    this.p5.noStroke();
    this.p5.fill(this.col);

    if (this.parent) {
      if (this.life > 0) {
        this.p5.circle(this.pos.x, this.pos.y, this.life);
        this.children.forEach((child) => child.setRandomPos(this.pos));
      } else {
        this.children.forEach((child, index) => {
          if (!child.burst) {
            child.draw();
          } else {
            this.children.splice(index, 1);
          }
        });
      }
      if (this.life <= 0 && this.children.length === 0) {
        this.burst = true;
      }
    } else if (!this.parent) {
      if (this.life > 0) {
        this.p5.circle(this.pos.x, this.pos.y, this.life);
      } else {
        this.burst = true;
      }
    }

    this.life -= this.decreaseRate;
  }

  applyForce(force) {
    let f = this.p5.constructor.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  setRandomPos(parentPos) {
    this.pos.x = this.p5.random(parentPos.x - 30, parentPos.x + 30);
    this.pos.y = this.p5.random(parentPos.y - 30, parentPos.y + 30);
    let dist = this.p5.constructor.Vector.sub(this.pos, parentPos);
    this.vel = this.p5.constructor.Vector.normalize(dist);
  }
}
