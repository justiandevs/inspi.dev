import {ReactElement} from "react";
import Link from "next/link";

export const Footer = (): ReactElement => {
  return (
    <footer className="container-bsc text-center">
      <p className="opacity-80">Inspi.dev is a project made by <Link className="transition duration-300 hover:text-yellow-400" href="https://justian.dev">Justian.dev</Link></p>
    </footer>
  )
}
