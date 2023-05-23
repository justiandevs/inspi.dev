import {ReactElement} from "react";
import {protectThisRouteForUnauthenticatedUsers} from "../../../lib/protected-routes";

export default async function Profile(): Promise<ReactElement> {
  await protectThisRouteForUnauthenticatedUsers();

  return (
    <section className="py-16 dark:bg-zinc-800 bg-white">
      <div className="container-bsc">
        <h1>Profile</h1>
      </div>
    </section>
  )
}
