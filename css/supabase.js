const SUPABASE_URL = "https://zuvvaggooddpblqhgsdb.supabase.co";
const SUPABASE_KEY = "postgresql://postgres:jesussempreteama@db.zuvvaggooddpblqhgsdb.supabase.co:5432/postgres";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
