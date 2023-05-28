import {ReactElement} from "react";
import {protectThisRouteForUnauthenticatedUsers} from "../../../lib/protected-routes";
import { getSignedInUserProfile } from "@/services/profile";

export default async function Profile(): Promise<ReactElement> {
  await protectThisRouteForUnauthenticatedUsers();
  const profile = await getSignedInUserProfile();

  return (
    <section className="py-16">
      <div className="container-bsc">
        <h1>Welcome {profile?.username}</h1>
      </div>
    </section>
  )
}
