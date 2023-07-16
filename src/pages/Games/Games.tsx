import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import chessGameSVG from '../../assets/svg/chessGame.svg';
import soonGamesSVG from '../../assets/svg/soonGames.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { Footer } from 'layouts/Footer';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
  '@media (max-width: 768px)': {
    paddingTop: '70px',
  },
}));

const GameBlock = styled.div(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '235px',
  height: '324px',
  borderRadius: '10px',
  // backgroundImage: `url(${chessGameSVG})`,
  backgroundRepeat: 'no-repeat',
}));

const GameBlockSoon = styled(GameBlock)(() => ({
  // backgroundImage: `url(${soonGamesSVG})`,
}));

const GameBlocksContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  margin: 'auto',
  '@media (max-width: 768px)': {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '60px',
  },
}));

const PlayButton = styled(NavLink)(() => ({
  width: 'fit-content',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '13px',
  padding: '12px 35px',
  boxShadow: '0px 4.33506px 4.33506px rgba(0, 0, 0, 0.25)',
  borderRadius: '6px',
  color: '#fff',
  marginBottom: '60px',
  cursor: 'pointer',
  zIndex: 1,
  textDecoration: 'none',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const PlayButtonMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
    width: 'fit-content',
    background: '#242424',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '13px',
    padding: '12px 35px',
    boxShadow: '0px 4.33506px 4.33506px rgba(0, 0, 0, 0.25)',
    borderRadius: '6px',
    color: '#fff',
    marginBottom: '60px',
    cursor: 'pointer',
    zIndex: 1,
    textDecoration: 'none',
  },
}));

export const Games = () => (
  <>
    <DefaultLayout>
      <Container>
        <GameBlocksContainer>
          <GameBlock>
            <SuspenseImg style={{ position: 'absolute' }} src={chessGameSVG} />
            <PlayButton to={'/games/chess'}>Play</PlayButton>
            <PlayButtonMobile>Play</PlayButtonMobile>
          </GameBlock>
          <GameBlockSoon>
            {' '}
            <SuspenseImg style={{ position: 'absolute' }} src={soonGamesSVG} />
          </GameBlockSoon>
          <GameBlockSoon>
            {' '}
            <SuspenseImg style={{ position: 'absolute' }} src={soonGamesSVG} />
          </GameBlockSoon>
        </GameBlocksContainer>
      </Container>
      <Footer />
    </DefaultLayout>
  </>
);
