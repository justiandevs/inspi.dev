"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown";
import { useSupabase } from "@/providers/supabase-provider";
import { LogOut } from "lucide-react";
import { ReactElement } from "react";

export const Logout = (): ReactElement => {
  const { supabase } = useSupabase();

  const SupabaseLogout = async () => {
    await supabase.auth.signOut();
  }

  return (
    <DropdownMenuItem onClick={() => SupabaseLogout()}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}