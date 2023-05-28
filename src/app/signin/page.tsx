"use client";

import {ReactElement, useState} from "react";
// import {Button} from "@/components/button";
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSupabase} from "@/providers/supabase-provider";
import {useRouter} from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})

type ILogin = yup.InferType<typeof loginSchema>;

export default function Login(): ReactElement {
  const [error, setError] = useState<string>();

  const { supabase } = useSupabase();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }} = useForm<ILogin>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })
      .then((res) => {
        if(res.error !== null) {
          setError(res.error.message);
          return;
        }

        router.push("/profile");
      });
  };

  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Sign In to your account</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)} >
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
            <div className="flex flex-row justify-between items-center">
              <label className="text-[0.8rem]">Password</label>
              <Link href="/forgot-password" className="transition duration-300 text-[0.8rem] text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:dark:text-indigo-500 font-medium">
                Forgot password?
              </Link>
            </div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Your password"
            />
            <p className="text-[0.8rem] text-red-500">{errors.password?.message}</p>
          </div>
          <div className="flex">
            <Button
              name="Sign In"
              className="w-full"
              type="submit"
            >
              Sign In  
            </Button>
          </div>
        </form>
        <p className="mt-8 text-center">Not a member? <Link className="font-medium text-indigo-600 dark:text-indigo-400 hover:dark:text-indigo-500 hover:text-indigo-700" href={"/signup"}>Sign Up</Link></p>
      </div>
    </section>
  )
}
