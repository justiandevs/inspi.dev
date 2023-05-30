"use client";

import {ReactElement, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/components/ui/button";
import {useSupabase} from "@/providers/supabase-provider";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";

interface SettingsProps {
  defaultValue: string
  schema: "siteResetSchema" | "biographyResetSchema" | "usernameResetSchema"
  placeholder: string,
  field: "website" | "biography" | "avatar_url" | "username"
}

export const SettingsComponent = ({ defaultValue, schema, placeholder, field }: SettingsProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const router = useRouter();
  const { supabase} = useSupabase();

  // schemas
  const schemas = {
    siteResetSchema: yup.object({
      field: yup.string().required().url(),
    }),
    biographyResetSchema: yup.object({
      field: yup.string().required().min(4),
    }),
    usernameResetSchema: yup.object({
      field: yup.string().required().min(3)
    })
  }

  type ISettings = yup.InferType<typeof schemas[typeof schema]>;

  const { register, handleSubmit, formState: { errors }} = useForm<ISettings>({
    resolver: yupResolver(schemas[schema])
  });

  const onSubmit: SubmitHandler<ISettings> = async (formData) => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("profiles")
      .update({ [field] : formData.field })
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
        {...register("field")}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <p className="text-[0.8rem] text-red-500">{errors.field?.message}</p>
      <Button
        disabled={loading}
        type="submit"

      >
        Change {field}
        {loading &&
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        }
      </Button>
    </form>
  )
}
