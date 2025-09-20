import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../lib/trpc';
import type { RegisterData, LoginCredentials } from '@cargolinked/types';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['individual', 'business', 'agent']),
  companyName: z.string().optional(),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, firstName, lastName, role, companyName, phone } = input;

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await ctx.supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Create user profile
      const { error: profileError } = await ctx.supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          role,
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          phone,
        });

      if (profileError) {
        throw new Error(profileError.message);
      }

      return {
        user: authData.user,
        message: 'Registration successful. Please check your email for verification.',
      };
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const { data, error } = await ctx.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        user: data.user,
        session: data.session,
      };
    }),

  logout: protectedProcedure
    .mutation(async ({ ctx }) => {
      const { error } = await ctx.supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return { message: 'Logged out successfully' };
    }),

  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const { data, error } = await ctx.supabase
        .from('users')
        .select('*')
        .eq('id', ctx.user.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),

  updateProfile: protectedProcedure
    .input(z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      companyName: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const updates: any = {};
      
      if (input.firstName) updates.first_name = input.firstName;
      if (input.lastName) updates.last_name = input.lastName;
      if (input.phone) updates.phone = input.phone;
      if (input.companyName) updates.company_name = input.companyName;

      const { data, error } = await ctx.supabase
        .from('users')
        .update(updates)
        .eq('id', ctx.user.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),
});
