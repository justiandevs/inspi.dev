"use client";

import {ReactElement} from "react";
import {Button} from "@/components/button";
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const registerSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  verifyPassword: yup.string().required().min(8).oneOf([yup.ref("password")], "Your passwords aren't matching")
})

type IRegister = yup.InferType<typeof registerSchema>;

export default function SignUp(): ReactElement {
  const { register, handleSubmit, formState: { errors }} = useForm<IRegister>({
    resolver: yupResolver(registerSchema)
  });
  const onSubmit: SubmitHandler<IRegister> = data => console.log(data);

  return (
    <section className="container-bsc py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="as-h3">Sign Up for Inspi</h1>
        <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit(onSubmit)} >
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
              name="Sign Up"
              type="primary"
              size="small"
              form={true}
              stretch={true}
            />
          </div>
        </form>
        <p className="mt-8 text-center">Already a member? <Link className="font-medium text-indigo-600 dark:text-indigo-500 hover:dark:text-indigo-600 hover:text-indigo-700" href={"/signin"}>Sign In</Link></p>
      </div>
    </section>
  )
}
