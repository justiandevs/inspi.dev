import {ReactElement} from "react";
import Link from "next/link";

export const Footer = (): ReactElement => {
  return (
    <footer className="container-bsc text-center py-8">
      <p>Inspi.dev is a project made by <Link className="transition duration-300 hover:dark:text-indigo-400 hover:text-indigo-700" href="https://justian.dev">Justian.dev</Link></p>
    </footer>
  )
}
