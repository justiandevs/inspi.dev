"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSupabase } from "@/providers/supabase-provider";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const registerSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  verifyPassword: yup.string().required().min(8).oneOf([yup.ref("password")], "Your passwords aren't matching")
})

type IRegister = yup.InferType<typeof registerSchema>;

export default function SignUp(): ReactElement {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { supabase } = useSupabase();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<IRegister>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    setLoading(true);

    await supabase.auth.signUp({
      email: data.email,
      password: data.password
    }).then((res) => {
      if (res.error !== null) {
        setLoading(false);
        setError(res.error.message);
        return;
      }

      router.push("/signin");
    });
  };

  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Sign Up for Inspi</h1>
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit(onSubmit)} >
          {error ? <p className="text-red-500">{error}</p> : <></>}
          <div className="flex flex-col gap-2">
            <label className="text-[0.8rem]">Email address</label>
            <Input
              {...register("email")}
              type="text"
              placeholder="Your email address"
            />
            <p className="text-[0.8rem] text-red-500">{errors.email?.message}</p>
          </div>
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
              disabled={loading}
              name="Sign Up"
              className="w-full"
              type="submit"
            >
              Sign Up
              {loading &&
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              }
            </Button>
          </div>
        </form>
        <p className="mt-8 text-center">Already a member? <Link className="font-medium text-indigo-600 dark:text-indigo-400 hover:dark:text-indigo-500 hover:text-indigo-700" href={"/signin"}>Sign In</Link></p>
      </div>
    </section>
  )
}
