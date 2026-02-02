import { createClient } from '@supabase/supabase-js';

const URL = 'https://frdmhwubmrhwinvyzjty.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZG1od3VibXJod2ludnl6anR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5ODA0OTcsImV4cCI6MjA4NTU1NjQ5N30.shO5KZvQ3U0kSZteVapXm5tqn_mssCQpkZKrRljKP0U';

export const supabase = createClient(URL, API_KEY);