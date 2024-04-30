import { PublicKey } from '@solana/web3.js';
import { first, toUpper, get, each, toInteger } from 'lodash';

/* eslint-disable */
// Functions
export function shortenAddress(address: string, chars = 4): string {
  if (address) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  } else {
    return '';
  }
}

export function isValidSolanaAddress(address: string) {
  try {
    // eslint-disable-next-line
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: toUpper(
    `${first(name.split(' ')[0])}${first(get(name.split(' '), 1, ' '))}`
  ),
});

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const abbreviateValue = (value: number) => {
  let newValue: any = value;
  if (value >= 1000) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue: any = '';
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};
