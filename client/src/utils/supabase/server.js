import "server-only"
import { createServerClient } from '@supabase/ssr'


export async function createClient() {

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: ()=>[],
        setAll: ()=>{},
      },
    }
  )
}