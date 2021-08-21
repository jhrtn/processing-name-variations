import styled from 'styled-components';
import { motion } from 'framer-motion';

const InfoDialog = () => {
  return (
    <InfoDialogContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <InfoInner
        transition={{ duration: 0.4 }}
        initial={{ y: '10px' }}
        animate={{ y: 0 }}
      >
        <p>
          During{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=F8jwQP7wr6k"
          >
            this
          </a>{' '}
          livestream for Processing&apos;s 20th Anniversary,{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/shiffman"
          >
            Daniel Shiffman
          </a>{' '}
          showed off many old versions of Processing, at which time it was
          referred to as Proce55ing, Pr0cessing and others.
        </p>
        <p>
          This Sketch imagines some of the possibilities of what else Processing
          could have been known as.
        </p>
        <p>Imagine!</p>
        <p>
          Made by{' '}
          <a target="_blank" rel="noreferrer" href="https://hort.onl">
            Joseph Horton
          </a>{' '}
          using React and p5.js to test out the{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/jamesrweb/react-p5-wrapper"
          >
            react-p5-wrapper
          </a>{' '}
          library.
        </p>
      </InfoInner>
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
    </InfoDialogContainer>
  );
};

export default InfoDialog;

const InfoDialogContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  padding: 20px;

  display: grid;
  place-items: center;

  position: absolute;
  background-color: #002642;
  /* backdrop-filter: blur(4px); */
  z-index: 2;
`;

const InfoInner = styled(motion.div)`
  max-width: 400px;
  p {
    color: #f0edee;
    font-size: 16px;
    font-weight: bold;
  }
  a {
    color: #8390fa;
    :hover {
      color: #b1b9fc;
    }
  }
`;

const CodeLink = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  z-index: 2;
  user-select: none;
  a {
    color: #f0edee;
    text-decoration: none;
    :hover {
      text-decoration: underline;
      font-weight: bold;
    }
  }
`;
