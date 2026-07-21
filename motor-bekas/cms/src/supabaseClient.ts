import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvccsovqznpsxfwauaca.supabase.co';
const supabaseAnonKey = 'sb_publishable_qoD5_Tm-GCIv75C7sboN6w_UH-Yv05l';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
