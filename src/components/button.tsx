import {ReactElement} from "react";
import Link from "next/link";

interface IButton {
  url: string,
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
  return (
    <Link type="submit" href={url} className={`button ${type} ${size} ${stretch ? "w-full text-center" : ""}`}>
      {name}
    </Link>
  )
}
