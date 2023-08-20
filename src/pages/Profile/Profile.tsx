import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import profileAvatarSVG from '../../assets/svg/profileAvatar.svg';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import xSVG from '../../assets/svg/x.svg';
import HiddenSVG from '../../assets/svg/hidden.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { Modal } from 'components/Modal/Modal';
import walletImage from '../../assets/svg/walletImage.svg';
import { Footer } from 'layouts/Footer';
import { LanguageHOC } from 'hoc/langHoc';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';

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

const TitleBlock = styled.div(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '40px',
  textFillColor: 'transparent',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const ContentBlock = styled.div(() => ({
  display: 'flex',
  width: '900px',
  margin: 'auto',
  gap: '15px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    maxWidth: '100%',
    padding: '20px',
  },
}));

const UseDesktop = styled.div(() => ({
  display: 'none',

  '@media (max-width: 768px)': {
    background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
    backgroundClip: 'text',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '40px',
    textFillColor: 'transparent',
    marginBottom: '16px',
    width: '100%',
    textAlign: 'center',
    display: 'block',
  },
}));

const LeftBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  gap: '15px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
}));

const RightBlock = styled.div(() => ({
  display: 'flex',
  width: '60%',
  flexDirection: 'column',
  gap: '15px',
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
}));

const ENSBlock = styled.div(() => ({
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  background: '#1A1C24',
  borderRadius: '8px',
  height: '95px',
  boxSizing: 'border-box',
  padding: '16px 20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

const ClaimVotes = styled.div(() => ({
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  background: '#1A1C24',
  borderRadius: '8px',
  height: '95px',
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '12px',
}));

const AvailableVotes = styled.div(() => ({
  background: '#1A1C24',
  borderRadius: '8px',
  height: '65px',
  padding: '16px 20px',
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  paddingBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Balance = styled.div(() => ({
  background: '#1A1C24',
  borderRadius: '8px',
  height: '65px',
  padding: '16px 20px',
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  paddingBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TotalWinnings = styled.div(() => ({
  background: '#1A1C24',
  borderRadius: '8px',
  height: '65px',
  padding: '16px 20px',
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  paddingBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const LastGames = styled.div(() => ({
  background: '#1A1C24',
  borderRadius: '8px',
  height: 'calc(100% - 93px)',
  overflow: 'hidden',
}));

const Button = styled.div(() => ({
  width: '80px',
  height: '29px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '8px',
  fontSize: '12px',
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

const ContentDynamic = styled.span(() => ({
  width: '150px',
  display: 'flex',
  justifyContent: 'center',
}));

const ENS = styled(NavLink)(() => ({
  width: '150px',
  display: 'flex',
  justifyContent: 'flex-start',
  color: '#02C0F9',
  fontWeight: '500',
  fontSize: '12px',
}));

const LiveFeedBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowY: 'auto',
  maxHeight: '100%',
  '& img': {
    width: '10px',
  },
}));

const LiveFeed = styled.div(() => ({
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflow: 'hidden',
  maxHeight: '100%',
  position: 'relative',
}));

const LiveFeedSoon = styled.div(() => ({
  position: 'absolute',
  fontWeight: 700,
  fontSize: '16px',
  color: '#fff',
  lineHeight: '30px',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  background:
    'linear-gradient(134deg, rgba(0, 0, 0, 0.50) 0%, rgba(255, 255, 255, 0) 100%)',
  // background:
  //   'linear-gradient(98.8deg, rgba(255, 255, 255, 0.08) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: 'blur(1.52719px)',
}));

const LiveFeedItem = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '16px',
  backgroundColor: '#222732',
  borderRadius: '4px',
  '& .r-1': {
    color: '#fff',
    paddingLeft: '6px',
  },
  '& .r-2, .r-3, .r-4': {
    color: '#B1BAD3',
  },
  '& .row': {
    gap: '4px',
    display: 'flex',
    alignItems: 'center',
    width: '20%',
    paddingTop: '6px',
    paddingBottom: '6px',
  },

  '& .r-5': {
    justifyContent: 'flex-end',
    paddingRight: '6px',
    color: '#02C4F7',
  },
}));

export const ProfilePure = ({ lang }: any) => {
  const { wallet, publicKey, requestRecords } = useWallet();

  let [recordsPayloadForANS, setRecordsPayloadForANS] = useState<
    string | null
  >();
  let [recordsPayloadForToken, setRecordsPayloadForToken] = useState<
    number | null
  >();
  let [balance, setBalance] = useState<number | null>();

  function tryParseJSON(input: string): string | object {
    try {
      return JSON.parse(input);
    } catch (error) {
      return input;
    }
  }

  // useEffect(() => {
  //   if (publicKey) {
  //     if (!balance) {
  //       requestRecords!('aleogamesvoting.aleo').then((res) => {
  //         const filteredRecords = res.filter((rec) => {
  //           return !rec.spent;
  //         });
  //         let recordsFormatted = filteredRecords.map((rec) =>
  //           JSON.parse(JSON.stringify(rec, null, 2)),
  //         );
  //         let balance = 0;
  //         recordsFormatted = recordsFormatted.map((elem) => {
  //           const currentRecord =
  //             parseInt(elem.data.microcredits.replace(/[^\d]/g, ''), 10) /
  //             100000000;
  //           balance += currentRecord;
  //           return currentRecord;
  //         });
  //         setBalance(balance);
  //       });
  //     }
  //     if (!recordsPayloadForToken) {
  //       requestRecords!('aleogamestoken.aleo').then((res) => {
  //         const filteredRecords = res.filter((rec) => {
  //           return !rec.spent;
  //         });
  //         let recordsFormatted = filteredRecords.map((rec) =>
  //           JSON.parse(JSON.stringify(rec, null, 2)),
  //         );
  //         let balance = 0;
  //         recordsFormatted = recordsFormatted.map((elem) => {
  //           const currentRecord =
  //             parseInt(elem.data.microcredits.replace(/[^\d]/g, ''), 10) /
  //             100000000;
  //           balance += currentRecord;
  //           return currentRecord;
  //         });
  //         setRecordsPayloadForToken(balance);
  //       });
  //     }
  //   }
  // }, []);

  const mintTokens = async () => {
    const parsedInputs: any = [
      publicKey,
      '500u64',
      '500u128',
      //@ts-ignore
    ].map((elem) => tryParseJSON(elem));

    const aleoTransaction = Transaction.createTransaction(
      //@ts-ignore
      publicKey,
      WalletAdapterNetwork.Testnet,
      'aleogamestoken.aleo',
      'mint_public',
      parsedInputs,
      5000000,
    );
    //@ts-ignore
    const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction,
      )) || '';
    //@ts-ignore
  };

  const claimVotes = async () => {
    const parsedInputs: any = [
      publicKey,
      '21888242871839275222246405745257275088548364400416034343698204186575808495617field',
      //@ts-ignore
    ].map((elem) => tryParseJSON(elem));

    const aleoTransaction = Transaction.createTransaction(
      //@ts-ignore
      publicKey,
      WalletAdapterNetwork.Testnet,
      'aleogamesvoting.aleo',
      'mint_public',
      parsedInputs,
      5000000,
    );
    //@ts-ignore
    const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction,
      )) || '';
    //@ts-ignore
  };

  return (
    <>
      <DefaultLayout>
        <Container>
          <TitleBlock>{lang.UR_PRFL}</TitleBlock>
          <UseDesktop>Use Desktop</UseDesktop>
          <ContentBlock>
            <LeftBlock>
              <ENSBlock>
                <div>
                  <span>{lang.UR_ENS}</span>
                  <ENS to={'/ens'}>{lang.CR_ENS}</ENS>
                </div>
                <ContentDynamic>
                  <img src={profileAvatarSVG} />
                </ContentDynamic>
              </ENSBlock>
              <ClaimVotes>
                <span>{lang.CLM_VOTES}</span>
                <ContentDynamic>
                  <Button onClick={() => claimVotes()}>{lang.CLM}</Button>
                </ContentDynamic>
              </ClaimVotes>
              <AvailableVotes>
                <span>{lang.AVLB_VOTES}</span>
                <ContentDynamic>
                  {balance ? balance.toFixed(3) : '???'}
                </ContentDynamic>
              </AvailableVotes>
              <ClaimVotes onClick={() => mintTokens()}>
                <span>{lang.TOK_MINT}</span>
                <ContentDynamic>
                  <Button>{lang.MINT}</Button>
                </ContentDynamic>
              </ClaimVotes>
              <Balance>
                <span>{lang.UR_BALANCE}</span>
                <ContentDynamic>???$</ContentDynamic>
              </Balance>
            </LeftBlock>
            <RightBlock>
              <TotalWinnings>
                <span>{lang.TTL_WIN}</span>
                <span style={{ color: '#02C4F7' }}>???$</span>
              </TotalWinnings>
              <LastGames>
                <LiveFeed>
                  <LiveFeedSoon>Live feed coming soon...</LiveFeedSoon>
                  {/* <Tab>Live Feed</Tab> */}
                  <LiveFeedBlock>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <SuspenseImg src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <SuspenseImg src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <SuspenseImg src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <SuspenseImg src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <SuspenseImg src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <SuspenseImg src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <SuspenseImg src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                    <LiveFeedItem>
                      <div className="row r-1">
                        <img src={xSVG} />
                        {lang.CHESS}
                      </div>
                      <div className="row r-3">
                        <img src={HiddenSVG} />
                        {lang.HIDD}
                      </div>
                      <div className="row r-3">23:26</div>
                      <div className="row r-4">2.59950002</div>
                      <div className="row r-5">2.82695627</div>
                    </LiveFeedItem>
                  </LiveFeedBlock>
                </LiveFeed>
              </LastGames>
            </RightBlock>
          </ContentBlock>
        </Container>
        <Footer />
      </DefaultLayout>
    </>
  );
};

export const Profile = LanguageHOC(ProfilePure, 'profile');
