import { Platform } from 'react-native';

// Check if required environment variables are set
const requiredEnvVars = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
};

// Log missing environment variables in development
if (__DEV__) {
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      console.warn(`Missing environment variable for ${key}`);
    }
  });
}

// Google OAuth client IDs
export const GOOGLE_CONFIG = {
  webClientId: requiredEnvVars.webClientId || '',  // Ensure this is never undefined
  iosClientId: Platform.select({
    ios: requiredEnvVars.iosClientId,
    default: undefined,
  }),
  androidClientId: Platform.select({
    android: requiredEnvVars.androidClientId,
    default: undefined,
  }),
  // Add any additional scopes you need
  scopes: ['profile', 'email'],
  // Use token response type for mobile
  responseType: 'token',
};

// Auth configuration object
export const AUTH_CONFIG = {
  google: GOOGLE_CONFIG,
}; 