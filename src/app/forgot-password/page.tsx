"use client";

import {ReactElement, useState} from "react";
import {Button} from "@/components/button";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSupabase} from "@/components/supabaseProvider";

const forgotPasswordSchema = yup.object({
  email: yup.string().required().email(),
})

type IForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

export default function SignUp(): ReactElement {
  const [status, setStatus] = useState<string>();

  const { supabase } = useSupabase();

  const { register, handleSubmit, formState: { errors }} = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema)
  });
  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: process.env.NEXT_PUBLIC_RESET_PASSWORD_URL
    })
      .then((res) => {
        setStatus("If there is an account known by us with your email we will send you a reset password mail in a few minutes.");
      });
  };

  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Forgot your password?</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)} >
          {status ? <p className="text-green-500">{status}</p> : <></>}
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Email address</label>
            <input
              {...register("email")}
              className="rounded-lg border border-gray-200 py-2 dark:bg-zinc-900 dark:border-zinc-800"
              type="text"
              placeholder="Your email address"
            />
            <p className="text-[0.8rem] text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex">
            <Button
              name="Send password reset mail"
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