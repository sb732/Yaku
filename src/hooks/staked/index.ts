import axios from 'axios';

const nftSvcPath = 'https://nft.yaku.ai/api';

export const getStakedList = async (wallet: string) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/yaku/staked`, {
    wallet,
  });
  return data;
};

export const getYakuNfts = async (wallet: string) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/yaku/wallet`, {
    wallet,
  });
  return data;
};
