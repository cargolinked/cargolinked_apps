# Mobile App Deployment Guide

The Cargolinked mobile app is built with Expo and should be deployed using **Expo Application Services (EAS)**, not Vercel.

## Prerequisites

1. Install Expo CLI globally:
   ```bash
   npm install -g @expo/cli
   ```

2. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

3. Create an Expo account at [expo.dev](https://expo.dev)

## Setup for Deployment

1. **Login to Expo:**
   ```bash
   eas login
   ```

2. **Configure the project:**
   ```bash
   cd apps/mobile
   eas build:configure
   ```

3. **Update app.json with your bundle identifiers:**
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.yourcompany.cargolinked"
       },
       "android": {
         "package": "com.yourcompany.cargolinked"
       }
     }
   }
   ```

## Building the App

### Development Build
```bash
eas build --profile development --platform all
```

### Production Build
```bash
eas build --profile production --platform all
```

### Preview Build (for testing)
```bash
eas build --profile preview --platform all
```

## Submitting to App Stores

### iOS App Store
```bash
eas submit --platform ios
```

### Google Play Store
```bash
eas submit --platform android
```

## Environment Variables

For production builds, set environment variables in `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_SUPABASE_URL": "your_supabase_url",
        "EXPO_PUBLIC_SUPABASE_ANON_KEY": "your_supabase_anon_key"
      }
    }
  }
}
```

## Testing

1. **Development builds** can be installed on physical devices for testing
2. **Preview builds** can be shared with testers via QR codes
3. **Production builds** are submitted to app stores

## Notes

- The mobile app is **not deployed to Vercel** - it's a native mobile app
- Use EAS for all mobile app deployments
- The web app (Next.js) is deployed to Vercel separately
- Both apps share the same Supabase backend and API
