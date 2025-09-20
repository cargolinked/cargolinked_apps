import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter, type Context } from '@cargolinked/api';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default createNextApiHandler({
  router: appRouter,
  createContext: async ({ req }): Promise<Context> => {
    // Get user from Authorization header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    let user = null;
    if (token) {
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    return {
      user,
      supabase,
    };
  },
});
