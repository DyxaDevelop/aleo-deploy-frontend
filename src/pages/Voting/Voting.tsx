import styled from '@emotion/styled';
import { DefaultLayout } from '../../layouts/DefaultLayout';

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
}));

const Description = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
  color: '#fff',
}));

const VoteRight = styled.div(() => ({
  height: '200px',
  width: '50%',
  border: '1px solid #2D2D2D',
  borderRadius: '8px',
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
}));

const VoteProgress = styled.div((props: any) => ({
  width: '240px',
  height: '6px',
  background: `linear-gradient(90deg, #0C6BFA 0%, #1663D6 ${
    props.value
  }%, rgba(34, 89, 171, 0) ${props.value + 20}%)`,
  borderRadius: '6px',
  marginBottom: '10px',
}));

const VoteProgressContainer = styled.div((props: any) => ({
  width: '240px',
  height: '6px',
  background: `#26282F`,
  borderRadius: '6px',
}));

const VoteInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const VoteCheckBox = styled.div(() => ({
  width: '10px',
  height: '10px',
  border: '1px solid #FFFFFF',
  borderRadius: '50%',
}));

const VoteRightInfo = styled.div(() => ({
  display: 'flex',
  gap: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#A3A3A3',
}));

const VoteRightInfoTitle = styled.div(() => ({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#fff',
  marginBottom: '12px',
}));

const VotingBlock = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px',
}));

export const Voting = () => (
  <>
    <DefaultLayout>
      <Container>
        <TitleBlock>DAO Proposals</TitleBlock>
        <VoteItem>
          <VoteLeft>
            <Title>Vote for Chess</Title>
            <Description>
              Chess is a board game for two players, called White and Black,
              each controlling an army of chess pieces in their color, with the
              objective to chekmate the opponents king.
            </Description>
          </VoteLeft>
          <VoteRight>
            <Result>Result</Result>
            <VoteRightInfo>
              <div>
                <VoteBlock>
                  <div>
                    Yes
                    <span style={{ marginRight: '20px' }}>60%</span>
                  </div>
                  <VotingBlock>
                    <VoteProgressContainer>
                      <VoteProgress value={60} />
                    </VoteProgressContainer>{' '}
                    <VoteCheckBox />
                  </VotingBlock>
                </VoteBlock>
                <VoteBlock>
                  <div>
                    No
                    <span style={{ marginRight: '20px' }}>30%</span>
                  </div>
                  <VotingBlock>
                    <VoteProgressContainer>
                      <VoteProgress value={30} />
                    </VoteProgressContainer>{' '}
                    <VoteCheckBox />
                  </VotingBlock>
                </VoteBlock>
                <VoteBlock>
                  <div>
                    Abstain
                    <span style={{ marginRight: '20px' }}>10%</span>
                  </div>
                  <VotingBlock>
                    <VoteProgressContainer>
                      <VoteProgress value={10} />
                    </VoteProgressContainer>{' '}
                    <VoteCheckBox />
                  </VotingBlock>
                </VoteBlock>
              </div>

              <VoteInfo>
                <VoteRightInfoTitle>
                  Votes used: <span style={{ color: '#01C2F9' }}>0</span>
                </VoteRightInfoTitle>
                <span style={{ marginBottom: '6px' }}>
                  Start date: 11.06.2023
                </span>
                <span>End date: 28.06.2023</span>
              </VoteInfo>
            </VoteRightInfo>
          </VoteRight>
        </VoteItem>
      </Container>
    </DefaultLayout>
  </>
);
