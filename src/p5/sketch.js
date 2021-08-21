const processingColours = ['#0a47ff', '#171d9a', '#709dff'];

export default function sketch(p5) {
  let bubbles = [];
  let iteration = 0;
  let centerRepeller;
  let w, h;

  const seedParentBubble = () => {
    const size = p5.random(180, 220);
    const halfSize = size / 2;
    return new Bubble(
      p5,
      p5.random(halfSize, p5.width - halfSize),
      p5.random(size, p5.height - size),
      size,
      true
    );
  };

  p5.setup = () => {
    p5.createCanvas(w, h);
    centerRepeller = new Repeller(p5, w / 2, h / 2, 20);
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.iteration) {
      if (props.iteration !== iteration) {
        const numBubbleToCreate = p5.constrain(props.iteration, 1, 75);
        for (let i = 0; i < numBubbleToCreate; i++) {
          bubbles.push(seedParentBubble());
        }
      }
      iteration = props.iteration;
    }
    if (props.windowSize) {
      const targetW = props.windowSize.width - 20;
      const targetH = props.windowSize.height - 20;
      if (targetW !== p5.width || targetH !== p5.height) {
        w = targetW;
        h = targetH;
        p5.resizeCanvas(targetW, targetH, true);
      }
    }
  };

  p5.draw = () => {
    p5.background('#F0EDEE');
    // p5.background(240, 237, 238, 30); //same colour as above with some alpha
    // centerRepeller.draw();
    bubbles.forEach((bubble, index) => {
      if (!bubble.burst) {
        bubble.draw();
        centerRepeller.repel(bubble);
      } else {
        bubbles.splice(index, 1);
      }
    });
  };
}

class Bubble {
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
  }
}

class Repeller {
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
