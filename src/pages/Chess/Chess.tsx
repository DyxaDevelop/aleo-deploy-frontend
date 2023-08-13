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
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { LanguageHOC } from 'hoc/langHoc';

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

export const ChessPure = ({ lang }: any) => (
  <>
    <DefaultLayout>
      <Container>
        <GameBlocksContainer>
          <ControlBtns>
            <NavLink to={'/games/'}>
              <SuspenseImg src={leftArrow} />
            </NavLink>
            <NavLink to={'/'}>
              <SuspenseImg src={xIcon} />
            </NavLink>
          </ControlBtns>
          <SuspenseImg src={chessBoardSVG} />
          <ContentBlock>
            <div style={{ margin: 'auto' }}>
              <Title>{lang.ALEO_C}</Title>
              <Description>
                {lang.ALEO_C2}
                <span style={{ color: '#fff' }}>Aleo platform!</span>
              </Description>
              <ButtonGroup>
                <Button to={'/games/chess/board'}>{lang.CHESS_P}</Button>
              </ButtonGroup>
            </div>
          </ContentBlock>
        </GameBlocksContainer>
      </Container>
    </DefaultLayout>
  </>
);

export const Chess = LanguageHOC(ChessPure, 'ingames');
