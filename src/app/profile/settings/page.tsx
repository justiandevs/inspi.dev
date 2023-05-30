import { ReactElement } from "react";
import { getSignedInUserProfile } from "@/services/profile";
import {SettingsComponent} from "@/app/profile/settings/settings";
import {PasswordSettingsComponent} from "@/app/profile/settings/password-settings";
import {UploadSettingsComponent} from "@/app/profile/settings/upload-settings";

export default async function Settings (): Promise<ReactElement> {
  const profile = await getSignedInUserProfile();

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your username</h2>
        <SettingsComponent defaultValue={profile?.username} schema={"usernameResetSchema"} placeholder={"Your username"} field={"username"} />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">New avatar</h2>
        <UploadSettingsComponent />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your biography</h2>
        <SettingsComponent defaultValue={profile?.biography} schema={"biographyResetSchema"} placeholder={"Your biography"} field={"biography"} isTextarea />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your website</h2>
        <SettingsComponent defaultValue={profile?.website} schema={"siteResetSchema"} placeholder={"Your website"} field={"website"} />
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="as-h5 mb-4">Your password</h2>
        <PasswordSettingsComponent placeholder={"Your password"} />
      </div>
    </div>
  )
}
