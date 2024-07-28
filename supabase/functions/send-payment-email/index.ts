// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import "https://deno.land/x/smtp/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import {corsHeaders} from '/cors.ts'
/*


console.log("Hello from Functions!")


import { Resend } from 'resend';



const RESEND_API_KEY = 're_XRcihKa1_Lb3owErFAcG7giaakfxppovJ'

const handler = async (_request: Request): Promise<Response> => {
  if (_request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }


  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'hello world',
      html: '<strong>it works!</strong>',
    }),
  })


  const data = await res.json()

  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allow all origins, replace '*' with your frontend URL for security
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)


To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-payment-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
