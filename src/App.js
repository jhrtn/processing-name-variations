import { useState } from 'react';
import styled from 'styled-components';

const letters = {
  p: ['?'],
  r: ['2'],
  o: ['0',],
  c: ['(', '[', '<', '{'],
  e: ['3', '&', '£', '€'],
  s: ['$', '5'],
  i: ['1', '!', '|'],
  n: ['n'],
  g: ['&', '6', '9'],
}

const flip = () => Math.random() >= 0.5;

function App() {
  const [processing, setProcessing] = useState('Processing');
  const [numRegens, setNumRegens] = useState(0);
  const regenerateText = () => {
    const res = Array.from("processing").map((letter) => {
      const leetOptions = letters[letter];
      return flip() ? leetOptions[Math.floor(Math.random()*leetOptions.length)] : letter;
    })
    setNumRegens(numRegens + 1);
    setProcessing(res);
  }
  return (
    <Container>
      <Inner>
        <h1>{processing}</h1>
        <button onClick={regenerateText}>regenerate!</button>
      </Inner>
      <RegenContainer>
         {numRegens > 0 && <p>You've generated {numRegens} variation{numRegens > 1 && 's'}!</p>}
      </RegenContainer>
      <CodeLink>
        <a href="https://github.com/jhrtn/processing-name-variations/blob/main/src/App.js" target="_blank" rel="noreferrer">
            source
        </a>
      </CodeLink>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #F0EDEE;
  color: #0A090C;

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

  h1 {
    font-variant-numeric: tabular-nums;
    font-family: monospace;
  }

  button {
    outline: none;
    border: none;
    background-color: #0A090C;
    color: #F0EDEE;
    padding: 12px 20px;
    border-radius: 2px;
    :hover {
      background-color: #002642;
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
    color: #0A090C;
  }
`;