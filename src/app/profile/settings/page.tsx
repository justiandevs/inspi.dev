import { ReactElement } from "react";
import { protectThisRouteForUnauthenticatedUsers } from "../../../../lib/protected-routes";
import { getSignedInUserProfile } from "@/services/profile";
import {UsernameSettings} from "@/app/profile/settings/username-settings";

export default async function Settings (): Promise<ReactElement> {
  await protectThisRouteForUnauthenticatedUsers();
  const profile = await getSignedInUserProfile();

  return (
    <div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your username</h2>
        <UsernameSettings username={profile?.username} />
      </div>
    </div>
  )
}
