import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import walletImage from '../../assets/svg/walletImage.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { Modal } from 'components/Modal/Modal';
import { useLayoutEffect, useRef, useState } from 'react';

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

export const PrivateRoute = (props: any) => {
  const { publicKey, signMessage } = useWallet();
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    //@ts-ignore
    setWidth(ref.current.offsetWidth);
    //@ts-ignore
    setHeight(ref.current.offsetHeight);
  }, []);

  if (!publicKey && width && width > 600) {
    return (
      <div ref={ref}>
        <Modal>
          <ConnectModal>
            <ContentModal>
              Please connect your wallet!
              <WalletMultiButton style={{ width: 'fit-content' }} />
            </ContentModal>
            <ImgModal>
              <SuspenseImg src={walletImage} />
            </ImgModal>
          </ConnectModal>
        </Modal>
        {props.children}
      </div>
    );
  }
  return <div ref={ref}>{props.children}</div>;
};
