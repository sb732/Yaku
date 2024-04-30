'use client';
import { Button } from 'konsta/react';
import { MouseEventHandler } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SolanaConnectButton } from './SolanaConnectButton';

export const LoginForm = ({
  show,
  handleClose,
  handleLoginWeb2,
}: {
  show: boolean;
  handleClose: MouseEventHandler<HTMLElement>;
  handleLoginWeb2: MouseEventHandler<HTMLElement>;
}) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden={show}
      className={`${
        show ? 'flex' : 'hidden'
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-60 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className='relative p-4 w-full max-w-xl max-h-full'>
        <div className='relative rounded-lg shadow bg-elevation1'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600'>
            <h3 className='text-xl font-semibold text-white'>
              Sign in to Yaku
            </h3>
            <Button
              className='end-2.5 text-gray-400 bg-transparent rounded-lg text-sm !w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-elevation1-hover hover:text-white'
              clear
              small
              onClick={handleClose}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close</span>
            </Button>
          </div>
          <div className='flex w-full items-center justify-center p-4'>
            <SolanaConnectButton />
          </div>
          <div className='flex w-full items-center justify-center p-4 evm-connect-button'>
            <ConnectButton label='Login with EVM wallet' />
          </div>
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
              Login with Web2
            </Button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
