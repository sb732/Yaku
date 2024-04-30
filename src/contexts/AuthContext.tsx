'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { STAKING_REWARD_MINT, USDCMINT, evmConfig } from '@/configs';
import { useRequests } from '@/hooks/useRequests';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { GetProgramAccountsFilter, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useRequest } from 'ahooks';
import { FC, ReactNode, useState, createContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getBalance as getEthBalance } from '@wagmi/core';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { get } from 'lodash';

export const AuthContext = createContext<any>(null);
export const AuthHandlerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState('');
  const [gameUser, setGameUser] = useState({});
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [yakuBalance, setYakuBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const wallet = useWallet();
  const account = useAccount();
  const { connection } = useConnection();
  const handleSignUpError = (error: any) => {
    if (error?.response?.data?.message === 'Require sign up') {
      console.debug('Require Sign up');
    }
  };
  const {
    yaku: {
      auth: { login, loginWithEvm, loginWithBlockus },
      staked: { getStakedList },
    },
  } = useRequests();
  const { data: staked, runAsync: getStakedAsync } = useRequest(getStakedList, {
    manual: true,
    cacheKey: 'yaku-staked',
    setCache: (data) =>
      global?.localStorage?.setItem('yaku-staked', JSON.stringify(data)),
    getCache: () =>
      JSON.parse(global?.localStorage?.getItem('yaku-staked') || '{}'),
  });
  const {
    data: { user, token, avatar } = { user: {}, token: undefined, avatar: {} },
    runAsync: loginAsync,
  } = useRequest(login, {
    manual: true,
    cacheKey: 'yaku-profile',
    setCache: (data) =>
      global?.localStorage?.setItem('yaku-profile', JSON.stringify(data)),
    getCache: () =>
      JSON.parse(global?.localStorage?.getItem('yaku-profile') || '{}'),
    onSuccess: ({ user }) => {
      if (user && user.wallet) {
        getStakedAsync(user.wallet);
        if (user.ethAddress) {
          getEthBalance(evmConfig, {
            address: user.ethAddress,
            unit: 'ether',
          }).then(({ value, decimals = 18 }) =>
            setEthBalance(+value.toString() / 10 ** decimals)
          );
        }
      }
    },
    onError: (error) => handleSignUpError(error),
  });
  const {
    data: { user: evmUser, token: evmToken } = { user: {}, token: undefined },
    runAsync: loginEvmAsync,
  } = useRequest(loginWithEvm, {
    manual: true,
    cacheKey: 'yaku-evm-profile',
    setCache: (data) =>
      global?.localStorage?.setItem('yaku-evm-profile', JSON.stringify(data)),
    getCache: () =>
      JSON.parse(global?.localStorage?.getItem('yaku-evm-profile') || '{}'),
    onSuccess: ({ user: evmUser }) => {
      if (evmUser && evmUser.wallet && !staked) {
        getStakedAsync(evmUser.wallet);
      }
      if (evmUser && evmUser.ethAddress) {
        getEthBalance(evmConfig, {
          address: evmUser.ethAddress,
          unit: 'ether',
        }).then(({ value, decimals = 18 }) =>
          setEthBalance(+value.toString() / 10 ** decimals)
        );
      }
    },
    onError: (error) => handleSignUpError(error),
  });

  const getSolBalance = async () => {
    let balance = 0;
    if (wallet.publicKey) {
      balance = await connection.getBalance(wallet.publicKey);
    }
    setSolBalance(balance / LAMPORTS_PER_SOL);
    return balance / LAMPORTS_PER_SOL;
  };

  const getTokenBalance = async (token: 'usdc' | 'yaku' | 'both' = 'both') => {
    if (wallet.publicKey) {
      const genericFilters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 32,
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ];
      const usdcFilters: GetProgramAccountsFilter[] = [
        ...genericFilters,
        {
          memcmp: {
            offset: 0, //number of bytes
            bytes: USDCMINT, //base58 encoded string
          },
        },
      ];
      const yakuFilters: GetProgramAccountsFilter[] = [
        ...genericFilters,
        {
          memcmp: {
            offset: 0, //number of bytes
            bytes: STAKING_REWARD_MINT, //base58 encoded string
          },
        },
      ];
      if (['usdc', 'both'].includes(token)) {
        const usdcAccounts = await connection.getParsedProgramAccounts(
          TOKEN_PROGRAM_ID,
          { filters: usdcFilters }
        );
        usdcAccounts.forEach((account, i) => {
          setUsdcBalance(
            get(account, 'account.data.parsed.info.tokenAmount.uiAmount', 0)
          );
        });
      }
      if (['yaku', 'both'].includes(token)) {
        const yakuAccounts = await connection.getParsedProgramAccounts(
          TOKEN_PROGRAM_ID,
          { filters: yakuFilters }
        );
        yakuAccounts.forEach((account, i) => {
          setYakuBalance(
            get(account, 'account.data.parsed.info.tokenAmount.uiAmount', 0)
          );
        });
      }
    }
  };

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      loginAsync({ wallet: wallet.publicKey?.toBase58() });
      getSolBalance();
    }
  }, [wallet.publicKey]);

  useEffect(() => {
    if (account.isConnected && account.address) {
      loginEvmAsync({ ethAddress: account.address });
      getEthBalance(evmConfig, {
        address: account?.address,
        unit: 'ether',
      }).then(({ value, decimals = 18 }) =>
        setEthBalance(+value.toString() / 10 ** decimals)
      );
    }
  }, [account.address]);

  return (
    <AuthContext.Provider
      value={{
        avatar,
        accessToken,
        gameUser,
        token: token || evmToken,
        yakuProfile: user || evmUser,
        staked,
        solBalance,
        usdcBalance,
        yakuBalance,
        ethBalance,
        setAccessToken,
        setGameUser,
        getSolBalance,
        getTokenBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
