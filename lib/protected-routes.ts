import {createServerComponentSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

export const protectThisRouteForUnauthenticatedUsers = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  });

  const { data: { user } } = await supabase.auth.getUser();

  if(!user) {
    redirect("/");
  }
}
