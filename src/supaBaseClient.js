// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnkmpdgotqcyfhoskrhm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhua21wZGdvdHFjeWZob3NrcmhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MTI0MTQsImV4cCI6MjAzNjE4ODQxNH0.1jDpFsCGvC9m5Brgq9Nl36JNasVmfpRG4mQjfoVCUu0'
export const supabase = createClient(supabaseUrl, supabaseKey)
