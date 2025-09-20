# 🚀 Vercel Deployment Guide for Cargolinked

## 📋 **Quick Setup**

### 1. **Vercel Project Configuration**

When setting up the project in Vercel dashboard:

- **Framework Preset:** Next.js
- **Root Directory:** `apps/web` ⚠️ **IMPORTANT**
- **Build Command:** `cd ../.. && pnpm turbo build --filter=cargolinked-web`
- **Install Command:** `cd ../.. && pnpm install --frozen-lockfile`
- **Output Directory:** `.next` (default)

### 2. **Environment Variables**

Set these in Vercel dashboard → Project Settings → Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://qqzturpovtflwenmwvfw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxenR1cnBvdnRmbHdlbm13dmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTg0NTAsImV4cCI6MjA3MzkzNDQ1MH0.VmNQRlYl8_rfILeFod6Iv3NKeyyJa_EWkwTyIVX6IZk
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 🔧 **Monorepo Configuration**

### Current Setup

```
cargolinked/
├── apps/
│   ├── web/           ← Vercel deploys this
│   │   ├── package.json (has Next.js dependency)
│   │   ├── vercel.json (project config)
│   │   └── src/
│   └── mobile/        ← Not deployed to Vercel
├── packages/          ← Shared code
└── package.json       ← Root (has Next.js in devDeps for detection)
```

### Key Files

#### `apps/web/vercel.json`
```json
{
  "buildCommand": "cd ../.. && pnpm turbo build --filter=cargolinked-web",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### Root `package.json` (for Next.js detection)
```json
{
  "devDependencies": {
    "next": "15.0.0"
  }
}
```

## 🚨 **Troubleshooting**

### Issue: "No Next.js version detected"

**Solution 1: Set Root Directory**
- In Vercel dashboard → Project Settings → General
- Set **Root Directory** to `apps/web`

**Solution 2: Manual Project Setup**
```bash
# In Vercel dashboard, create new project
# Connect to GitHub repo
# Set these settings:
Framework Preset: Next.js
Root Directory: apps/web
Build Command: cd ../.. && pnpm turbo build --filter=cargolinked-web
Install Command: cd ../.. && pnpm install --frozen-lockfile
Output Directory: .next
```

### Issue: Build Command Fails

**Check:**
1. ✅ Root directory is set to `apps/web`
2. ✅ Build command includes `cd ../..` to access monorepo root
3. ✅ pnpm is available (Vercel auto-detects from pnpm-lock.yaml)
4. ✅ Turbo filter targets correct package name

### Issue: API Routes Not Working

**Check:**
1. ✅ `vercel.json` functions configuration
2. ✅ Environment variables are set
3. ✅ tRPC API routes are in `src/pages/api/trpc/[trpc].ts`

## 📊 **Deployment Status**

### ✅ **Working Configuration**

- **Monorepo Structure:** ✅ Properly configured
- **Build System:** ✅ Turborepo with filters
- **Next.js Detection:** ✅ Next.js in root devDependencies
- **API Routes:** ✅ tRPC endpoints configured
- **Environment:** ✅ Supabase credentials ready

### 🔄 **Next Steps After Deployment**

1. **Verify API Routes:** Test `/api/trpc/auth.getProfile`
2. **Check Database Connection:** Ensure Supabase RLS policies work
3. **Test Authentication:** Login/register flow
4. **Monitor Performance:** Check Vercel analytics

## 🎯 **Alternative Deployment Methods**

### Option 1: Manual CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web app directory
cd apps/web
vercel --prod
```

### Option 2: GitHub Actions (Future)
```yaml
# .github/workflows/deploy.yml
name: Deploy Web App
on:
  push:
    branches: [main]
    paths: ['apps/web/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm turbo build --filter=cargolinked-web
      - uses: amondnet/vercel-action@v20
```

## 📞 **Support**

If deployment still fails:

1. **Check Vercel Build Logs** for specific error messages
2. **Verify Environment Variables** are set correctly
3. **Test Build Locally** with the same commands
4. **Contact Vercel Support** with monorepo setup questions

---

**The web app should now deploy successfully to Vercel! 🎉**
