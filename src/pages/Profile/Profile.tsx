import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import profileAvatarSVG from '../../assets/svg/profileAvatar.svg';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import xSVG from '../../assets/svg/x.svg';
import HiddenSVG from '../../assets/svg/hidden.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
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
}));

const ContentBlock = styled.div(() => ({
  display: 'flex',
  width: '900px',
  margin: 'auto',
  gap: '15px',
}));

const LeftBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  gap: '15px',
}));

const RightBlock = styled.div(() => ({
  display: 'flex',
  width: '60%',
  flexDirection: 'column',
  gap: '15px',
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
  height: 'calc(100% - 83px)',
  padding: '16px',
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

const LiveFeedTitle = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#fff',
  width: '100%',
  '& .t-1': {
    paddingLeft: '6px',
  },
  '& .th': {
    display: 'flex',
    width: '20%',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  '& .t-5': {
    justifyContent: 'flex-end',
    paddingRight: '6px',
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
    color: '#1FFF20',
  },
}));

export const Profile = () => (
  <>
    <DefaultLayout>
      <Container>
        <TitleBlock>Your personal profile</TitleBlock>
        <ContentBlock>
          <LeftBlock>
            <ENSBlock>
              <div>
                <span>Your ENS/address</span>
                <ENS to={'/ens'}>Create your ENS</ENS>
              </div>
              <ContentDynamic>
                <img src={profileAvatarSVG} />
              </ContentDynamic>
            </ENSBlock>
            <ClaimVotes>
              <span>Claim Votes</span>
              <ContentDynamic>
                <Button>Claim</Button>
              </ContentDynamic>
            </ClaimVotes>
            <AvailableVotes>
              <span>Available votes</span>
              <ContentDynamic>50</ContentDynamic>
            </AvailableVotes>
            <Balance>
              <span>Your balance</span>
              <ContentDynamic>100$</ContentDynamic>
            </Balance>
          </LeftBlock>
          <RightBlock>
            <TotalWinnings>
              <span>Total winnings</span>
              <span style={{ color: '#02C4F7' }}>1,000$</span>
            </TotalWinnings>
            <LastGames>
              <LiveFeed>
                {/* <Tab>Live Feed</Tab> */}
                <LiveFeedBlock>
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
                </LiveFeedBlock>
              </LiveFeed>
            </LastGames>
          </RightBlock>
        </ContentBlock>
      </Container>
    </DefaultLayout>
  </>
);
