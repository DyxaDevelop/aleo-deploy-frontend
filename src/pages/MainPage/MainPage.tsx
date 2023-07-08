import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense, useEffect, useState } from 'react';
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
import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';

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
  alignItems: 'center',
  borderRadius: '12px',
  width: '580px',
  height: '200px',
  maxWidth: '40%',
  background:
    'linear-gradient(98.8deg, rgba(255, 255, 255, 0.08) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: 'blur(5.52719px)',
}));

const BlockTitle = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '28px',
  lineHeight: '40px',
  color: '#FFFFFF',
}));

const BlockDesc = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '40px',
  color: 'rgba(255, 255, 255, 0.5)',
}));

const BlockNumber = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  width: '20%',
  marginRight: '20px',
  textAlign: 'center',
  fontSize: '100px',
  lineHeight: '100px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const Button = styled.div(() => ({
  width: 'fit-content',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '6px',
  fontSize: '12px',
  color: '#fff',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '9px 25px',
  '&:hover': {
    transition: '1s',
    background: 'linear-gradient(90.36deg, #1056FA 0.21%, #1056FA 101.74%)',
  },
}));

const Tab = styled.div(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '26px',
  lineHeight: '24px',
  color: '#FFFFFF',
  position: 'relative',
  marginLeft: '25px',
}));

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
    color: '#02C4F7',
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

const BlockItemContent = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const BlueCircle = styled.div(() => ({
  width: '10px',
  height: '10px',
  position: 'absolute',
  background: '#105AFA',
  borderRadius: '50%',
  top: '-7px',
  left: '125px',
}));

export default function MainPage() {
  const [openAccordeon, setOpenAccordeon] = useState('');

  function tryParseJSON(input: string): string | object {
    try {
      return JSON.parse(input);
    } catch (error) {
      return input;
    }
  }

  const { publicKey, wallet, requestTransaction } = useWallet();
  let [programId, setProgramId] = useState('');
  let [functionName, setFunctionName] = useState('');
  let [inputs, setInputs] = useState('');
  let [fee, setFee] = useState<number | undefined>();
  let [transactionId, setTransactionId] = useState<string | undefined>();
  let [status, setStatus] = useState<string | undefined>();

  const aleoTransaction = Transaction.createTransaction(
    //@ts-ignore
    publicKey,
    WalletAdapterNetwork.Testnet,
    'credits.aleo',
    'transfer',
    //@ts-ignore
    inputs,
    fee,
  );

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (transactionId) {
      intervalId = setInterval(() => {
        getTransactionStatus(transactionId!);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [transactionId]);

  const handleSubmit = async () => {
    const parsedInputs: any = [
      'aleo1mw58n80vnavqeznxxs448pdqjfl4d8aa0eaj9cxl2sc2gxjspvqsz6yhz0',
      '12400000',
      //@ts-ignore
    ].map((elem) => tryParseJSON(elem));

    const aleoTransaction = Transaction.createTransaction(
      //@ts-ignore
      publicKey,
      WalletAdapterNetwork.Testnet,
      'predator_22.aleo',
      'mint',
      parsedInputs,
      35000,
    );
    //@ts-ignore
    const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction,
      )) || '';
    //@ts-ignore
    setTransactionId(txId);
  };

  const getTransactionStatus = async (txId: string) => {
    const status = await (wallet?.adapter as LeoWalletAdapter)
      //@ts-ignore
      .transactionStatus(txId);
    setStatus(status);
  };

  useEffect(() => {
    handleSubmit();
  }, []);
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
              <BlockItemContent>
                <BlockTitle>Install Leo wallet</BlockTitle>
                <BlockDesc>
                  to interact with WEB3 applications on Aleo
                </BlockDesc>
                <Button>Install</Button>
              </BlockItemContent>
            </BlockItem>
            <BlockItem>
              <BlockNumber>2</BlockNumber>
              <BlockItemContent>
                <BlockTitle>Get tokens</BlockTitle>
                <BlockDesc>from faucet to pay for gas fees</BlockDesc>
                <Button>Faucet</Button>
              </BlockItemContent>
            </BlockItem>
            <BlockItem>
              <BlockNumber>3</BlockNumber>
              <BlockItemContent>
                <BlockTitle>Choose a game</BlockTitle>
                <BlockDesc>you want to play and enjoy!</BlockDesc>
                <Button>Play</Button>
              </BlockItemContent>
            </BlockItem>
            <BlockItem>
              <BlockNumber>4</BlockNumber>
              <BlockItemContent>
                <BlockTitle>Invite </BlockTitle>
                <BlockDesc>your friend to play 1 vs 1</BlockDesc>
                <Button>Invite</Button>
              </BlockItemContent>
            </BlockItem>
            <BlockItem>
              <BlockNumber>5</BlockNumber>
              <BlockItemContent>
                <BlockTitle>Create unique ANS</BlockTitle>
                <BlockDesc>to be different!</BlockDesc>
                <Button>Create ENS</Button>
              </BlockItemContent>
            </BlockItem>
            <BlockItem>
              <BlockNumber>6</BlockNumber>
              <BlockItemContent>
                <BlockTitle>Vote </BlockTitle>
                <BlockDesc>for future games</BlockDesc>
                <Button>Vote</Button>
              </BlockItemContent>
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
            <Tab>
              Live Feed <BlueCircle />
            </Tab>
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
                  Chess
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
                  Chess
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
                  Chess
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
                  Chess
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
                  Chess
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
                  Chess
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
                  Chess
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
