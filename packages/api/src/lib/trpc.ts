import { initTRPC, TRPCError } from '@trpc/server';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

// Context for tRPC
export interface Context {
  user: User | null;
  supabase: typeof supabase;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
