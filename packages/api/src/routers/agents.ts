import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../lib/trpc';

const createAgentProfileSchema = z.object({
  companyName: z.string().min(1),
  businessRegistrationNumber: z.string().optional(),
  description: z.string().min(1),
  services: z.array(z.string()).min(1),
  coverageAreas: z.array(z.string()).min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  website: z.string().url().optional(),
});

export const agentsRouter = router({
  createProfile: protectedProcedure
    .input(createAgentProfileSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if user already has an agent profile
      const { data: existing } = await ctx.supabase
        .from('agent_profiles')
        .select('id')
        .eq('user_id', ctx.user.id)
        .single();

      if (existing) {
        throw new Error('Agent profile already exists');
      }

      const { data, error } = await ctx.supabase
        .from('agent_profiles')
        .insert({
          user_id: ctx.user.id,
          company_name: input.companyName,
          business_registration_number: input.businessRegistrationNumber,
          description: input.description,
          services: input.services,
          coverage_areas: input.coverageAreas,
          contact_email: input.contactEmail,
          contact_phone: input.contactPhone,
          website: input.website,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  getMyProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const { data, error } = await ctx.supabase
        .from('agent_profiles')
        .select('*')
        .eq('user_id', ctx.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
      }

      return data;
    }),

  updateProfile: protectedProcedure
    .input(createAgentProfileSchema.partial())
    .mutation(async ({ input, ctx }) => {
      const updates: any = {};
      
      if (input.companyName) updates.company_name = input.companyName;
      if (input.businessRegistrationNumber) updates.business_registration_number = input.businessRegistrationNumber;
      if (input.description) updates.description = input.description;
      if (input.services) updates.services = input.services;
      if (input.coverageAreas) updates.coverage_areas = input.coverageAreas;
      if (input.contactEmail) updates.contact_email = input.contactEmail;
      if (input.contactPhone) updates.contact_phone = input.contactPhone;
      if (input.website) updates.website = input.website;

      const { data, error } = await ctx.supabase
        .from('agent_profiles')
        .update(updates)
        .eq('user_id', ctx.user.id)
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
      search: z.string().optional(),
      services: z.array(z.string()).optional(),
      location: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const { page, limit, search, services, location } = input;
      const offset = (page - 1) * limit;

      let query = ctx.supabase
        .from('agent_profiles')
        .select(`
          *,
          user:users(first_name, last_name)
        `, { count: 'exact' })
        .eq('is_verified', true)
        .order('rating', { ascending: false })
        .range(offset, offset + limit - 1);

      if (search) {
        query = query.or(`company_name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (services && services.length > 0) {
        query = query.overlaps('services', services);
      }

      if (location) {
        query = query.contains('coverage_areas', [location]);
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
        .from('agent_profiles')
        .select(`
          *,
          user:users(first_name, last_name),
          reviews:reviews!reviewee_id(
            rating,
            comment,
            created_at,
            reviewer:users(first_name, last_name)
          )
        `)
        .eq('id', input.id)
        .eq('is_verified', true)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),
});
