const processingColours = ['#0a47ff', '#171d9a', '#709dff'];

export default function sketch(p5, w = 600, h = 600) {
  let rotation = 0;

  let bubbles = [];
  let iteration = 0;

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
    for (let i = 0; i < 4; i++) {
      bubbles.push(seedParentBubble());
    }
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.iteration) {
      if (props.iteration !== iteration) {
        for (let i = 0; i < p5.random(4, 8); i++) {
          bubbles.push(seedParentBubble());
        }
      }
      iteration = props.iteration;
    }
  };

  p5.draw = () => {
    p5.background('#F0EDEE');
    bubbles.forEach((bubble, index) => {
      if (!bubble.burst) {
        bubble.draw();
      } else {
        bubbles.splice(index, 1);
      }
    });
  };
}

class Bubble {
  constructor(_p5, _x, _y, _size, _parent) {
    this.p5 = _p5;
    this.x = _x;
    this.y = _y;
    this.col =
      processingColours[Math.floor(Math.random() * processingColours.length)];
    this.life = _size;
    this.burst = false;
    this.parent = _parent;
    this.decreaseRate = 4.0;
    this.children = [];

    if (this.parent) {
      for (let i = 0; i < 5; i++) {
        this.children.push(
          new Bubble(
            this.p5,
            this.p5.random(this.x - 30, this.x + 30),
            this.p5.random(this.y - 30, this.y + 30),
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
    this.p5.noStroke();
    this.p5.fill(this.col);

    if (this.parent) {
      if (this.life > 0) {
        this.p5.circle(this.x, this.y, this.life);
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
        this.p5.circle(this.x, this.y, this.life);
      } else {
        this.burst = true;
      }
    }

    this.life -= this.decreaseRate;
  }
}
