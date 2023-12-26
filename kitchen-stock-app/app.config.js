import 'dotenv/config';

export default {
    name: "kitchen-stock-app",
    slug: "kitchen-stock-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "kitchen-stock",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        }
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro"
    },
    plugins: [
        "expo-router"
    ],
    extra: {
        backendUrl: process.env.BACKEND_URL
    }
}
