import {ReactElement} from "react";
import Link from "next/link";

interface IButton {
  url: string,
  name: string,
  type: "primary" | "secondary" | "danger",
  size?: "small" | "standard" | "large"
}

export const Button = ({
  url,
  name,
  type,
  size = "standard"
}: IButton): ReactElement => {
  return (
    <Link href={url} className={`button ${type} ${size}`}>
      {name}
    </Link>
  )
}
