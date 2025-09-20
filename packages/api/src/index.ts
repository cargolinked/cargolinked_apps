import { router } from './lib/trpc';
import { authRouter } from './routers/auth';
import { freightRequestsRouter } from './routers/freight-requests';
import { quotesRouter } from './routers/quotes';
import { agentsRouter } from './routers/agents';

export const appRouter = router({
  auth: authRouter,
  freightRequests: freightRequestsRouter,
  quotes: quotesRouter,
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;

// Export types and utilities
export * from './lib/trpc';
export * from './lib/supabase';
