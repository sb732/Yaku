import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { PublicKey } from '@solana/web3.js';
import { mainnet, polygon } from 'wagmi/chains';

export const USER_POOL_SIZE = 3664;
export const GLOBAL_AUTHORITY_SEED = 'global-authority';
export const EPOCH = 86400;
export const REWARD_TOKEN_DECIMAL = 1000000000;

export const REWARD_TOKEN_MINT = new PublicKey(
  '326vsKSXsf1EsPU1eKstzHwHmHyxsbavY4nTJGEm3ugV'
);
export const PROGRAM_ID = '8g3PG15GWGFsBLtfaVXZ8ntpUTNvwDMsrW2dRFr7pR4V';
export const STAKING_PROGRAM_ID =
  '37aAtYopXocCAbB3yQJ5382HGdo39P4ygKQtaRyhnVWG';
export const STAKING_CONFIG_ID = 'AyGU2zPhENQdLEkJQNTNaZbqAS5Hmh5ifAGZZXEGigcy';
export const STAKING_REWARD_MINT =
  'AqEHVh8J2nXH9saV2ciZyYwPpqWFRfD2ffcq5Z8xxqm5';

export const TOKEN_ADDR = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
export const YAKU_SPL_TOKEN_PROGRAM_ID =
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';

export const NFT_CREATOR = '5SjFvSud46uBFRNXQnAuzFspps5fRnhZjm83TXnY7BPu'; // astro only
export const YAKU_ONI_NFT_CREATOR = [
  'Dw73TsHMG8fgT7smeAobwcTZZeJ491NWAKQ1NSiRbJug',
  '6CzTQjSPcW9x4axzZLFtTq5BwsRvw4ksUWqaAkrEsRb9',
  'HMduKVo3A19U5EpQdEhPjo9hq9zfZXn8aGVYZp7Vc7fX',
];
export const YAKU_CAPSULE_NFT_CREATOR = [
  '2ekR5opinwLHa6GMr3LjJt44z4RA8Rx1hqviL6npFz5s',
  '6CzTQjSPcW9x4axzZLFtTq5BwsRvw4ksUWqaAkrEsRb9',
  'HMduKVo3A19U5EpQdEhPjo9hq9zfZXn8aGVYZp7Vc7fX',
];
export const YAKU_X_NFT_CREATOR = [
  '8vT6Uz3CuNXXW9qux432r6H4FufA76DJjMnMZb9EgVip',
  'EaFLjditD7WmUFEfnkcB778xTgpTemh5852Dwfi4fej9',
  'RRUMF9KYPcvNSmnicNMAFKx5wDYix3wjNa6bA7R6xqA',
];

export const YAKU_ONI_NFT_CREATOR_EX = [
  'GVq5YMrE2awfJKHhDooUCApEwamoMUsY1ep1FrTBV6vf',
  '6CzTQjSPcW9x4axzZLFtTq5BwsRvw4ksUWqaAkrEsRb9',
  'HMduKVo3A19U5EpQdEhPjo9hq9zfZXn8aGVYZp7Vc7fX',
];

export const YAKU_COLLECTION_CREATORS = [
  NFT_CREATOR,
  YAKU_ONI_NFT_CREATOR[0],
  YAKU_CAPSULE_NFT_CREATOR[0],
  YAKU_X_NFT_CREATOR[0],
  YAKU_ONI_NFT_CREATOR_EX[0],
];
export const METAPLEX = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

export const STAKING_OWNER_ADDR =
  '8dSqaJtFkoNfTDyWVS15MsSCLH1DXGmjJFvshEWkfDiG';

export const YAKU_TOKEN_ICON =
  'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EK58dp4mxsKwwuySWQW826i3fwcvUK69jPph22VUcd2H/logo.png';

export const YAKU_TOKEN_EXCLUDE_WALLET = [
  '8EZ3AAjVwb7MbJGWJudz9tDJPGNoPJt3eKG27P8JNDkQ',
  'HEp1pPEk7M4yNS3R9K6G66Y7v2VWiCA3eAHMvvFqC6iN',
  '5SjFvSud46uBFRNXQnAuzFspps5fRnhZjm83TXnY7BPu',
  'EGYXQuorkuGajMNt2UybASq7NsCpWrtFgwNUX7MyM1hx',
  'GN2yTepqbzrMtaYXGKA4C6e9w8X3fHTzCYHBHFeFVCaL',
];

export const USDCMINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC Token address in mainnet
export const RPC_LIST = [
  'https://gateway.yaku.ai/rpc/0',
  'https://mainnet.helius-rpc.com/?api-key=0c10bba8-1e7d-438c-95f0-eab06a7f3d94',
];
export const DEFAULT_RPC = RPC_LIST[0];
export const DEFAULT_RPC_WS =
  'wss://virulent-icy-darkness.solana-mainnet.quiknode.pro/02db76ea26aebfe00b1557d88462e7e398356139/';
export const DEBUG = 0;

// Token Mints
export const INPUT_MINT_ADDRESS = 'So11111111111111111111111111111111111111112'; // SOL
export const OUTPUT_MINT_ADDRESS =
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC

export const DEFAULT_IMAGE_URL = `https://s3.amazonaws.com/img.yaku.ai/logos/Logo2K.png`;

export const LOGO = 'https://s3.amazonaws.com/img.yaku.ai/logos/X-YAKU.png';
export const LOGO_BLACK =
  'https://s3.amazonaws.com/img.yaku.ai/logos/Logo2K.png';

export const DEFAULT_BANNER = `https://i.imgur.com/iII33BT.png`;

export const BLOCKUS_PROJECTID = 'RulYoCctlimygd6JnQIGFITXr6dj';
export const WEB2LOGIN_REDIRECT_URL = 'https://v2.yaku.gg/web2login';
export const BLOCKUS_URL = `https://auth.blockus.gg/login?project=${BLOCKUS_PROJECTID}&redirect=${WEB2LOGIN_REDIRECT_URL}`;

export const WALLET_CONNECT_PROJECT_ID = 'ec3cc4dabfafa5fef5fdf99d4b318263';

export const evmConfig = getDefaultConfig({
  appName: 'Yaku.gg',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon],
  ssr: true,
});

export const YAKUX_COLLECTION = 'F8dWNJhTHPWUVLFcnisNue219nuGip4VfpkHiKSPMrP7';
export const CAPSULE_COLLECTION =
  'AtWUpr6L2Ar2uivkVEfz1WtSf1UMZ5jCocMea38dV7nT';
export const BIKE_COLLECTION = 'CZDLdVbGRm2mhvfw7Lg7gBwPJdcpygehz9sn2RSGWTwc';
