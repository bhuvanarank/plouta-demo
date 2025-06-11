import 'dotenv/config';

export default {
  expo: {
    name: "goalproject",
    slug: "goalproject",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "goalproject",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.goalproject",
      config: {
        googleSignIn: {
          reservedClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_RESERVED_CLIENT_ID
        }
      }
    },
    android: {
      package: "com.yourcompany.goalproject",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      googleServicesFile: "./google-services.json"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: "your-project-id"
      }
    }
  }
}; 