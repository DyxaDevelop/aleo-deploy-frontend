import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import chessBoardSVG from '../../assets/svg/chessBoard.svg';
import soonGamesSVG from '../../assets/svg/soonGames.svg';
import leftArrow from '../../assets/svg/leftArrow.svg';
import xIcon from '../../assets/svg/xIcon.svg';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
}));

const GameBlocksContainer = styled.div(() => ({
  position: 'relative',
  width: '85%',
  height: '446px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'auto',
  background:
    'linear-gradient(98.8deg, rgba(255, 255, 255, 0.08) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: ' blur(12px)',
  borderRadius: '8px',
  padding: '10px',
}));

const ContentBlock = styled.div(() => ({
  width: '50%',
  height: '100%',
  paddingLeft: '70px',
}));

const ControlBtns = styled.div(() => ({
  position: 'absolute',
  zIndex: 5,
  display: 'flex',
  gap: '30px',
  right: 30,
  top: 20,
  '& img': {
    cursor: 'pointer',
  },
}));

const Title = styled.div(() => ({
  marginTop: '90px',
  fontWeight: 700,
  fontSize: '44px',
  lineHeight: '37px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const Description = styled.div(() => ({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '25px',
  alignItems: 'center',
  color: '#A3A3A3',
  width: '340px',
  letterSpacing: '-1.01538px',
  marginTop: '30px',
  marginBottom: '30px',
}));

const ButtonGroup = styled.div(() => ({
  display: 'flex',
  gap: '20px',
}));

const Button = styled(NavLink)(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '3px',
  color: '#FFFFFF',
  padding: '8px 20px',
  fontSize: '12px',
  fontWeight: '700',
  cursor: 'pointer',
  textDecoration: 'none',
}));

export const Chess = () => (
  <>
    <DefaultLayout>
      <Container>
        <GameBlocksContainer>
          <ControlBtns>
            <NavLink to={'/games/'}>
              <img src={leftArrow} />
            </NavLink>
            <NavLink to={'/'}>
              <img src={xIcon} />
            </NavLink>
          </ControlBtns>
          <img src={chessBoardSVG} />
          <ContentBlock>
            <div style={{ margin: 'auto' }}>
              <Title>Aleo chess </Title>
              <Description>
                We are excited to announce the launch of our first beta test
                game on the Aleo platform! To mark this important milestone, we
                have a special offer for our first 8,000 players who reach level
                10: they will share a pool of 25кк tokens. Join our game and
                become one of the first participants in the decentralized gaming
                revolution on the{' '}
                <span style={{ color: '#fff' }}>Aleo platform!</span>
              </Description>
              <ButtonGroup>
                <Button to={'/games/chess/board'}>Play on Aleo</Button>
                <Button to={'/games/chess/board'}>Play off chain</Button>
              </ButtonGroup>
            </div>
          </ContentBlock>
          {/* <GameBlock>
            <PlayButton to={'/games/chess'}>PLAY</PlayButton>
          </GameBlock>
          <GameBlockSoon></GameBlockSoon>
          <GameBlockSoon></GameBlockSoon> */}
        </GameBlocksContainer>
      </Container>
    </DefaultLayout>
  </>
);
