import axios from 'axios';

const authSvcPath = 'https://auth.yaku.ai/api/v1/auth';

export const getGameUser = async (accessToken: string) => {
  const { data } = await axios.post(`${authSvcPath}/me`, {
    accessToken,
  });
  return data;
};

export const getChallenge = async (address: string) => {
  const { data } = await axios.post(`${authSvcPath}/challenge`, {
    address,
    type: 'web3',
  });
  return data;
};

export const linkWeb3 = async ({
  address,
  chain = 'solana',
  signature,
  id,
  accessToken,
}: {
  address: string;
  chain: 'solana' | 'eth' | string;
  signature: string;
  id: string;
  accessToken: string;
}) => {
  const { data } = await axios.post(`${authSvcPath}/link`, {
    address,
    chain,
    id,
    signature,
    accessToken,
    type: 'web3',
  });
  return data;
};
