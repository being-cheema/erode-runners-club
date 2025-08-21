import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eroderunnersclub.app',
  appName: 'Erode Runners Club',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Haptics: {
      // Enable all haptic feedback types
      enableImpact: true,
      enableNotification: true,
      enableSelection: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  },
  android: {
    allowMixedContent: true,
    useLegacyBridge: false
  }
};

export default config;
