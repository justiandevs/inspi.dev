"use client";

import {ReactElement, useEffect, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSupabase} from "@/providers/supabase-provider";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";

interface UsernameSettingsProps {
  username: string;
}

export const UsernameSettings = ({ username }: UsernameSettingsProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();
  const { supabase} = useSupabase();

  const userNameResetSchema = yup.object({
    username: yup.string().required().min(3),
  })

  type IReset = yup.InferType<typeof userNameResetSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IReset>({
    resolver: yupResolver(userNameResetSchema)
  });

  const onSubmit: SubmitHandler<IReset> = async (formData) => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("profiles")
      .update({ username: formData.username })
      .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if(error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[0.8rem] text-red-500">{error}</p>
      <Input
        {...register("username")}
        type="text"
        placeholder="Your username..."
        defaultValue={username}
      />
      <p className="text-[0.8rem] text-red-500">{errors.username?.message}</p>
      <Button
        disabled={loading}
        type="submit"

      >
        Change username
        {loading &&
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        }
      </Button>
    </form>
  )
}
