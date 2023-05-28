"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupabase } from "@/providers/supabase-provider";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const forgotPasswordSchema = yup.object({
  email: yup.string().required().email(),
})

type IForgotPassword = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPassword(): ReactElement {
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { supabase } = useSupabase();

  const { register, handleSubmit, formState: { errors } } = useForm<IForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema)
  });
  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    setLoading(true);

    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: process.env.NEXT_PUBLIC_RESET_PASSWORD_URL
    })
      .then((res) => {
        setLoading(false);
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
            <Input
              {...register("email")}
              type="text"
              placeholder="Your email address"
            />
            <p className="text-[0.8rem] text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex">
            <Button
              disabled={loading}
              name="Send password reset mail"
              type="submit"
              className="w-full"
            >
              Request a password reset
              {loading &&
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              }
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
