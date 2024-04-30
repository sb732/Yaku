'use client';
import { Button, Icon, List, ListItem, Popover } from 'konsta/react';
import { MouseEventHandler } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useAuth from '@/hooks/useAuth';
import { SolanaConnectButton } from './SolanaConnectButton';
import YakuIcon from '../Icons/YakuIcon';
import SolanaIcon from '../Icons/SolanaIcon';
import { round } from 'lodash';
import USDCIcon from '../Icons/USDCIcon';
import EthereumIcon from '../Icons/EthereumIcon';

export const ProfileView = ({
  show,
  targetRef,
  handleClose,
  handleLoginWeb2,
}: {
  show: boolean;
  targetRef: any;
  handleClose: MouseEventHandler<HTMLElement>;
  handleLoginWeb2: MouseEventHandler<HTMLElement>;
}) => {
  const { yakuProfile, solBalance, usdcBalance, yakuBalance, ethBalance } =
    useAuth();
  const iconContent = (
    <YakuIcon
      cssClass='h-12 w-12 !rounded-full object-cover yaku-icon'
      icon={yakuProfile.avatar}
    />
  );
  return (
    <Popover
      size='w-128'
      opened={show}
      target={targetRef}
      translucent={false}
      onBackdropClick={handleClose}
      className='rounded-lg shadow'
      colors={{ bgIos: 'bg-elevation1', bgMaterial: 'bg-elevation1' }}
    >
      <List>
        <ListItem
          media={<Icon ios={iconContent} material={iconContent} />}
          title={yakuProfile.vanity}
          titleWrapClassName='text-opacity-100'
          link
          linkProps={{ href: '/avatar' }}
        ></ListItem>

        {!yakuProfile.wallet ? (
          <ListItem>
            <div className='flex w-full items-center justify-center p-4'>
              <SolanaConnectButton />
            </div>
          </ListItem>
        ) : (
          <>
            <ListItem
              media={<SolanaIcon />}
              title={`${round(solBalance, 2)} SOL`}
              titleWrapClassName='text-opacity-100'
            />
            <ListItem
              media={<USDCIcon />}
              title={`${round(usdcBalance, 2)} USDC`}
              titleWrapClassName='text-opacity-100'
            />
            <ListItem
              media={<YakuIcon cssClass='h-7 w-6 mr-1 rounded-full' />}
              title={`${round(yakuBalance, 2)} YAKU`}
              titleWrapClassName='text-opacity-100'
            />
          </>
        )}
        {!yakuProfile.ethAddress ? (
          <ListItem>
            <div className='flex w-full items-center justify-center p-4 evm-connect-button'>
              <ConnectButton label='Link with EVM wallet' />
            </div>
          </ListItem>
        ) : (
          <ListItem
            media={<EthereumIcon />}
            title={`${round(ethBalance, 6)} ETH`}
            titleWrapClassName='text-opacity-100'
          />
        )}
        {!yakuProfile.blockus && (
          <ListItem>
            <div className='flex w-full items-center justify-center p-4'>
              <Button
                className='w-full wallet-adapter-button !text-left !block'
                large
                style={{ textTransform: 'none' }}
                colors={{
                  fillBgIos: 'btn-elevation2',
                  fillBgMaterial: 'btn-elevation2',
                }}
                onClick={handleLoginWeb2}
              >
                Link with Web2
              </Button>{' '}
            </div>
          </ListItem>
        )}
      </List>
    </Popover>
  );
};
