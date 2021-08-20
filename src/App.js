import { useState } from 'react';
import styled from 'styled-components';
import './App.css';

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
  const regenerateText = () => {
    const res = Array.from("processing").map((letter) => {
      const leetOptions = letters[letter];
      return flip() ? leetOptions[Math.floor(Math.random()*leetOptions.length)] : letter;
    })
    
    setProcessing(res);
  }
  return (
    <Container>
      <div>
        <h1>{processing}</h1>
        <button onClick={regenerateText} >regenerate!</button>
      </div>
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
  font-size: calc(10px + 2vmin);

  h1 {
    font-variant-numeric: tabular-nums;
    font-family: monospace;
  }

  button {
    outline: none;
    border: none;
    background-color: #07393C;
    color: #F0EDEE;
    padding: 12px 20px;
    border-radius: 2px;

    :hover {
      transform: scale(1.01);
    }
  }
`;