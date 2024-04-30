import axios from 'axios';

const nftSvcPath = 'https://nft.yaku.ai/api';

export const list = async (filters: any) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/mission/list`, {
    filters,
  });
  return data;
};

export const getById = async (id: string, wallet: string) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/mission`, {
    id,
    wallet,
  });
  return data;
};

export const join = async (
  mission: string,
  user: string,
  wallet: string,
  avatars: string[]
) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/mission/join`, {
    mission,
    user,
    wallet,
    avatars,
  });
  return data;
};

export const roll = async (mission: string, user: string, wallet: string) => {
  const { data } = await axios.post(`${nftSvcPath}/v2/mission/roll`, {
    id: mission,
    user,
    wallet,
  });
  return data;
};
