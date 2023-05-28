import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';

const Hop = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = () => {
  const LoaderContainer = styled.div(() => ({
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px',
    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: '64px',
      height: '64px',
      margin: '8px',
      border: '8px solid #0C6BFA',
      borderRadius: '50%',
      animation: `${Hop} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
      borderColor: ' #0C6BFA transparent transparent transparent',
      '&:nth-child(1)': {
        animationDelay: '-0.45s',
      },
      '&:nth-child(2)': {
        animationDelay: '-0.3s',
      },
      '&:nth-child(3)': {
        animationDelay: '-0.15s',
      },
    },
  }));

  return (
    <>
      <LoaderContainer>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoaderContainer>
    </>
  );
};
