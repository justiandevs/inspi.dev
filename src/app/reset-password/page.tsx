"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupabase } from "@/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const resetPasswordSchema = yup.object({
  password: yup.string().required().min(8),
  verifyPassword: yup.string().required().min(8).oneOf([yup.ref("password")], "Your passwords aren't matching")
})

type IPasswordReset = yup.InferType<typeof resetPasswordSchema>;

export default function ResetPassword(): ReactElement {
  const [error, setError] = useState<string>();

  const { supabase } = useSupabase();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<IPasswordReset>({
    resolver: yupResolver(resetPasswordSchema)
  });
  const onSubmit: SubmitHandler<IPasswordReset> = async (data) => {
    await supabase.auth.updateUser({
      password: data.password
    })
      .then((res) => {
        if (res.error !== null) {
          setError(res.error.message);
          return;
        }

        router.push("/profile");
      })
  };

  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Reset your password</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Password</label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Your password"
            />
            <p className="text-[0.8rem] text-red-500">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Confirm password</label>
            <Input
              {...register("verifyPassword")}
              type="password"
              placeholder="Confirm your password"
            />
            <p className="text-[0.8rem] text-red-500">{errors.verifyPassword?.message}</p>
          </div>
          <div className="flex">
            <Button
              name="Reset password"
              type="submit"
              className="w-full"
            >
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
