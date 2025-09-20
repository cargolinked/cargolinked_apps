# 🚛 Cargolinked - Freight Marketplace Platform

Cargolinked is a comprehensive marketplace and directory platform that connects people and businesses who need freight services with agents (freight forwarders, logistics companies, truckers). Built with modern technologies for scalability and performance.

## 🎯 Project Overview

**Goal:** Connect freight service requesters with verified agents through a seamless marketplace experience.

**Users:**
- **Individuals/Businesses:** Post freight requests and receive competitive quotes
- **Agents:** Browse requests, submit quotes, and manage their business profiles
- **Directory:** Searchable public profiles for freight agents

## ⚙️ Tech Stack

- **Monorepo:** Turborepo + pnpm
- **Web:** Next.js 15 (App Router) → SEO-friendly landing pages, dashboards, admin panel
- **Mobile:** Expo SDK 54 (React Native + Expo Router v3) → native mobile experience
- **UI:** TailwindCSS + shadcn/ui (web) + NativeWind (mobile) + React Native Web (shared)
- **Backend:** Supabase (Postgres, Auth, Storage, Realtime, Edge Functions)
- **API Layer:** tRPC + React Query (type-safe, shared between web & mobile)
- **Payments:** Stripe Connect (escrow system for secure transactions)
- **Notifications:** FCM (push), Resend (email), Twilio (SMS) - planned
- **Monitoring:** Sentry - planned

## 📂 Monorepo Structure

```
cargolinked/
│── apps/
│   ├── web/        # Next.js web application
│   └── mobile/     # Expo React Native app
│
│── packages/
│   ├── ui/         # Shared UI components (shadcn/ui)
│   ├── utils/      # Shared utility functions
│   ├── api/        # tRPC routers and API logic
│   └── types/      # Shared TypeScript type definitions
│
│── infra/          # Deployment configurations
│── turbo.json      # Turborepo configuration
│── pnpm-workspace.yaml
└── tsconfig.json   # Shared TypeScript config
```

## 🗄️ Database Schema

### Core Entities

- **Users** - Extended Supabase auth with role-based profiles
- **Freight Requests** - Detailed shipping requirements with locations
- **Quotes** - Agent responses to freight requests
- **Agent Profiles** - Business profiles with services and coverage areas
- **Reviews** - Rating system for completed transactions

### Key Features

- **Row Level Security (RLS)** - Secure data access policies
- **Real-time subscriptions** - Live updates for quotes and requests
- **Geolocation support** - Distance calculations and area coverage
- **Multi-currency support** - Global marketplace capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Supabase account (already configured)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd cargolinked
   pnpm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env.local
   # Update with your Supabase credentials (already configured)
   ```

3. **Start development servers:**
   ```bash
   # Start all apps
   pnpm dev

   # Or start individually
   pnpm --filter web dev          # Web app on http://localhost:3000
   pnpm --filter mobile dev       # Mobile app (Expo)
   ```

### Database Setup

The Supabase database is already configured with:
- ✅ User profiles table with RLS policies
- ✅ Freight requests with location data
- ✅ Quotes and agent profiles
- ✅ Reviews and rating system
- ✅ Proper indexes for performance

## 📱 Applications

### Web App (Next.js)
- **Landing page** - Marketing site with feature highlights
- **Authentication** - Login/register with role selection
- **Dashboard** - Role-based interfaces for requesters and agents
- **Directory** - Searchable agent profiles
- **Admin panel** - Management interface (planned)

**Key Routes:**
- `/` - Landing page
- `/login` - Authentication
- `/register` - User registration with role selection
- `/dashboard` - Main user interface
- `/agents` - Agent directory (planned)

### Mobile App (Expo)
- **Onboarding** - Welcome flow and feature introduction
- **Authentication** - Native login/register experience
- **Request posting** - Easy freight request creation
- **Quote management** - View and manage received quotes
- **Profile management** - User settings and agent profiles

**Key Screens:**
- Onboarding flow
- Authentication (login/register)
- Home dashboard
- Create freight request
- Browse requests
- Quotes management
- User profile

## 🔧 API Layer (tRPC)

Type-safe API with the following routers:

### Auth Router
- `register` - User registration with profile creation
- `login` - Authentication
- `getProfile` - User profile retrieval
- `updateProfile` - Profile updates

### Freight Requests Router
- `create` - Post new freight requests
- `getAll` - Browse available requests (with pagination)
- `getById` - Detailed request view
- `getMyRequests` - User's own requests
- `update` - Request modifications
- `delete` - Request removal

### Quotes Router
- `create` - Submit quotes (agents only)
- `getMyQuotes` - Agent's submitted quotes
- `getQuotesForMyRequests` - Quotes received for user's requests
- `updateStatus` - Accept/reject quotes
- `delete` - Quote removal

### Agents Router
- `createProfile` - Agent profile setup
- `getMyProfile` - Agent's own profile
- `updateProfile` - Profile modifications
- `getAll` - Public agent directory
- `getById` - Detailed agent profile with reviews

## 🔐 Authentication & Authorization

- **Supabase Auth** - Secure authentication with email/password
- **Role-based access** - Individual, Business, Agent roles
- **Row Level Security** - Database-level access control
- **JWT tokens** - Stateless authentication for mobile/web

## 🎨 UI Components

Shared component library built with:
- **shadcn/ui** - High-quality React components
- **TailwindCSS** - Utility-first styling
- **Radix UI** - Accessible primitives
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants

## 📊 Current Status - MVP Sprint 1 ✅

### Completed Features

✅ **Monorepo Setup**
- Turborepo configuration with pnpm workspaces
- Shared packages architecture
- TypeScript configuration

✅ **Database Schema**
- Complete Supabase schema with RLS policies
- User profiles, freight requests, quotes, agent profiles
- Proper relationships and indexes

✅ **API Layer**
- Full tRPC implementation with type safety
- Authentication, freight requests, quotes, agents routers
- React Query integration for caching

✅ **Web Application**
- Next.js 15 with App Router
- Beautiful landing page with feature highlights
- Authentication system with role selection
- Responsive design with TailwindCSS

✅ **Mobile Application**
- Expo SDK 54 with Expo Router v3
- Native onboarding experience
- Complete authentication flow
- Freight request creation
- Quote management interface
- User profile management

✅ **Shared Packages**
- UI components library
- Utility functions
- Type definitions
- API client setup

## 🚀 Next Steps (Sprint 2+)

### Immediate Priorities
- [ ] Agent profile completion flow
- [ ] Quote submission for agents
- [ ] Real-time notifications
- [ ] File upload for cargo images
- [ ] Advanced search and filtering

### Future Features
- [ ] Stripe Connect integration for payments
- [ ] Chat system between requesters and agents
- [ ] GPS tracking for shipments
- [ ] Rating and review system
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Push notifications (FCM)
- [ ] Email notifications (Resend)
- [ ] SMS notifications (Twilio)

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps in development
pnpm build            # Build all apps for production
pnpm lint             # Lint all packages
pnpm type-check       # Type checking across monorepo

# Individual apps
pnpm --filter web dev       # Web app only
pnpm --filter mobile dev    # Mobile app only
```

### Code Quality
- **TypeScript** - Full type safety across the stack
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks (planned)

## 🌐 Deployment

### Web App (Vercel) ✅
The web application is configured for automatic deployment to Vercel:

**Vercel Project Settings:**
- **Root Directory:** `apps/web` ⚠️ **IMPORTANT**
- **Build Command:** `cd ../.. && pnpm turbo build --filter=cargolinked-web`
- **Install Command:** `cd ../.. && pnpm install --frozen-lockfile`
- **Framework:** Next.js

**Environment Variables Required:**
- `NEXT_PUBLIC_SUPABASE_URL`=`https://qqzturpovtflwenmwvfw.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- `SUPABASE_SERVICE_ROLE_KEY` (for API routes)

**Deployment Configuration:**
- ✅ `apps/web/vercel.json` configured for monorepo
- ✅ Next.js detection via root package.json
- ✅ Mobile app excluded from Vercel builds
- ✅ tRPC API routes properly configured

**📖 See:** `VERCEL_DEPLOYMENT.md` for detailed setup guide

### Mobile App (Expo EAS)
The mobile app uses Expo Application Services for deployment:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login and configure
eas login
cd apps/mobile
eas build:configure

# Build for production
eas build --profile production --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

**See:** `apps/mobile/DEPLOYMENT.md` for detailed mobile deployment guide.

### Database (Supabase) ✅
- **Production Ready** - Already configured and running
- **URL:** `https://qqzturpovtflwenmwvfw.supabase.co`
- **Backups** - Automated daily backups
- **Monitoring** - Built-in performance monitoring
- **RLS Policies** - Secure data access configured

## 📝 Environment Variables

```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://qqzturpovtflwenmwvfw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (for future implementation)
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For questions and support:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs` (planned)

---

**Built with ❤️ for the freight and logistics industry**
