import React, { useMemo } from 'react';
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  // WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
// import styled from '@emotion/styled';
import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');

// const WalletMultiButtonStyled = styled(WalletMultiButton)(() => ({
//   // background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
// }));

function App() {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Leo Demo App',
      }),
    ],
    [],
  );
  return (
    <div className="App">
      {' '}
      <BrowserRouter>
        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          // @ts-ignore
          network={WalletAdapterNetwork.Localnet}
          autoConnect
        >
          <WalletModalProvider>
            <AppRoutes />
          </WalletModalProvider>
        </WalletProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
