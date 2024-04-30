'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import { WalletContext } from '@/contexts/WalletContext';
import { AuthHandlerProvider } from '@/contexts/AuthContext';
import { evmConfig } from '@/configs';
import { NotificationHandlerProvider } from '@/contexts/NotificationContext';
function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      })
  );

  return (
    <WagmiProvider config={evmConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#36393f',
            borderRadius: 'small',
          })}
          initialChain={mainnet}
        >
          <WalletContext>
            <AuthHandlerProvider>
              <NotificationHandlerProvider>
                {children}
              </NotificationHandlerProvider>
            </AuthHandlerProvider>
          </WalletContext>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default React.memo(Providers);
