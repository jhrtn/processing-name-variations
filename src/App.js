import { useState, useEffect } from 'react';
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper';
import { motion, AnimatePresence } from 'framer-motion';

import sketch from './p5/sketch';
import useWindowSize from './lib/useWindowSize';
import InfoDialog from './components/InfoDialog';

export const theme = {
  colours: {
    light: '#f0edee',
    dark: '#0a090c',
    accent: '#002642',
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
  const [showInfo, setShowInfo] = useState(false);
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
          <RandomButton
            style={{ display: 'flex' }}
            whileTap={{ scale: 0.88 }}
            onClick={regenerateText}
          >
            <input
              style={{ display: 'none' }}
              type="range"
              min={0}
              max={1}
              step={0.01}
              onChange={(e) => setRegenFac(e.target.value)}
            />

            <Dice />
          </RandomButton>
        </Inner>

        <RegenContainer>
          {numRegens > 0 && (
            <p>
              You have generated {numRegens} variation{numRegens > 1 && 's'}!
            </p>
          )}
        </RegenContainer>

        <InfoButton onClick={() => setShowInfo(!showInfo)}>
          <InfoIcon open={showInfo} />
        </InfoButton>

        <AnimatePresence>{showInfo && <InfoDialog />}</AnimatePresence>

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
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  h1 {
    font-variant-numeric: tabular-nums;
    font-family: 'Cutive Mono', monospace;
    font-weight: 200;
    user-select: none;
    font-size: calc(16px + 8vmin) !important;
  }
`;

const RegenContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 14px;
  z-index: 2;
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
  z-index: 4;
  color: ${theme.colours.dark};
`;

const InfoIcon = ({ open }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    stroke="currentColor"
    animate
  >
    {/* Info Icon */}
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      animate={{ pathLength: open ? 0 : 1.0, opacity: open ? 0 : 1.0 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    {/* Close Icon */}
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ color: '#f0edee' }}
      animate={{ pathLength: !open ? 0 : 1.0, opacity: !open ? 0 : 1.0 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      d="M6 18L18 6M6 6l12 12"
    />
  </motion.svg>
);

const Dice = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8.19199"
      y="5.7982"
      width="3.38533"
      height="3.38533"
      rx="1.69267"
      transform="rotate(45 8.19199 5.7982)"
      fill="currentColor"
    />
    <rect
      x="12"
      y="9.60621"
      width="3.38533"
      height="3.38533"
      rx="1.69267"
      transform="rotate(45 12 9.60621)"
      fill="currentColor"
    />
    <rect
      x="15.808"
      y="13.4142"
      width="3.38533"
      height="3.38533"
      rx="1.69267"
      transform="rotate(45 15.808 13.4142)"
      fill="currentColor"
    />
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const RandomButton = styled(motion.button)`
  outline: none;
  border: 2px solid ${theme.colours.dark};
  color: ${theme.colours.dark};
  /* padding: 12px 20px; */
  height: 40px;
  width: 40px;
  /* margin-left: 24px; */
  border-radius: 2px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #002642;
    color: ${theme.colours.light};
  }
`;
