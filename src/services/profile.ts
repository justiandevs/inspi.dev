import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers"

export const getSignedInUserProfile = async () => {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies
    });

    const { data: profile, error } = await supabase.from("profiles").select("*").eq('id', (await supabase.auth.getUser()).data.user?.id).single();

    return profile;
}