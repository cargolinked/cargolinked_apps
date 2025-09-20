import { z } from 'zod';
import { router, protectedProcedure } from '../lib/trpc';

const createQuoteSchema = z.object({
  freightRequestId: z.string().uuid(),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  message: z.string().min(1),
  estimatedPickupDate: z.string().optional(),
  estimatedDeliveryDate: z.string().optional(),
});

export const quotesRouter = router({
  create: protectedProcedure
    .input(createQuoteSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if user has agent profile
      const { data: agentProfile } = await ctx.supabase
        .from('agent_profiles')
        .select('id')
        .eq('user_id', ctx.user.id)
        .single();

      if (!agentProfile) {
        throw new Error('Only agents can create quotes. Please create an agent profile first.');
      }

      const { data, error } = await ctx.supabase
        .from('quotes')
        .insert({
          freight_request_id: input.freightRequestId,
          agent_id: ctx.user.id,
          price: input.price,
          currency: input.currency,
          message: input.message,
          estimated_pickup_date: input.estimatedPickupDate,
          estimated_delivery_date: input.estimatedDeliveryDate,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  getMyQuotes: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const { data, error, count } = await ctx.supabase
        .from('quotes')
        .select(`
          *,
          freight_request:freight_requests(
            title,
            origin_city,
            destination_city,
            status,
            user:users(first_name, last_name, company_name)
          )
        `, { count: 'exact' })
        .eq('agent_id', ctx.user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      };
    }),

  getQuotesForMyRequests: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const { data, error, count } = await ctx.supabase
        .from('quotes')
        .select(`
          *,
          agent:users(first_name, last_name, company_name),
          agent_profile:agent_profiles(rating, total_jobs, is_verified),
          freight_request:freight_requests!inner(title, user_id)
        `, { count: 'exact' })
        .eq('freight_request.user_id', ctx.user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(error.message);
      }

      return {
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      };
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.enum(['pending', 'accepted', 'rejected', 'expired']),
    }))
    .mutation(async ({ input, ctx }) => {
      // Check if user owns the freight request for this quote
      const { data: quote } = await ctx.supabase
        .from('quotes')
        .select(`
          *,
          freight_request:freight_requests(user_id)
        `)
        .eq('id', input.id)
        .single();

      if (!quote) {
        throw new Error('Quote not found');
      }

      // Only the freight request owner or the quote agent can update status
      const canUpdate = 
        quote.freight_request.user_id === ctx.user.id || 
        quote.agent_id === ctx.user.id;

      if (!canUpdate) {
        throw new Error('Unauthorized to update this quote');
      }

      const { data, error } = await ctx.supabase
        .from('quotes')
        .update({ status: input.status })
        .eq('id', input.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // If quote is accepted, update freight request status
      if (input.status === 'accepted') {
        await ctx.supabase
          .from('freight_requests')
          .update({ status: 'assigned' })
          .eq('id', quote.freight_request_id);
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { error } = await ctx.supabase
        .from('quotes')
        .delete()
        .eq('id', input.id)
        .eq('agent_id', ctx.user.id);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    }),
});
