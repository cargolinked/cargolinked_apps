import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qqzturpovtflwenmwvfw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxenR1cnBvdnRmbHdlbm13dmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTg0NTAsImV4cCI6MjA3MzkzNDQ1MH0.VmNQRlYl8_rfILeFod6Iv3NKeyyJa_EWkwTyIVX6IZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
