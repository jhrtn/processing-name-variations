import { Bubble } from './bubble';
import { Repeller } from './repel';

export const processingColours = ['#0a47ff', '#171d9a', '#709dff'];

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
