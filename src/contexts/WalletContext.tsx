/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  createContext,
} from 'react';

// project imports
import { DEFAULT_RPC } from '../configs';

// web3 imports
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const [selectedEndpt] = useState(DEFAULT_RPC);
  const endpoint = useMemo(() => selectedEndpt, [selectedEndpt]);

  const wallets = useMemo(() => [], [network]);

  const onError = useCallback((error: WalletError) => {
    // custom handling for Slope since it doesn't return a message
    switch (error.name) {
      case 'WalletAccountError':
        console.error(`The request was rejected, please try again.`);
        break;
      case 'WalletNotSelectedError':
        console.error(`Wallet has not been selected.`);
        break;
      default:
        console.error(error);
        break;
    }
  }, []);

  return (
    <ConnectionProvider
      endpoint={endpoint}
      config={{ confirmTransactionInitialTimeout: 240000 }}
    >
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
