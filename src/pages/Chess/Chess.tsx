import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import chessBoardSVG from '../../assets/svg/chessBoard.svg';
import soonGamesSVG from '../../assets/svg/soonGames.svg';
import leftArrow from '../../assets/svg/leftArrow.svg';
import checkSVG from '../../assets/svg/check.svg';
import xIcon from '../../assets/svg/xIcon.svg';
import saveSVG from '../../assets/svg/save.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { LanguageHOC } from 'hoc/langHoc';
import { Modal } from 'components/Modal/Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { Show } from 'components/Show/Show';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const Button = styled.div(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '3px',
  color: '#FFFFFF',
  padding: '8px 20px',
  fontSize: '12px',
  fontWeight: '700',
  cursor: 'pointer',
  textDecoration: 'none',
}));

const LinkModal = styled.div(() => ({
  width: '421px',
  height: '272px',
  borderRadius: '8px',
  background: '#1A1C24',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CopyToClipboardStyled = styled(CopyToClipboard)(() => ({
  width: '240px',
  height: '40px',
  borderRadius: '6px',
  background: '#0C6BFA',
  color: '#F6F6F6',
  fontWeight: 'bold',
  gap: '10px',
  outline: 0,
  border: '0',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ChessPure = ({ lang }: any) => {
  const { wallet, publicKey, requestRecords } = useWallet();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Show visible={openModal}>
        <Modal>
          <LinkModal>
            <Show visible={!copied}>
              <CopyToClipboardStyled
                text={'https://aleo-games.com/games/chess/board/' + publicKey}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => {
                    navigate('/games/chess/board/' + publicKey);
                  }, 1000);
                }}
              >
                <button>
                  <img src={saveSVG} />
                  Copy invite link
                </button>
              </CopyToClipboardStyled>
            </Show>
            <Show visible={copied}>
              <CopyToClipboardStyled
                text={'https://aleo-games.com/games/chess/board/' + publicKey}
                onCopy={() => setCopied(true)}
              >
                <button>
                  <img src={checkSVG} />
                </button>
              </CopyToClipboardStyled>
            </Show>
          </LinkModal>
        </Modal>
      </Show>
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
                <Description>{lang.ALEO_C2}</Description>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {lang.CHESS_P}
                  </Button>
                </ButtonGroup>
              </div>
            </ContentBlock>
          </GameBlocksContainer>
        </Container>
      </DefaultLayout>
    </>
  );
};

export const Chess = LanguageHOC(ChessPure, 'ingames');
