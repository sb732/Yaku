import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'gg.yaku.app',
  appName: 'Yaku.gg',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
