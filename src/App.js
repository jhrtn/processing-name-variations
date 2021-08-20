import { useState, useEffect } from 'react';
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './sketch';

const letters = {
  P: ['?'],
  r: ['2'],
  o: ['0'],
  c: ['(', '[', '<', '{'],
  e: ['3', '&', '£', '€'],
  s: ['$', '5'],
  i: ['1', '!', '|'],
  n: ['n'],
  g: ['&', '6', '9'],
};

const flip = (prob) => Math.random() <= prob;

function App() {
  const [processing, setProcessing] = useState('Processing');
  const [numRegens, setNumRegens] = useState(0);
  const [regenFac, setRegenFac] = useState(0.4);

  const regenerateText = () => {
    const res = Array.from('Processing').map((letter) => {
      const leetOptions = letters[letter];
      return flip(regenFac)
        ? leetOptions[Math.floor(Math.random() * leetOptions.length)]
        : letter;
    });
    setNumRegens(numRegens + 1);
    setProcessing(res);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      regenerateText();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [regenFac]);

  return (
    <Container>
      <Inner>
        <h1>{processing}</h1>
        <div style={{ display: 'flex' }}>
          <input
            style={{ display: 'none' }}
            type="range"
            min={0}
            max={1}
            step={0.01}
            onChange={(e) => setRegenFac(e.target.value)}
          />
          <button onClick={regenerateText}>
            <Arrow />
          </button>
        </div>
      </Inner>
      <RegenContainer>
        {numRegens > 0 && (
          <p>
            You have generated {numRegens} variation{numRegens > 1 && 's'}!
          </p>
        )}
      </RegenContainer>
      <CodeLink>
        <a
          href="https://github.com/jhrtn/processing-name-variations/blob/main/src"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
      </CodeLink>
      <SketchContainer>
        <P5Wrapper sketch={sketch} iteration={numRegens} />
      </SketchContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #f0edee;
  color: #0a090c;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(20px + 2vmin);
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  h1 {
    font-variant-numeric: tabular-nums;
    font-family: monospace;
    font-weight: 100;
  }

  button {
    outline: none;
    border: 2px solid #0a090c;
    color: #0a090c;
    /* padding: 12px 20px; */
    height: 40px;
    width: 40px;
    margin-left: 24px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    :hover {
      background-color: #002642;
      color: #f0edee;
    }
  }
`;

const RegenContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 12px;
`;

const CodeLink = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;

  a {
    color: #0a090c;
  }
`;

const SketchContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);
