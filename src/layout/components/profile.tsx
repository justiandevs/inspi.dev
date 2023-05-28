import { getSignedInUserProfile } from "@/services/profile"
import Image from "next/image";
import { ReactElement } from "react";

const Profile = async (): Promise<ReactElement> => {
    const profile = await getSignedInUserProfile();

    return (
        <div>
            <Image
                src={profile?.avatar_url}
                width={32}
                height={32}
                alt="profile image"
                className="h-8 w-8 rounded-full"
            />
        </div>
    )
}

export { Profile }