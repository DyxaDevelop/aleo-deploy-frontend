import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import FirstScreenSVG from '../../assets/svg/firstScreen.svg';
import SecondScreenSVG from '../../assets/svg/secondScreen.svg';
import xSVG from '../../assets/svg/x.svg';
import HiddenSVG from '../../assets/svg/hidden.svg';
import logoSVG from '../../assets/svg/LOGO.svg';
import twitterWhiteSVG from '../../assets/svg/twitterWhite.svg';
import discordWhiteSVG from '../../assets/svg/discordWhite.svg';
import githubWhiteSVG from '../../assets/svg/githubWhite.svg';
import FaqSVG from '../../assets/svg/FaqArrow.svg';
import { Loader } from 'components/Loader/Loader';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  // '& ::-webkit-scrollbar': {
  //   width: '5px',
  //   background: 'transparent',
  // },
  // '& ::-webkit-scrollbar-thumb': {
  //   borderRadius: '6px',
  //   background: 'transparent',
  // },
  // '& ::-webkit-scrollbar-thumb:hover': {
  //   background: '#337AB7',
  // },
  // '& ::-webkit-scrollbar-track': {
  //   background: 'transparent',
  // },
}));

const FirstSection = styled.div(() => ({
  paddingTop: '140px',
  display: 'flex',
  alignItems: 'center',
  paddingRight: '50px',
}));

const FirstSectionText = styled.div(() => ({
  '& p': {
    color: '#A3A3A3',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '-1.82px',
  },
}));

const FirstSectionTextTitle = styled.span(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '56px',
  lineHeight: '57px',
  letterSpacing: '-2.06968px',
  color: '#fff',
}));

const Aleo = styled(FirstSectionTextTitle)(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const Web3 = styled(FirstSectionTextTitle)(() => ({
  background: 'linear-gradient(90.36deg, #739DFF 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const SecondSection = styled.div(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  paddingLeft: '50px',
  paddingRight: '50px',
  boxSizing: 'border-box',
  '& img': {
    maxWidth: '50%',
  },
}));

const SecondSectionText = styled.span(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '800',
  fontSize: '82px',
  lineHeight: '99px',
  letterSpacing: '-1.5078px',
  marginTop: '100px',
  color: '#fff',
}));

const Platform = styled(SecondSectionText)(() => ({
  background: 'linear-gradient(126.81deg, #1055FA -3.23%, #00D0F6 111.59%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const BlockSection = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '80px',
  justifyContent: 'center',
  marginTop: '100px',
}));

const BlockItem = styled.div(() => ({
  padding: '15px 25px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  borderRadius: '12px',
  width: '580px',
  height: '300px',
  maxWidth: '40%',
  background: 'rgba(255, 255, 255, 0.05)',
}));

const BlockTitle = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '40px',
  color: '#FFFFFF',
}));

const BlockDesc = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '40px',
  color: 'rgba(255, 255, 255, 0.5)',
}));

const BlockNumber = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '40px',
  color: '#04ABF7',
}));

const Button = styled.div(() => ({
  width: '200px',
  height: '60px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '6px',
  fontSize: '15px',
  color: '#fff',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    transition: '1s',
    background: 'linear-gradient(90.36deg, #1056FA 0.21%, #1056FA 101.74%)',
  },
}));

const Tab = styled.div(() => ({}));

const LiveFeedBlock = styled.div(() => ({}));

const FooterRightLinksBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const BottomFooterText = styled.div(() => ({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.5)',
  marginTop: '80px',
}));

const FooterContainer = styled.div(() => ({
  width: '1000px',
  margin: 'auto',
  paddingTop: '82px',
  display: 'flex',
  justifyContent: 'space-between',
}));

const LinksFooter = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}));

const LiveFeedTitle = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#fff',
  width: '100%',
  '& .t-1': {
    paddingLeft: '27px',
  },
  '& .th': {
    display: 'flex',
    width: '20%',
    paddingTop: '32px',
    paddingBottom: '32px',
  },
  '& .t-5': {
    justifyContent: 'flex-end',
    paddingRight: '26px',
  },
}));

const LiveFeed = styled.div(() => ({
  paddingLeft: 50,
  paddingRight: 50,
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '50px',
}));

const LiveFeedItem = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  fontWeight: 600,
  fontZize: '20px',
  lineHeight: '16px',
  '&:nth-child(even)': {
    backgroundColor: '#222732',
    borderRadius: '12px',
  },
  '& .r-1': {
    color: '#fff',
    paddingLeft: '27px',
  },
  '& .r-2, .r-3, .r-4': {
    color: '#B1BAD3',
  },
  '& .row': {
    gap: '4px',
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    paddingTop: '28px',
    paddingBottom: '28px',
  },

  '& .r-5': {
    justifyContent: 'flex-end',
    paddingRight: '26px',
    color: '#1FFF20',
  },
}));

const Foooter = styled.div(() => ({
  backgroundColor: '#1E2027',
  height: 400,
  width: '100%',
  marginTop: 250,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
}));

const FooterLogoBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '21px',
}));

const FooterRightLinks = styled.div(() => ({
  display: 'flex',
  fontWeight: 600,
  gap: '100px',
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 0.5)',
}));

const FAQBlock = styled.div(() => ({
  width: '70%',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#AAABAE',
  marginTop: 50,
}));

const FAQItem = styled.div(() => ({
  background: '#14161F',
  borderRadius: '8px',
  marginBottom: '12px',
  '& img': {
    transform: 'rotate(180deg)',
  },
  '&.active': {
    '& div': {
      opacity: '1',
    },
    '& img': {
      transform: 'rotate(0deg)',
    },
    '& div:last-child': {
      display: 'block',
    },
  },
}));

const FAQItemTitle = styled.div(() => ({
  background: 'rgba(255, 255, 255, 0.05)',
  opacity: '0.64',
  padding: '20px 25px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

const FAQItemDescription = styled.div(() => ({
  display: 'none',
  padding: '20px',
  color: 'rgba(255, 255, 255, 0.9)',
}));

export default function MainPage() {
  const [openAccordeon, setOpenAccordeon] = useState('');
  return (
    <>
      <DefaultLayout>
        {/* <Loader /> */}
        <Container>
          <FirstSection>
            <SuspenseImg src={FirstScreenSVG} />
            <FirstSectionText>
              <FirstSectionTextTitle>
                <Aleo>Aleo Games</Aleo> — 1st platform with multiple games on
                <Web3> Aleo</Web3>, bets, DAO voting and ENS
              </FirstSectionTextTitle>
              <p>
                On Aleo Games you can choose game you want to play, invite your
                friends, make bets, claim tickets and use them to vote for
                future games, create your unique ENS. Everything is recorded on
                blockchain!
              </p>
            </FirstSectionText>
          </FirstSection>
          <SecondSection>
            <SecondSectionText>
              <Platform>What is</Platform>
              <br /> Aleo Games
            </SecondSectionText>
            <SuspenseImg src={SecondScreenSVG} />
          </SecondSection>
          <BlockSection>
            <BlockItem>
              <BlockNumber>1</BlockNumber>
              <BlockTitle>Install Leo wallet</BlockTitle>
              <BlockDesc>
                Install Leo Wallet to interact with
                <br />
                WEB3 applications on Aleo
              </BlockDesc>
              <Button>Install</Button>
            </BlockItem>
            <BlockItem>
              <BlockNumber>2</BlockNumber>
              <BlockTitle>Get tokens from Faucet</BlockTitle>
              <BlockDesc>
                Get tokens from faucet <br />
                to pay for gas fees
              </BlockDesc>
              <Button>Faucet</Button>
            </BlockItem>
            <BlockItem>
              <BlockNumber>3</BlockNumber>
              <BlockTitle>Choose a game you want to play</BlockTitle>
              <BlockDesc>
                Choose a game you want <br />
                to play and enjoy!
              </BlockDesc>
              <Button>Play</Button>
            </BlockItem>
            <BlockItem>
              <BlockNumber>4</BlockNumber>
              <BlockTitle>Invite friends and make a bet</BlockTitle>
              <BlockDesc>
                Invite your friend <br />
                to play 1 vs 1
              </BlockDesc>
              <Button>Invite</Button>
            </BlockItem>
            <BlockItem>
              <BlockNumber>5</BlockNumber>
              <BlockTitle>Create unique ENS</BlockTitle>
              <BlockDesc>
                Create your unique ENS <br />
                name to be different
              </BlockDesc>
              <Button>Create ENS</Button>
            </BlockItem>
            <BlockItem>
              <BlockNumber>6</BlockNumber>
              <BlockTitle>Vote for future games</BlockTitle>
              <BlockDesc>
                Vote for games you want <br />
                to see next on Aleo Games
              </BlockDesc>
              <Button>Vote</Button>
            </BlockItem>
          </BlockSection>
          <FAQBlock>
            <Platform>FAQ</Platform>
            <FAQItem className={openAccordeon === '1' ? 'active' : ''}>
              <FAQItemTitle
                onClick={() => {
                  if (openAccordeon === '1') {
                    setOpenAccordeon('');
                  } else {
                    setOpenAccordeon('1');
                  }
                }}
              >
                What is Aleo Games? <SuspenseImg src={FaqSVG} />
              </FAQItemTitle>
              <FAQItemDescription>
                Aleo Games is a gaming platform made on Aleo to show blockchain
                in use. <br /> Here you can create your ENS profile, choose a
                game to play, invite your friends, place the bets and have a fun
                time!
              </FAQItemDescription>
            </FAQItem>
            <FAQItem className={openAccordeon === '2' ? 'active' : ''}>
              <FAQItemTitle
                onClick={() => {
                  if (openAccordeon === '2') {
                    setOpenAccordeon('');
                  } else {
                    setOpenAccordeon('2');
                  }
                }}
              >
                How to use Aleo Games?
                <SuspenseImg src={FaqSVG} />
              </FAQItemTitle>
              <FAQItemDescription>
                1. Install wallet <br />
                2. Get testnet tokens <br />
                3. Play and get your game recorded on the blockchain
              </FAQItemDescription>
            </FAQItem>
            <FAQItem className={openAccordeon === '3' ? 'active' : ''}>
              <FAQItemTitle
                onClick={() => {
                  if (openAccordeon === '3') {
                    setOpenAccordeon('');
                  } else {
                    setOpenAccordeon('3');
                  }
                }}
              >
                On chain use <SuspenseImg src={FaqSVG} />
              </FAQItemTitle>
              <FAQItemDescription>
                1. Install wallet <br />
                2. Get testnet tokens <br />
                3. Play and get your game recorded on the blockchain
              </FAQItemDescription>
            </FAQItem>
            <FAQItem className={openAccordeon === '4' ? 'active' : ''}>
              <FAQItemTitle
                onClick={() => {
                  if (openAccordeon === '4') {
                    setOpenAccordeon('');
                  } else {
                    setOpenAccordeon('4');
                  }
                }}
              >
                Off chain use <SuspenseImg src={FaqSVG} />
              </FAQItemTitle>
              <FAQItemDescription>
                1. Install wallet <br />
                2. Connect to the website <br />
                3. Enjoy games without paying any gas fees and waiting for
                transactions to be executed
              </FAQItemDescription>
            </FAQItem>
          </FAQBlock>
          <LiveFeed>
            {/* <Tab>Live Feed</Tab> */}
            <LiveFeedBlock>
              <LiveFeedTitle>
                <div className="th t-1">Game</div>
                <div className="th t-2">User</div>
                <div className="th t-3">Time</div>
                <div className="th t-4">Bid amount</div>
                <div className="th t-5">Payment</div>
              </LiveFeedTitle>
              <LiveFeedItem>
                <div className="row r-1">
                  <SuspenseImg src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <SuspenseImg src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <SuspenseImg src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <SuspenseImg src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <SuspenseImg src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <img src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <img src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <img src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <img src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <img src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <img src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <img src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
              <LiveFeedItem>
                <div className="row r-1">
                  <img src={xSVG} />
                  Zalupa.eth
                </div>
                <div className="row r-3">
                  <img src={HiddenSVG} />
                  Hidden
                </div>
                <div className="row r-3">23:26</div>
                <div className="row r-4">2.59950002</div>
                <div className="row r-5">2.82695627</div>
              </LiveFeedItem>
            </LiveFeedBlock>
          </LiveFeed>
        </Container>
        <Foooter>
          <FooterContainer>
            <FooterLogoBlock>
              <img style={{ width: 177 }} src={logoSVG} />
              Where Applications
              <br />
              Become Private.
              <LinksFooter>
                <img src={twitterWhiteSVG} />
                <img src={githubWhiteSVG} />
                <img src={discordWhiteSVG} />
              </LinksFooter>
              <BottomFooterText>
                © Aleo Systems Inc • Your Privacy is{' '}
                <span style={{ color: '#fff' }}>Protected</span>
              </BottomFooterText>
            </FooterLogoBlock>
            <FooterRightLinks>
              <FooterRightLinksBlock>
                <span style={{ color: '#fff' }}>Aleo.org</span>
                <span style={{ color: '#fff' }}>Home</span>
                <span>Our Blog</span>
                <span>Opportunities</span>
              </FooterRightLinksBlock>
              <FooterRightLinksBlock>
                <span style={{ color: '#fff' }}>For Developers</span>
                <span>Aleo Studio</span>
                <span>Aleo Explorer</span>
                <span>Aleo Package Manager</span>
                <span> Aleo Developer Docs</span>
              </FooterRightLinksBlock>
            </FooterRightLinks>
          </FooterContainer>
        </Foooter>
      </DefaultLayout>
      {/* <DefaultLayout>
      <header className="App-header">
        Pipeline test
        <WalletMultiButton />
      </header>
      Test main
    </DefaultLayout> */}
    </>
  );
}
