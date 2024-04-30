import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import Providers from './providers';
import AppLayout from './AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yaku.gg',
  description:
    'Yaku.gg is your access pass to a smarter platform that delivers value to the ecosystem as a whole.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
