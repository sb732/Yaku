'use client';
import { useRequests } from '@/hooks/useRequests';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import bs58 from 'bs58';
import useAuth from '@/hooks/useAuth';
import { isEmpty } from 'lodash';
export default function Web2login() {
  const searchParams = useSearchParams();
  const wallet = useWallet();
  const [challenge, setChallenge] = useState({});
  const {
    auth: { linkWeb3, getChallenge, getGameUser },
  } = useRequests();
  const { setAccessToken, setGameUser, gameUser, accessToken } = useAuth();

  const signChallenge = async (newChallenge: any) => {
    console.debug('wallet.signMessage', !!wallet?.signMessage);
    if (!wallet || !wallet.signMessage) return '';
    const message = new TextEncoder().encode(
      JSON.stringify({ message: newChallenge })
    );
    const signed = await wallet.signMessage(message);
    const signature = bs58.encode(Uint8Array.from(signed));
    return signature;
  };

  const linkWallet = async (token: string) => {
    let newGameUser;
    if (!gameUser || isEmpty(gameUser)) {
      newGameUser = await getGameUser(token);
      setGameUser(newGameUser);
    }
    console.debug('public', !!wallet?.publicKey);
    if (!wallet?.publicKey) return;
    console.debug('publicKey', wallet.publicKey?.toBase58());
    const newChallenge = await getChallenge(wallet.publicKey?.toBase58());
    setChallenge(newChallenge);
    const signature = await signChallenge(newChallenge);
    if (!signature) return;
    const requestBody = {
      signature,
      accessToken: token,
      chain: 'solana',
      address: wallet.publicKey?.toBase58(),
      id: newGameUser?.id ?? gameUser.id,
    };
    const result = await linkWeb3(requestBody);
    console.debug(result);
    const newData = await getGameUser(token);
    setGameUser(newData);
    return result;
  };

  useEffect(() => {
    let subscribed = true;
    const blockusAccessToken = searchParams.get('blockusAccessToken');
    if (blockusAccessToken) {
      console.debug('blockusAccessToken', blockusAccessToken);
      setAccessToken(blockusAccessToken);
      linkWallet(blockusAccessToken);
    }
    return () => {
      subscribed = false;
    };
  }, []);

  useEffect(() => {
    if (wallet?.publicKey) {
      linkWallet(accessToken);
    }
  }, [wallet?.publicKey]);

  return <></>;
}
