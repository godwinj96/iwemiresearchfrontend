// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://moozotwbqobybcbidade.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vb3pvdHdicW9ieWJjYmlkYWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NTA4NzUsImV4cCI6MjAzNjAyNjg3NX0.vxgduaikTJqD7fFyipzvKCXwiTfzK9M_aWU6BBXQkgM'
export const supabase = createClient(supabaseUrl, supabaseKey)
