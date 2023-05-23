"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {createBrowserSupabaseClient, Session, SupabaseClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from "next/navigation";
import {Database} from "../../lib/database.types";

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>,
  session: MaybeSession
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session
} : {
  children: ReactNode,
  session: MaybeSession
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context);

  if(context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context;
}
