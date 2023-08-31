import styled from '@emotion/styled';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Footer } from 'layouts/Footer';
import { useEffect, useState } from 'react';
import { LanguageHOC } from 'hoc/langHoc';
import walletImage from '../../assets/svg/walletImage.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { Modal } from 'components/Modal/Modal';
import { Show } from 'components/Show/Show';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
  '@media (max-width: 768px)': {
    padding: '20px',
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
    fontSize: '30px',
    textAlign: 'center',
  },
}));

const VoteItem = styled.div(() => ({
  width: '80%',
  background:
    'linear-gradient(98.8deg, rgba(255, 255, 255, 0.06) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: 'blur(10.3219px)',
  height: '400px',
  borderRadius: '8px',
  border: '1px solid #2D2D2F',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    width: '100%',
    padding: '20px',
    height: 'fit-content',
  },
}));

const VoteLeft = styled.div(() => ({
  maxWidth: '400px',
  height: '200px',
}));

const Title = styled.div(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 700,
  lineHeight: '32px',
  marginBottom: '20px',
  fontSize: '25px',
  '@media (max-width: 768px)': {
    textAlign: 'center',
  },
}));

const Description = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
  color: '#fff',
  '@media (max-width: 768px)': {
    textAlign: 'center',
  },
}));

const VoteRight = styled.div(() => ({
  height: '200px',
  width: '50%',
  border: '1px solid #2D2D2D',
  borderRadius: '8px',
  '@media (max-width: 768px)': {
    width: '100%',
  },
}));

const Result = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '22px',
  color: '#fff',
  borderBottom: '1px solid #2D2D2D',
  borderRadius: '8px',
  padding: '8px 20px',
  marginBottom: '12px',
}));

const VoteBlock = styled.div(() => ({
  width: 'fit-content',
  paddingLeft: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
  color: '#fff',
  '& div': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  '@media (max-width: 768px)': {
    fontSize: '12px',
  },
}));

const VoteProgress = styled.div<{ value: number }>(({ value }) => ({
  width: '240px',
  height: '6px',
  background: `linear-gradient(90deg, #0C6BFA 0%, #1663D6 ${value}%, rgba(34, 89, 171, 0) ${
    value + 20
  }%)`,
  borderRadius: '6px',
  marginBottom: '10px',
  '@media (max-width: 768px)': {
    width: '50%',
  },
}));

const VoteProgressContainer = styled.div((props: any) => ({
  position: 'relative',
  width: '240px',
  height: '6px',
  background: `#26282F`,
  borderRadius: '6px',
  '@media (max-width: 768px)': {
    minWidth: '100px',
    maxWidth: '130px',
  },
}));

const VoteInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  '@media (max-width: 768px)': {
    fontSize: '12px',
  },
}));

const VoteCheckBox = styled.div(() => ({
  width: '10px',
  height: '10px',
  border: '1px solid #FFFFFF',
  borderRadius: '50%',
  cursor: 'pointer',
  '&.active': {
    backgroundColor: '#1056FA',
  },
}));

const VoteRightInfo = styled.div(() => ({
  display: 'flex',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#A3A3A3',
  '@media (max-width: 768px)': {
    fontSize: '12px',
    textAlign: 'center',
  },
}));

const VoteRightInfoTitle = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#fff',
  marginBottom: '12px',
  '@media (max-width: 768px)': {
    fontSize: '12px',
    textAlign: 'center',
  },
}));

const VotingBlock = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px',
}));

const ConnectModal = styled.div(() => ({
  width: '430px',
  height: '150px',
  backgroundColor: '#1A1C24',
  border: '1px solid #313236',
  borderRadius: '8px',
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ContentModal = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '18px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingLeft: '25px',
}));

const ImgModal = styled.div(() => ({
  marginTop: '40px',
}));

export const VotingPure = ({ lang }: any) => {
  const [paramAnimation, setParamAnimation] = useState(0);

  const [chosedVariant, setChosedVariant] = useState('');

  const VoteProgressAnimation = styled.div(() => ({
    height: '6px',
    borderRadius: '6px',
    background: `#26282F`,
    position: 'absolute',
    top: 0,
    right: 0,
    left: `${paramAnimation}px`,
  }));

  useEffect(() => {
    if (paramAnimation < 240) {
      const timeout = setTimeout(() => {
        setParamAnimation((prevIndex) => prevIndex + 3);
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [paramAnimation]);

  return (
    <>
      <DefaultLayout>
        <Show visible={!!chosedVariant}>
          <Modal autoClose={true} onClose={() => setChosedVariant('')}>
            <ConnectModal>
              <ContentModal>
                You don't have enough <br /> votes for voting!
              </ContentModal>
              <ImgModal>
                <img src={walletImage} />
              </ImgModal>
            </ConnectModal>
          </Modal>
        </Show>
        <Container>
          <TitleBlock>{lang.DAO}</TitleBlock>
          <VoteItem>
            <VoteLeft>
              <Title>{lang.VOTE}</Title>
              <Description>{lang.VOTE_TEXT}</Description>
            </VoteLeft>
            <VoteRight>
              <Result>{lang.RESULT}</Result>
              <VoteRightInfo>
                <div>
                  <VoteBlock>
                    <div>
                      {lang.YES}
                      <span style={{ marginRight: '20px' }}>60%</span>
                    </div>
                    <VotingBlock onClick={() => setChosedVariant('60')}>
                      <VoteProgressContainer>
                        <VoteProgressAnimation />
                        <VoteProgress value={60} />
                      </VoteProgressContainer>{' '}
                      <VoteCheckBox />
                    </VotingBlock>
                  </VoteBlock>
                  <VoteBlock>
                    <div>
                      {lang.NO}
                      <span style={{ marginRight: '20px' }}>30%</span>
                    </div>
                    <VotingBlock onClick={() => setChosedVariant('30')}>
                      <VoteProgressContainer>
                        <VoteProgressAnimation />
                        <VoteProgress value={30} />
                      </VoteProgressContainer>{' '}
                      <VoteCheckBox />
                    </VotingBlock>
                  </VoteBlock>
                  <VoteBlock>
                    <div>
                      {lang.ABSTAIN}
                      <span style={{ marginRight: '20px' }}>10%</span>
                    </div>
                    <VotingBlock onClick={() => setChosedVariant('10')}>
                      <VoteProgressContainer>
                        <VoteProgressAnimation />
                        <VoteProgress value={10} />
                      </VoteProgressContainer>{' '}
                      <VoteCheckBox />
                    </VotingBlock>
                  </VoteBlock>
                </div>

                <VoteInfo>
                  <VoteRightInfoTitle>
                    {lang.VOTES_US} <span style={{ color: '#01C2F9' }}>0</span>
                  </VoteRightInfoTitle>
                  <span style={{ marginBottom: '6px' }}>
                    {lang.START_D} 11.06.2023
                  </span>
                  <span>{lang.END_D} 28.06.2023</span>
                </VoteInfo>
              </VoteRightInfo>
            </VoteRight>
          </VoteItem>
        </Container>
        <Footer />
      </DefaultLayout>
    </>
  );
};

export const Voting = LanguageHOC(VotingPure, 'voting');
