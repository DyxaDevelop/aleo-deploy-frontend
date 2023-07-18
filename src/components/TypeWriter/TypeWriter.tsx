import styled from '@emotion/styled';
import React, { useState, useEffect, FC } from 'react';

interface Props {
    text: string,
    delay: number
}

const TitleBlock = styled.div(() => ({
  minHeight: '60px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '40px',
  textFillColor: 'transparent',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    display: 'none',
  }
}));

const Typewriter: FC<Props> = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        console.log("efefe")
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <TitleBlock>{currentText}</TitleBlock>;
};

export default Typewriter;