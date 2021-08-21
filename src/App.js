import { useState, useEffect } from 'react';
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './p5/sketch';
import useWindowSize from './lib/useWindowSize';

const theme = {
  colours: {
    light: '#f0edee',
    dark: '#0a090c',
  },
};

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
  const [processingName, setProcessingName] = useState('Processing');
  const [numRegens, setNumRegens] = useState(0);
  const [regenFac, setRegenFac] = useState(0.4);
  const size = useWindowSize();

  const regenerateText = () => {
    const res = Array.from('Processing').map((letter) => {
      const leetOptions = letters[letter];
      return flip(regenFac)
        ? leetOptions[Math.floor(Math.random() * leetOptions.length)]
        : letter;
    });
    setNumRegens(numRegens + 1);
    setProcessingName(res);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // regenerateText();
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [regenFac]);

  return (
    <>
      <Container>
        <Inner>
          <h1>{processingName}</h1>
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
          <p>
            <a
              href="https://github.com/jhrtn/processing-name-variations/blob/main/src"
              target="_blank"
              rel="noreferrer"
            >
              {'</>'}
            </a>
          </p>
        </CodeLink>

        <InfoButton>
          <InfoIcon />
        </InfoButton>

        <SketchContainer>
          <P5Wrapper sketch={sketch} iteration={numRegens} windowSize={size} />
        </SketchContainer>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  background-color: ${theme.colours.light};
  color: ${theme.colours.dark};

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(20px + 3vmin);
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
    border: 2px solid ${theme.colours.dark};
    color: ${theme.colours.dark};
    /* padding: 12px 20px; */
    height: 40px;
    width: 40px;
    margin-left: 24px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    :hover {
      background-color: #002642;
      color: ${theme.colours.light};
    }
    font-family: 'Cutive Mono', monospace;
    font-weight: 200;
    user-select: none;
  }
`;

const RegenContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 14px;
  z-index: 2;
`;

const CodeLink = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  z-index: 2;

  a {
    color: ${theme.colours.dark};
  }
`;

const SketchContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const InfoButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  z-index: 2;
  color: ${theme.colours.dark};
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

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
