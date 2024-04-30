/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { App, Page, Navbar } from 'konsta/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  LogoSection,
  FooterSection,
  LoginForm,
  LoginButton,
} from '@/components/views';
import { BLOCKUS_URL } from '@/configs';
import { useWallet } from '@solana/wallet-adapter-react';
import useAuth from '@/hooks/useAuth';
import { isEmpty } from 'lodash';
import { ProfileButton } from '@/components/connect-wallet/ProfileButton';
import { ProfileView } from '@/components/connect-wallet/ProfileView';

const YakuNavBar = ({
  scrolling,
  yakuProfile,
  handleOpenProfilePopover,
  handleOpen,
}: any) => (
  <Navbar
    transparent
    outline={false}
    className={`header !fixed ${scrolling ? 'scrolling' : 'init'}`}
    innerClassName='py-4 !px-5 h-20'
    left={<LogoSection />}
    right={
      yakuProfile && !isEmpty(yakuProfile) ? (
        <ProfileButton
          avatar={yakuProfile.avatar}
          handleClick={() => handleOpenProfilePopover('.profile-button')}
        />
      ) : (
        <LoginButton handleClick={handleOpen} />
      )
    }
  />
);

const MemoNavBar = React.memo(YakuNavBar);

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { publicKey } = useWallet();
  const { yakuProfile } = useAuth();
  const popoverTargetRef = useRef(null);

  const handleScroll = (event: any) => {
    setScrolling(event.target.scrollTop > 0);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLoginWeb2 = () => {
    const url = BLOCKUS_URL;
    window.location.href = url;
  };

  const handleOpenProfilePopover = (targetRef: any) => {
    popoverTargetRef.current = targetRef;
    setIsProfileOpen(true);
  };

  const handleCloseProfilePopover = () => {
    setIsProfileOpen(false);
  };

  useEffect(() => {
    console.debug('publicKey', publicKey?.toBase58());
  }, [publicKey]);
  return (
    <App theme='ios'>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <Page onScroll={handleScroll}>
          <LoginForm
            show={isOpen}
            handleClose={handleClose}
            handleLoginWeb2={handleLoginWeb2}
          />
          <ProfileView
            show={isProfileOpen}
            targetRef={popoverTargetRef?.current}
            handleClose={handleCloseProfilePopover}
            handleLoginWeb2={handleLoginWeb2}
          />
          <MemoNavBar
            scrolling={scrolling}
            yakuProfile={yakuProfile}
            handleOpenProfilePopover={handleOpenProfilePopover}
            handleOpen={handleOpen}
          />
          {children}
          <FooterSection />
        </Page>
      </main>
    </App>
  );
}

export default React.memo(AppLayout);
