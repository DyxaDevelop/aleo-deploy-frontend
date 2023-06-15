import React, { useMemo } from 'react';
import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import { NavLink } from 'react-router-dom';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';

const Container = styled.div(() => ({
  backgroundColor: '#12141C',
  width: '100%',
  height: '90px',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '20px',
  paddingRight: '50px',
  zIndex: 1,
  boxSizing: 'border-box',
}));

const WalletMultiButtonStyled = styled(WalletMultiButton)(() => ({}));

export const Header = () => {
  return (
    <Container>
      <WalletMultiButton />
    </Container>
  );
};
