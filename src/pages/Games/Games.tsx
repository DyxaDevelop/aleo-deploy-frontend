import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import chessGameSVG from '../../assets/svg/chessGame.svg';
import soonGamesSVG from '../../assets/svg/soonGames.svg';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
}));

const GameBlock = styled.div(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '235px',
  height: '346px',
  borderRadius: '10px',
  backgroundImage: `url(${chessGameSVG})`,
  backgroundRepeat: 'no-repeat',
}));

const GameBlockSoon = styled(GameBlock)(() => ({
  backgroundImage: `url(${soonGamesSVG})`,
}));

const GameBlocksContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  margin: 'auto',
}));

const PlayButton = styled(NavLink)(() => ({
  width: 'fit-content',
  background: 'linear-gradient(90.36deg, #2E35D5 0.21%, #7C60EC 101.74%)',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '13px',
  padding: '12px 35px',
  boxShadow: '0px 4.33506px 4.33506px rgba(0, 0, 0, 0.25)',
  borderRadius: '3px',
  border: '0.5px solid #FFFFFF',
  color: '#fff',
  marginBottom: '40px',
  cursor: 'pointer',
  textDecoration: 'none',
}));

export const Games = () => (
  <>
    <DefaultLayout>
      <Container>
        <GameBlocksContainer>
          <GameBlock>
            <PlayButton to={'/games/chess'}>PLAY</PlayButton>
          </GameBlock>
          <GameBlockSoon></GameBlockSoon>
          <GameBlockSoon></GameBlockSoon>
        </GameBlocksContainer>
      </Container>
    </DefaultLayout>
  </>
);
