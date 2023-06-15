import React, { useMemo } from 'react';
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import WalletSVG from '../assets/svg/wallet.svg';
import AccountSVG from '../assets/svg/profile.svg';
import GamesSVG from '../assets/svg/games.svg';
import VotingSVG from '../assets/svg/voting.svg';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const Container = styled.div(() => ({
  paddingLeft: '170px',
  backgroundColor: '#12141D',
}));

export const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <Sidebar />
      <Header />
      <Container>{children}</Container>
    </>
  );
};
