const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_KEY = "SUA_CHAVE_PUBLICA";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
