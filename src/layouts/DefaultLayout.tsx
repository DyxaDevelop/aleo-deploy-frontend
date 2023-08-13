import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const Container = styled.div(() => ({
  paddingLeft: '170px',
  backgroundColor: '#12141D',
  '@media (max-width: 768px)': {
    paddingLeft: '0px',
  },
}));

export const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <Sidebar />
      <Header />
      <Container>{children}</Container>
    </>
  );
};
