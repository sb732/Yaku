import axios from 'axios';

const ethSvcPath = 'https://eth.yaku.ai/api';

export const ethCsrf = async () => {
  const {
    data: { token },
  } = await axios.get(`${ethSvcPath}/csrf`);
  return token;
};

export const getGas = async () => {
  const { data } = await axios.get(`${ethSvcPath}/gas`);
  return data;
};

export const getWalletTransactions = async (wallet: string) => {
  const token: any = await ethCsrf();
  const { data } = await axios.post(
    `${ethSvcPath}/wallet/tx`,
    { wallet },
    {
      headers: {
        'csrf-token': token,
      },
    }
  );
  return data;
};

export const getWalletNftMetadata = async (wallet: string) => {
  const token: any = await ethCsrf();
  const { data } = await axios.post(
    `${ethSvcPath}/metadata/wallet`,
    { wallet },
    {
      headers: {
        'csrf-token': token,
      },
    }
  );
  return data;
};

export const getTokens = async (wallet: string) => {
  const token: any = await ethCsrf();
  const { data } = await axios.post(
    `${ethSvcPath}/wallet/tokens`,
    { wallet },
    {
      headers: {
        'csrf-token': token,
      },
    }
  );
  return data;
};

export const getENS = async (wallet: string) => {
  const token: any = await ethCsrf();
  const { data } = await axios.post(
    `${ethSvcPath}/wallet/ens`,
    { wallet },
    {
      headers: {
        'csrf-token': token,
      },
    }
  );
  return data;
};

export const getBalance = async (wallet: string) => {
  const token: any = await ethCsrf();
  const { data } = await axios.post(
    `${ethSvcPath}/wallet/balance`,
    { wallet },
    {
      headers: {
        'csrf-token': token,
      },
    }
  );
  return data;
};
