import { useWallet } from "@solana/wallet-adapter-react";
import { BaseWalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

export const SolanaConnectButton = () => {
  const LABELS = {
    connected: 'Connected',
    connecting: 'Connecting',
    disconnecting: 'Disconnecting',
    'has-wallet': 'Logged in',
    'no-wallet': 'Login with your Solana wallet',
    'copy-address': 'Copy Address',
    copied: 'Copied',
    'change-wallet': 'Change to other wallet',
    disconnect: 'Logout',
  };
  const { connected } = useWallet();
  return (
    <>{!connected ? (
      <BaseWalletMultiButton className='w-full' labels={LABELS} />
    ) : (
      <WalletDisconnectButton />
    )}</>
  );
};