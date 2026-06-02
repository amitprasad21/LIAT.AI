import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const isConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn(
    'Supabase environment variables are missing. Direct database synchronization will be disabled.'
  );
}

// Export a mock client if not configured to prevent client-side crashes
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      from: () => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        insert: async (data: any) => {
          console.log('[MOCK SUPABASE INSERT]', data);
          // Return a mock success response so client UI logic handles it gracefully
          return { data, error: null };
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
