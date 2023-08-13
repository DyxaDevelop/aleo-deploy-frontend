import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DefaultLayout } from '../../layouts/DefaultLayout';

import Nosorog from '../../assets/svg/animationCoins/nosorog_platform.svg';

import OneCoin from '../../assets/svg/animationCoins/coin_1.svg';
import TwoCoin from '../../assets/svg/animationCoins/coin_2.svg';
import ThreeCoin from '../../assets/svg/animationCoins/coin_3.svg';
import FourCoin from '../../assets/svg/animationCoins/coin_4.svg';
import SixCoin from '../../assets/svg/animationCoins/coin_6.svg';
import FirstScreenSVG from '../../assets/svg/firstScreen.svg';

import SecondScreenSVG from '../../assets/svg/secondScreen.svg';
import xSVG from '../../assets/svg/x.svg';
import HiddenSVG from '../../assets/svg/hidden.svg';
import logoSVG from '../../assets/svg/LOGO.svg';
import twitterWhiteSVG from '../../assets/svg/twitterWhite.svg';
import discordWhiteSVG from '../../assets/svg/discordWhite.svg';
import githubWhiteSVG from '../../assets/svg/githubWhite.svg';
import FaqSVG from '../../assets/svg/FaqArrow.svg';
import MobileSectionSVG from '../../assets/svg/mobileMainPage.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import LogoSVG from '../../assets/svg/newLogoMobile.svg';
import { LanguageHOC } from 'hoc/langHoc';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    width: '100%',
  },
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

  '@media (max-width: 768px)': {
    display: 'none',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingTop: '50px',
    flexDirection: 'row-reverse',
    '& img': {
      maxWidth: '150px',
    },
  },
}));

const FirstSectionMobile = styled.div(() => ({
  display: 'none',

  '@media (max-width: 768px)': {
    display: 'flex',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingTop: '50px',
    flexDirection: 'row-reverse',
    '& img': {
      maxWidth: '150px',
    },
  },
}));

const FirstSectionAnimation = styled.div(() => ({
  zIndex: 1,
  minWidth: '527px',
  height: '527px',
  position: 'relative',
}));

const FirstSectionImg = styled.div(() => ({
  zIndex: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
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
  '@media (max-width: 768px)': {
    '& p': {
      display: 'none',
      color: '#A3A3A3',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '10px',
      lineHeight: '20px',
      alignItems: 'center',
      letterSpacing: '0',
    },
  },
}));

const MobileDesc = styled.p(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    color: '#A3A3A3',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '10px',
    lineHeight: '20px',
    alignItems: 'center',
    letterSpacing: '0',
    padding: '0 25px',
    marginTop: '20px',
    textAlign: 'justify',
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
  '@media (max-width: 768px)': {
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0px',
  },
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
    '@media (max-width: 768px)': {
      maxWidth: '30%',
    },
  },
  '@media (max-width: 768px)': {
    paddingLeft: '20px',
    paddingRight: '20px',
    justifyContent: 'space-around',
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
  '@media (max-width: 768px)': {
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '0px',
    marginTop: '50px',
  },
}));

const FAQTitle = styled.span(() => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '800',
  fontSize: '82px',
  lineHeight: '99px',
  letterSpacing: '-1.5078px',
  marginTop: '100px',
  color: '#fff',
  '@media (max-width: 768px)': {
    fontSize: '30px',
    lineHeight: '22px',
    letterSpacing: '0px',
    marginTop: '50px',
    marginBottom: '20px',
  },
  background: 'linear-gradient(126.81deg, #1055FA -3.23%, #00D0F6 111.59%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
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
  '@media (max-width: 768px)': {
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '30px',
    '& img': {
      width: '100%',
    },
  },
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
  '@media (max-width: 768px)': {
    display: 'none',
  },
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
  '@media (max-width: 768px)': {
    width: '100%',
    flexDirection: 'column',
  },
}));

const LinksFooter = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  '@media (max-width: 768px)': {
    '& img': {
      height: '35px',
    },
  },
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
    '&.mobileHide': {
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
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
  position: 'relative',
  '@media (max-width: 768px)': {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

const LiveFeedSoon = styled.div(() => ({
  position: 'absolute',
  fontWeight: 700,
  fontSize: '18px',
  color: '#fff',
  lineHeight: '30px',
  width: '100%',
  height: '83%',
  bottom: '0',
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  background:
    'linear-gradient(134deg, rgba(17, 16, 97, 0.00) 0%, rgba(17, 16, 97, 0.00) 100%)',
  backdropFilter: 'blur(2.414539337158203px)',
}));

const LiveFeedItem = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  fontWeight: 600,
  fontZize: '20px',
  lineHeight: '16px',
  backgroundColor: '#20242f',
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
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  '& .row': {
    gap: '4px',
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    paddingTop: '28px',
    paddingBottom: '28px',
    '&.mobileHide': {
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
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
  '@media (max-width: 768px)': {
    display: 'none',
  },
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
  display: 'flex',
  flexDirection: 'column',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#AAABAE',
  marginTop: 50,
  '@media (max-width: 768px)': {
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

const FAQItem = styled.div(() => ({
  background: '#14161F',
  borderRadius: '8px',
  marginBottom: '12px',
  '& img': {
    transform: 'rotate(180deg)',
    transition: '0.3s all ease-in-out',
  },
  '&.active': {
    '& div': {
      opacity: '1',
    },
    '& img': {
      transform: 'rotate(0deg)',
    },
  },
  cursor: 'pointer',
}));

const FAQItemTitle = styled.div(() => ({
  background: 'rgba(255, 255, 255, 0.05)',
  opacity: '0.64',
  padding: '20px 25px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'space-between',
  transition: 'ease-in 0.1s',
  width: ' 100%',
  '&:hover': {
    opacity: '1',
  },
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
}));

const FAQItemDescription = styled.div<{ isOpened: boolean }>(
  ({ isOpened }) => ({
    transition: '0.3s all ease, 0.2s opacity ease',
    maxHeight: isOpened ? '100vh' : '0',
    opacity: isOpened ? '1' : '0',
    padding: isOpened ? '20px' : '0 20px',
    color: 'rgba(255, 255, 255, 0.9)',
  }),
);

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

const MobileSection = styled.img(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
  },
}));

const FooterMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    padding: '50px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2027',
    width: '100%',
    marginTop: 100,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
}));

const FooterContainerMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
}));

const FooterLogo = styled.img(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
    height: '60px',
  },
}));

const FooterItemMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '15px',
    color: '#8E8F93',
    fontWeight: 'bold',
  },
}));

export const MainPagePure = ({ lang }: any) => {
  console.log(lang);
  const [openAccordeon, setOpenAccordeon] = useState<string>('');
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      setImagePos({ x: event.clientX, y: event.clientY });
    },
    [setImagePos],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const FirstSectionCoins = styled.div<{
    top: string;
    left: string;
    coefficient: number;
    denominatorOne: number;
    denominatorTwo: number;
  }>(({ top, left, coefficient, denominatorOne, denominatorTwo }) => ({
    top,
    left,
    zIndex: 0,
    position: 'absolute',
    transform: `translate3d(${(imagePos.x * coefficient) / denominatorOne}px, ${
      (imagePos.y * coefficient) / denominatorTwo
    }px, 0px)`,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  }));

  const coins = useMemo(() => {
    return [
      {
        img: OneCoin,
        top: '90px',
        left: '50px',
        coefficient: 0.18,
        denominatorOne: 20,
        denominatorTwo: 20,
      },
      {
        img: TwoCoin,
        top: '73px',
        left: '322px',
        coefficient: 0.2,
        denominatorOne: 12,
        denominatorTwo: 10,
      },
      {
        img: ThreeCoin,
        top: '275px',
        left: '85px',
        coefficient: 0.18,
        denominatorOne: 20,
        denominatorTwo: 20,
      },
      {
        img: FourCoin,
        top: '115px',
        left: '385px',
        coefficient: 0.15,
        denominatorOne: 25,
        denominatorTwo: 10,
      },
      {
        img: FourCoin,
        top: '15px',
        left: '145px',
        coefficient: 0.25,
        denominatorOne: 10,
        denominatorTwo: 20,
      },
      {
        img: SixCoin,
        top: '180px',
        left: '345px',
        coefficient: 0.22,
        denominatorOne: 13,
        denominatorTwo: 18,
      },
    ];
  }, []);

  const firstAnimation = {
    hidden: {
      x: 300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2 },
    },
  };

  const onClickFAQItemTitle = (value: string) => () => {
    if (openAccordeon === value) {
      setOpenAccordeon('');
    } else {
      setOpenAccordeon(value);
    }
  };

  // function tryParseJSON(input: string): string | object {
  //   try {
  //     return JSON.parse(input);
  //   } catch (error) {
  //     return input;
  //   }
  // }

  // const { publicKey, wallet, requestTransaction } = useWallet();
  // let [programId, setProgramId] = useState('');
  // let [functionName, setFunctionName] = useState('');
  // let [inputs, setInputs] = useState('');
  // let [fee, setFee] = useState<number | undefined>();
  // let [transactionId, setTransactionId] = useState<string | undefined>();
  // let [status, setStatus] = useState<string | undefined>();

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout | undefined;

  //   if (transactionId) {
  //     intervalId = setInterval(() => {
  //       getTransactionStatus(transactionId!);
  //     }, 1000);
  //   }

  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [transactionId]);

  // const handleSubmit = async () => {
  //   const parsedInputs: any = [
  //     'aleo1mw58n80vnavqeznxxs448pdqjfl4d8aa0eaj9cxl2sc2gxjspvqsz6yhz0',
  //     '5000u64',
  //     //@ts-ignore
  //   ].map((elem) => tryParseJSON(elem));

  //   const aleoTransaction = Transaction.createTransaction(
  //     //@ts-ignore
  //     publicKey,
  //     WalletAdapterNetwork.Testnet,
  //     'predator_22.aleo',
  //     'mint',
  //     parsedInputs,
  //     35000,
  //   );
  //   //@ts-ignore
  //   const txId =
  //     (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
  //       aleoTransaction,
  //     )) || '';
  //   //@ts-ignore
  //   setTransactionId(txId);
  // };

  // const getTransactionStatus = async (txId: string) => {
  //   const status = await (wallet?.adapter as LeoWalletAdapter)
  //     //@ts-ignore
  //     .transactionStatus(txId);
  //   setStatus(status);
  // };

  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  return (
    <DefaultLayout>
      {/* <Loader /> */}
      <Container>
        <FirstSection>
          <FirstSectionAnimation>
            <FirstSectionImg>
              <SuspenseImg src={Nosorog} />
            </FirstSectionImg>
            {coins.map((elem) => {
              return (
                <FirstSectionCoins
                  top={elem.top}
                  left={elem.left}
                  coefficient={elem.coefficient}
                  denominatorOne={elem.denominatorOne}
                  denominatorTwo={elem.denominatorTwo}
                >
                  <SuspenseImg src={elem.img} />
                </FirstSectionCoins>
              );
            })}
          </FirstSectionAnimation>
          <motion.div initial="hidden" whileInView="visible">
            <motion.div variants={firstAnimation}>
              <FirstSectionText>
                <FirstSectionTextTitle>
                  <Aleo>{lang.ALEO_IS}</Aleo> {lang.ALEO_IS2}
                  <Web3> {lang.ALEO_IS3}</Web3>
                  {lang.ALEO_IS4}
                  {lang.ALEO_IS4}
                </FirstSectionTextTitle>
                <p>{lang.ON_ALEO}</p>
              </FirstSectionText>
            </motion.div>
          </motion.div>
        </FirstSection>
        <FirstSectionMobile>
          <SuspenseImg src={FirstScreenSVG} />
          <FirstSectionText>
            <FirstSectionTextTitle>
              <Aleo>{lang.ALEO_IS}</Aleo> {lang.ALEO_IS2}
              <Web3> {lang.ALEO_IS3}</Web3>
              {lang.ALEO_IS4}
            </FirstSectionTextTitle>
            <p>
              On Aleo Games you can choose game you want to play, invite your
              friends, make bets, claim tickets and use them to vote for future
              games, create your unique ENS. Everything is recorded on
              blockchain!
            </p>
          </FirstSectionText>
        </FirstSectionMobile>
        <MobileDesc>{lang.ON_ALEO}</MobileDesc>
        <SecondSection>
          <SecondSectionText>
            <Platform>{lang.WHAT_ALEO}</Platform>
            <br /> {lang.WHAT_ALEO2}
          </SecondSectionText>
          <SuspenseImg src={SecondScreenSVG} />
        </SecondSection>
        <BlockSection>
          <MobileSection src={MobileSectionSVG} />
          <BlockItem>
            <BlockNumber>1</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.INSTALL_LEO_WALLET}</BlockTitle>
              <BlockDesc>{lang.INSTALL_LEO_WALLET2}</BlockDesc>
              <Button>{lang.INSTALL_LEO_WALLET3}</Button>
            </BlockItemContent>
          </BlockItem>
          <BlockItem>
            <BlockNumber>2</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.GET_TOKENS}</BlockTitle>
              <BlockDesc>{lang.GET_TOKENS2}</BlockDesc>
              <Button>{lang.GET_TOKENS3}</Button>
            </BlockItemContent>
          </BlockItem>
          <BlockItem>
            <BlockNumber>3</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.CHOOSE_GAME}</BlockTitle>
              <BlockDesc>{lang.CHOOSE_GAME2}</BlockDesc>
              <Button>{lang.CHOOSE_GAME3}</Button>
            </BlockItemContent>
          </BlockItem>
          <BlockItem>
            <BlockNumber>4</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.INVITE1} </BlockTitle>
              <BlockDesc>{lang.INVITE2}</BlockDesc>
              <Button>{lang.INVITE3}</Button>
            </BlockItemContent>
          </BlockItem>
          <BlockItem>
            <BlockNumber>5</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.CREATE_ENS1}</BlockTitle>
              <BlockDesc>{lang.CREATE_ENS2}</BlockDesc>
              <Button>{lang.CREATE_ENS3}</Button>
            </BlockItemContent>
          </BlockItem>
          <BlockItem>
            <BlockNumber>6</BlockNumber>
            <BlockItemContent>
              <BlockTitle>{lang.VOTE1} </BlockTitle>
              <BlockDesc>{lang.VOTE2} </BlockDesc>
              <Button>{lang.VOTE3} </Button>
            </BlockItemContent>
          </BlockItem>
        </BlockSection>
        <FAQBlock>
          <Platform>{lang.FAQ}</Platform>
          <FAQItem className={openAccordeon === '1' ? 'active' : ''}>
            <FAQItemTitle onClick={onClickFAQItemTitle('1')}>
              {lang.WHAT_ALEO10} <SuspenseImg src={FaqSVG} />
            </FAQItemTitle>
            <FAQItemDescription isOpened={openAccordeon === '1'}>
              {lang.WHAT_ALEO1}
            </FAQItemDescription>
          </FAQItem>
          <FAQItem className={openAccordeon === '2' ? 'active' : ''}>
            <FAQItemTitle onClick={onClickFAQItemTitle('2')}>
              {lang.HOW_USE}
              <SuspenseImg src={FaqSVG} />
            </FAQItemTitle>
            <FAQItemDescription isOpened={openAccordeon === '2'}>
              {lang.WHAT_DO_1} <br />
              {lang.WHAT_DO_2} <br />
              {lang.WHAT_DO_3}
            </FAQItemDescription>
          </FAQItem>
          <FAQItem className={openAccordeon === '3' ? 'active' : ''}>
            <FAQItemTitle onClick={onClickFAQItemTitle('3')}>
              {lang.ONCHAIN} <SuspenseImg src={FaqSVG} />
            </FAQItemTitle>
            <FAQItemDescription isOpened={openAccordeon === '3'}>
              {lang.ONCHAIN2} <br />
            </FAQItemDescription>
          </FAQItem>
          <FAQItem className={openAccordeon === '4' ? 'active' : ''}>
            <FAQItemTitle onClick={onClickFAQItemTitle('4')}>
              {lang.OFFCHAIN} <SuspenseImg src={FaqSVG} />
            </FAQItemTitle>
            <FAQItemDescription isOpened={openAccordeon === '4'}>
              {lang.OFFCHAIN2} <br />
            </FAQItemDescription>
          </FAQItem>
        </FAQBlock>
        <LiveFeed>
          <LiveFeedSoon>Live feed coming soon...</LiveFeedSoon>
          <Tab>
            {lang.LIVE_FEED}
            {/* <BlueCircle /> */}
          </Tab>
          <LiveFeedBlock>
            <LiveFeedTitle>
              <div className="th t-1">{lang.GAME} </div>
              <div className="th t-2 mobileHide "> {lang.USER}</div>
              <div className="th t-3 mobileHide"> {lang.TIME}</div>
              <div className="th t-4 mobileHide"> {lang.BID_A}</div>
              <div className="th t-5"> {lang.PAY}</div>
            </LiveFeedTitle>
            <LiveFeedItem>
              <div className="row r-1">
                <SuspenseImg src={xSVG} />
                {lang.GAME2}
              </div>
              <div className="row r-3 mobileHide">
                <SuspenseImg src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <SuspenseImg src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <SuspenseImg src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <SuspenseImg src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <img src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <img src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <img src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <img src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <img src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <img src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <img src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
              <div className="row r-5">2.82695627</div>
            </LiveFeedItem>
            <LiveFeedItem>
              <div className="row r-1">
                <img src={xSVG} />
                Chess
              </div>
              <div className="row r-3 mobileHide">
                <img src={HiddenSVG} />
                Hidden
              </div>
              <div className="row r-3 mobileHide">23:26</div>
              <div className="row r-4 mobileHide">2.59950002</div>
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
      <FooterMobile>
        <FooterContainerMobile>
          <FooterItemMobile>
            <span>
              <LinksFooter>
                <img src={twitterWhiteSVG} />
                <img src={githubWhiteSVG} />
                <img src={discordWhiteSVG} />
              </LinksFooter>
            </span>
          </FooterItemMobile>
          <FooterItemMobile>
            <span>Aleo.org</span>
            <span>Home</span>
            <span>Our Blog</span>
          </FooterItemMobile>
          <FooterItemMobile>
            <span>For Developers</span>
            <span>Aleo Studio</span>
            <span>Aleo Explorer</span>
            <span>Aleo Package Manager</span>
            <span>Aleo Developer Docs</span>
          </FooterItemMobile>
          <FooterItemMobile>
            <FooterLogo src={LogoSVG} />
          </FooterItemMobile>
        </FooterContainerMobile>
      </FooterMobile>
    </DefaultLayout>
  );
};

const MainPageCached = React.memo(MainPagePure);

export const MainPage = LanguageHOC(MainPageCached, 'main');
