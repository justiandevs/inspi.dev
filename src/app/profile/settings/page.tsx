import { ReactElement } from "react";
import { protectThisRouteForUnauthenticatedUsers } from "../../../../lib/protected-routes";
import { getSignedInUserProfile } from "@/services/profile";
import {SettingsComponent} from "@/app/profile/settings/settings";
import * as yup from "yup";

export default async function Settings (): Promise<ReactElement> {
  await protectThisRouteForUnauthenticatedUsers();
  const profile = await getSignedInUserProfile();

  const siteResetSchema = yup.object({
    field: yup.string().required().url(),
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your username</h2>
        <SettingsComponent defaultValue={profile?.username} schema={"usernameResetSchema"} placeholder={"Your username"} field={"username"} />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your biography</h2>
        <SettingsComponent defaultValue={profile?.biography} schema={"biographyResetSchema"} placeholder={"Your biography"} field={"biography"} />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your website</h2>
        <SettingsComponent defaultValue={profile?.website} schema={"siteResetSchema"} placeholder={"Your website"} field={"website"} />
      </div>
    </div>
  )
}
