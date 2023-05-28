import { ReactElement } from "react";
import { protectThisRouteForUnauthenticatedUsers } from "../../../lib/protected-routes";
import { getSignedInUserProfile } from "@/services/profile";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Laptop } from "lucide-react";
import Link from "next/link";

export default async function Profile(): Promise<ReactElement> {
  await protectThisRouteForUnauthenticatedUsers();
  const profile = await getSignedInUserProfile();

  return (
    <div className="rounded-lg border">
      <div className="rounded-t-lg bg-white dark:bg-zinc-800 p-16 md:p-12 text-center">
        <h2 className="as-h4">{profile?.username} profile</h2>
      </div>
      <div className="flex md:block items-center w-full justify-center md:px-8">
        <Image src={profile?.avatar_url} width={100} height={100} alt={profile?.username} className="aspect-square object-cover rounded-lg -translate-y-1/2 col-span-1" />
      </div>
      <div className="px-8 flex flex-col md:grid grid-cols-4 gap-8 md:-mt-4 pb-8">
        <div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{profile?.username}</p>
            <p className="opacity-60">{profile?.biography}</p>
            <div className="flex flex-col md:flex-row md:gap-3 mt-4">
              <Laptop size={20} className="hidden md:block" />
              <Link href={profile?.website} className="text-primary">
                {profile?.website}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-3 md:-mt-16 flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <h3 className="as-h5">My projects</h3>
            <Button>
              Add project
            </Button>
          </div>
          <p className="opacity-60">We have not found any project.</p>
        </div>
      </div>
    </div>
  )
}
