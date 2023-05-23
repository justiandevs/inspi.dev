"use client";

import {ReactElement, useState} from "react";
import {Button} from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSupabase} from "@/components/supabaseProvider";
import {useRouter} from "next/navigation";

const resetPasswordSchema = yup.object({
  password: yup.string().required().min(8),
  verifyPassword: yup.string().required().min(8).oneOf([yup.ref("password")], "Your passwords aren't matching")
})

type IPasswordReset = yup.InferType<typeof resetPasswordSchema>;

export default function SignUp(): ReactElement {
  const [error, setError] = useState<string>();

  const { supabase } = useSupabase();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }} = useForm<IPasswordReset>({
    resolver: yupResolver(resetPasswordSchema)
  });
  const onSubmit: SubmitHandler<IPasswordReset> = async (data) => {
    await supabase.auth.updateUser({
      password: data.password
    })
      .then((res) => {
        if(res.error !== null) {
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
            <input
              {...register("password")}
              className="rounded-lg border border-gray-200 py-2 dark:bg-zinc-900 dark:border-zinc-800"
              type="password"
              placeholder="Your password"
            />
            <p className="text-[0.8rem] text-red-500">{errors.password?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Confirm password</label>
            <input
              {...register("verifyPassword")}
              className="rounded-lg border border-gray-200 py-2 dark:bg-zinc-900 dark:border-zinc-800"
              type="password"
              placeholder="Confirm your password"
            />
            <p className="text-[0.8rem] text-red-500">{errors.verifyPassword?.message}</p>
          </div>
          <div className="flex">
            <Button
              name="Reset password"
              type="primary"
              size="small"
              form={true}
              stretch={true}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
