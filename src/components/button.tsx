import {ReactElement} from "react";
import Link from "next/link";

interface IButton {
  url?: string,
  name: string,
  type: "primary" | "secondary" | "danger",
  size?: "small" | "standard" | "large",
  form?: boolean,
  stretch?: boolean
}

export const Button = ({
  url,
  name,
  type,
  size = "standard",
  form = false,
  stretch = false
}: IButton): ReactElement => {
  if(!form) {
    return (
      <Link type={form ? "submit" : ""} href={url!} className={`button ${type} ${size} ${stretch ? "w-full text-center" : ""}`}>
        {name}
      </Link>
    )
  }

  return (
    <button type={form ? "submit" : "button"} className={`button ${type} ${size} ${stretch ? "w-full text-center" : ""}`}>
      {name}
    </button>
  )
}
