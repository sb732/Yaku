import axios from 'axios';
import { useState } from 'react';
import { getById, list, join, roll } from './missions';
import {
  getGas,
  getBalance,
  getENS,
  getTokens,
  getWalletNftMetadata,
  getWalletTransactions,
} from './eth';
import {
  getYakuTowersInfo,
  getDashboardSlides,
  getYakuCollectionStats,
} from './yaku';
import { getYakuNfts, getStakedList } from './staked';
import { linkWeb3, getChallenge, getGameUser } from './auth';
// eslint-disable-next-line import/prefer-default-export
export function useRequests() {
  const hubSvcPath = 'https://service.yaku.ai/api';
  const nftSvcPath = 'https://nft.yaku.ai/api';
  const agSvcPath = 'https://ag.yaku.ai/api';

  const [csrfToken, setCsrfToken] = useState('');
  const [agToken, setAgToken] = useState('');

  const csrf = async () => {
    const {
      data: { token },
    } = await axios.get(`${hubSvcPath}/csrf`);
    setCsrfToken(token);
    return token;
  };

  const agCsrf = async () => {
    const {
      data: { token },
    } = await axios.get(`${agSvcPath}/csrf`);
    setAgToken(token);
    return token;
  };

  const refreshMetadata = async (address: string, tokenId: string) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/user/eth/nft/refresh`,
      {
        address,
        tokenId,
      },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };

  const getWalletNfts = async (address: string) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/user/eth/nfts/fetch`,
      { address },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };
  const login = async ({ wallet }: { wallet: string }) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/v2/user/login`,
      { wallet },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };
  const loginWithEvm = async ({ ethAddress }: { ethAddress: string }) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/v2/user/login/eth`,
      { ethAddress },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };
  const loginWithBlockus = async ({ blockus }: { blockus: any }) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/v2/user/login/blockus`,
      { blockus },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };
  const getWalletProfile = async (wallet: string, chain = 'SOL') => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const params: any = {
      picks: ['user', 'staked', 'collections', 'eth', 'communities'],
    };
    if (chain === 'SOL') {
      params.wallet = wallet;
    } else if (chain === 'ETH') {
      params.ethAddress = wallet;
    }
    const { data } = await axios.post(
      `${hubSvcPath}/user/wallet/profile`,
      params,
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };

  const getCollectionsByWallet = async (wallet: string) => {
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.get(
      `${hubSvcPath}/wallet/${wallet}/collections`,
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };

  const getSocialWallets = async (wallets: string[]) => {
    if (!wallets) {
      return [];
    }
    const token: any = !csrfToken ? await csrf() : csrfToken;
    const { data } = await axios.post(
      `${hubSvcPath}/social/wallets`,
      { wallets },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data || [];
  };

  const getNFTLeaderBoards = async () => {
    const { data } = await axios.post(`${nftSvcPath}/leaderboard/top10`, {});
    return data || {};
  };

  const getCollectionsFP = async (symbols: string[]) => {
    const token: any = !agToken ? await agCsrf() : agToken;
    const { data } = await axios.post(
      'https://ag.yaku.ai/api/me/collections/fp',
      { collectionSymbols: symbols },
      {
        headers: {
          'csrf-token': token,
        },
      }
    );
    return data;
  };

  return {
    csrf,
    csrfToken,
    collection: {
      getCollectionsByWallet,
      getSocialWallets,
      getNFTLeaderBoards,
      getCollectionsFP,
    },
    yaku: {
      getWalletProfile,
      getYakuTowersInfo,
      getYakuCollectionStats,
      getDashboardSlides,
      staked: {
        getYakuNfts,
        getStakedList,
      },
      auth: {
        login,
        loginWithEvm,
        loginWithBlockus,
      },
    },
    eth: {
      getGas,
      getBalance,
      getENS,
      getTokens,
      getWalletNfts,
      getWalletNftMetadata,
      getWalletTransactions,
      refreshMetadata,
    },
    missions: {
      getById,
      list,
      join,
      roll,
    },
    auth: {
      linkWeb3,
      getChallenge,
      getGameUser,
    },
  };
}
