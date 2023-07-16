import React, { useEffect, useMemo, useState } from 'react';
import {
  WalletProvider,
  useWallet,
} from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  // WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
// import styled from '@emotion/styled';
import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './chess/src/redux/store';
import './index.css';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');

// const WalletMultiButtonStyled = styled(WalletMultiButton)(() => ({
//   // background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
// }));

function App() {
  const { publicKey, wallet, requestTransaction } = useWallet();
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
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
