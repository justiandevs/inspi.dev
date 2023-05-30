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

interface PasswordSettingsProps {
  placeholder: string
}

export const PasswordSettingsComponent = ({ placeholder }: PasswordSettingsProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();
  const { supabase} = useSupabase();

  // schemas
  const passwordResetSchema = yup.object({
    password: yup.string().required().min(8),
    verifyPassword: yup.string().required().min(8).oneOf([yup.ref("password")], "Your passwords aren't matching")
  });

  type IPasswordSettings = yup.InferType<typeof passwordResetSchema>;

  const { register, handleSubmit, formState: { errors }} = useForm<IPasswordSettings>({
    resolver: yupResolver(passwordResetSchema)
  });

  const onSubmit: SubmitHandler<IPasswordSettings> = async (formData) => {
    setLoading(true);
    setError("");

    await supabase.auth.updateUser({
      password: formData.password
    }).then((res) => {
      if (res.error !== null) {
        setLoading(false);
        setError(res.error.message);
        return;
      }

      setLoading(false);
      router.push('/profile');
    })
  };

  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[0.8rem] text-red-500">{error}</p>
      <Input
        {...register("password")}
        placeholder={placeholder}
        type="password"
      />
      <p className="text-[0.8rem] text-red-500">{errors.password?.message}</p>
      <Input
        {...register("verifyPassword")}
        placeholder={"Repeat your password"}
        type="password"
      />
      <p className="text-[0.8rem] text-red-500">{errors.verifyPassword?.message}</p>
      <Button
        disabled={loading}
        type="submit"
      >
        Change password
        {loading &&
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        }
      </Button>
    </form>
  )
}
