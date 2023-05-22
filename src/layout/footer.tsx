import {ReactElement} from "react";
import Link from "next/link";

export const Footer = (): ReactElement => {
  return (
    <footer className="container-bsc text-center text-[0.80rem] py-8">
      <p className="text-[0.80rem]">Inspi.dev is a project made by <Link className="text-[0.80rem] transition duration-300 hover:dark:text-indigo-600 hover:text-indigo-700" href="https://justian.dev">Justian.dev</Link></p>
    </footer>
  )
}
