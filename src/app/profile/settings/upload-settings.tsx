"use client";

import {ReactElement, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/components/ui/button";
import {useSupabase} from "@/providers/supabase-provider";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';

export const UploadSettingsComponent = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();
  const { supabase} = useSupabase();

  // schemas
  const fileSchema = yup.object().shape({
    fileUpload: yup.mixed<FileList>()
      .test(
      "required",
      "You have to upload a file",
      (files) => {
        if(files?.length! > 0) {
          return true;
        }
        return false;
        }
      )
      .test(
        "fileType",
        "You have to upload an jpeg, png or webp image",
        (files) => {
          if(files && files?.length > 0) {
            if(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files[0].type)) {
              return true;
            }
            return false;
          }
          return false;
        }
      )
  });

  type IUploadSettings = yup.InferType<typeof fileSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IUploadSettings>({
    resolver: yupResolver(fileSchema)
  });

  const onSubmit: SubmitHandler<IUploadSettings> = async (formData) => {
    setLoading(true);
    setError("");

    const avatarFile = formData.fileUpload as FileList;
    const file = avatarFile?.[0];
    const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(uuidv4() + "." + extension, file, {
        cacheControl: "3600",
        upsert: false
      })

    if(error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update({ avatar_url: "https://ktwzakzuaxzmalpgpdlz.supabase.co/storage/v1/object/public/avatars/" + data?.path })
      .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if(profileError) {
      setLoading(false);
      setError(profileError.message);
      return;
    }

    setLoading(false);
    router.push('/profile');
  };

  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[0.8rem] text-red-500">{error}</p>
      <Input
        {...register("fileUpload")}
        type="file"
        accept="image/*"
      />
      <p className="text-[0.8rem] text-red-500">{errors.fileUpload?.message}</p>
      <Button
        disabled={loading}
        type="submit"
      >
        Upload avatar
        {loading &&
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        }
      </Button>
    </form>
  )
}
