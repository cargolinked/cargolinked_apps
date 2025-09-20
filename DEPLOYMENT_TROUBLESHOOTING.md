# 🚀 Deployment Troubleshooting Guide

## Vercel Deployment Issues

### ✅ **FIXED: Mobile App Build Error**

**Problem:** Vercel was trying to build the mobile app with `expo build` command, which failed.

**Solution Applied:**
1. ✅ Updated `apps/mobile/package.json` build script to skip mobile builds
2. ✅ Created `vercel.json` to only build the web app
3. ✅ Updated `turbo.json` to handle mobile builds properly

**Current Status:** ✅ **Web app deploys successfully to Vercel**

### Web App Deployment Checklist

- ✅ `vercel.json` configured for web-only deployment
- ✅ Build command: `pnpm --filter cargolinked-web build`
- ✅ Output directory: `apps/web/.next`
- ✅ Next.js API routes configured
- ✅ Environment variables set in Vercel dashboard

### Required Environment Variables in Vercel

```bash
NEXT_PUBLIC_SUPABASE_URL=https://qqzturpovtflwenmwvfw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Mobile App Deployment

### ❌ **NOT for Vercel**
The mobile app should **NOT** be deployed to Vercel. It's a React Native app that needs to be built and distributed through app stores.

### ✅ **Use Expo EAS Instead**

```bash
# Install EAS CLI
npm install -g eas-cli

# Navigate to mobile app
cd apps/mobile

# Login to Expo
eas login

# Configure for first time
eas build:configure

# Build for production
eas build --profile production --platform all
```

## Common Issues & Solutions

### 1. **"Invalid project root" Error**
- **Cause:** Trying to run `expo build` (deprecated command)
- **Solution:** Use `eas build` instead, or skip mobile builds in CI/CD

### 2. **Module Resolution Errors**
- **Cause:** Monorepo path resolution issues
- **Solution:** Check `tsconfig.json` paths and `next.config.js` transpilePackages

### 3. **tRPC Provider Issues**
- **Cause:** Version mismatch between tRPC and React Query
- **Solution:** Use React Query v4 with tRPC v10 (already fixed)

### 4. **Build Cache Issues**
- **Solution:** Clear Vercel build cache or use `--force` flag

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web App       │    │   Mobile App    │    │   Database      │
│   (Vercel)      │    │   (Expo EAS)    │    │   (Supabase)    │
│                 │    │                 │    │                 │
│ • Next.js 15    │    │ • React Native  │    │ • PostgreSQL    │
│ • tRPC API      │    │ • Expo Router   │    │ • Auth          │
│ • Static Pages  │    │ • Native UI     │    │ • Storage       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    Shared API & Database
```

## Testing Deployment Locally

### Web App
```bash
# Build and test locally
pnpm --filter cargolinked-web build
pnpm --filter cargolinked-web start
```

### Mobile App
```bash
# Test in development
cd apps/mobile
expo start

# Test production build
eas build --profile preview --platform all
```

## Monitoring & Debugging

### Vercel
- Check deployment logs in Vercel dashboard
- Monitor function execution times
- Set up error tracking with Sentry (planned)

### Mobile App
- Use Expo development tools
- Monitor crash reports in app stores
- Test on physical devices before release

## Next Steps

1. ✅ **Web deployment working** - Ready for production
2. 🔄 **Mobile deployment** - Set up EAS when ready for app store release
3. 📊 **Monitoring** - Add Sentry for error tracking
4. 🔄 **CI/CD** - Set up GitHub Actions for automated testing
