import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../lib/trpc';

const locationSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

const createFreightRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  origin: locationSchema,
  destination: locationSchema,
  cargoType: z.enum(['general', 'fragile', 'hazardous', 'perishable', 'oversized', 'liquid', 'other']),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  budget: z.number().positive().optional(),
  currency: z.string().default('USD'),
  preferredPickupDate: z.string().optional(),
  preferredDeliveryDate: z.string().optional(),
});

export const freightRequestsRouter = router({
  create: protectedProcedure
    .input(createFreightRequestSchema)
    .mutation(async ({ input, ctx }) => {
      const { origin, destination, dimensions, ...rest } = input;

      const { data, error } = await ctx.supabase
        .from('freight_requests')
        .insert({
          user_id: ctx.user.id,
          ...rest,
          origin_address: origin.address,
          origin_city: origin.city,
          origin_state: origin.state,
          origin_country: origin.country,
          origin_postal_code: origin.postalCode,
          origin_latitude: origin.latitude,
          origin_longitude: origin.longitude,
          destination_address: destination.address,
          destination_city: destination.city,
          destination_state: destination.state,
          destination_country: destination.country,
          destination_postal_code: destination.postalCode,
          destination_latitude: destination.latitude,
          destination_longitude: destination.longitude,
          dimensions_length: dimensions?.length,
          dimensions_width: dimensions?.width,
          dimensions_height: dimensions?.height,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  getAll: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      status: z.enum(['draft', 'active', 'assigned', 'in_transit', 'delivered', 'cancelled']).optional(),
    }))
    .query(async ({ input, ctx }) => {
      const { page, limit, status } = input;
      const offset = (page - 1) * limit;

      let query = ctx.supabase
        .from('freight_requests')
        .select(`
          *,
          user:users(first_name, last_name, company_name),
          quotes:quotes(count)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) {
        query = query.eq('status', status);
      } else {
        query = query.eq('status', 'active');
      }

      const { data, error, count } = await query;

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

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('freight_requests')
        .select(`
          *,
          user:users(first_name, last_name, company_name, phone, email),
          quotes:quotes(
            *,
            agent:users(first_name, last_name, company_name)
          )
        `)
        .eq('id', input.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  getMyRequests: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
    }))
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const { data, error, count } = await ctx.supabase
        .from('freight_requests')
        .select(`
          *,
          quotes:quotes(count)
        `, { count: 'exact' })
        .eq('user_id', ctx.user.id)
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

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.enum(['draft', 'active', 'assigned', 'in_transit', 'delivered', 'cancelled']).optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...updates } = input;

      const { data, error } = await ctx.supabase
        .from('freight_requests')
        .update(updates)
        .eq('id', id)
        .eq('user_id', ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { error } = await ctx.supabase
        .from('freight_requests')
        .delete()
        .eq('id', input.id)
        .eq('user_id', ctx.user.id);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    }),
});
