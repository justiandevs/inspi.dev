import {ReactElement} from "react";
import {FaGithub, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

export const WorkInProgress = (): ReactElement => {
  return (
    <section className="container-bsc py-32 flex flex-col gap-4">
      <h1 className="text-white text-4xl font-semibold">Inspi.dev is still in progress 👷</h1>
      <p className="text-white w-full md:w-1/2 text-[1.25rem] leading-[1.825rem] opacity-80">Ran out of ideas to work on as a developer? Get inspired by projects or ideas that were made by other developers and shared at Inspi.</p>
      <h2 className="text-white text-2xl font-medium mt-4">Stay informed via my personal social media</h2>
      <p className="text-white w-full md:w-1/2 text-[1.25rem] leading-[1.825rem] opacity-80">Interested in the progression of inspi.dev? Stay up to date via my personal social media.</p>
      <div className="flex flex-row gap-2 mt-2">
        <a href={"https://github.com/justiandevs"} aria-label="github" className="opacity-100">
          <div className="p-3 border border-white border-opacity-20 rounded-full transition duration-300 hover:border-opacity-100">
            <FaGithub className="text-white" />
          </div>
        </a>
        <a href={"https://www.linkedin.com/in/justian-spijkerbosch-a4b74118b/"} aria-label="linkedin" className="opacity-100">
          <div className="p-3 border border-white border-opacity-20 rounded-full transition duration-300 hover:border-opacity-100">
            <FaLinkedin className="text-white" />
          </div>
        </a>
        <a href={"https://twitter.com/Justiandev"} aria-label="twitter" className="opacity-100">
          <div className="p-3 border border-white border-opacity-20 rounded-full transition duration-300 hover:border-opacity-100">
            <FaTwitter className="text-white" />
          </div>
        </a>
        <a href={"https://instagram.com/justianspijkerbosch"} aria-label="instagram" className="opacity-100">
          <div className="p-3 border border-white border-opacity-20 rounded-full transition duration-300 hover:border-opacity-100">
            <FaInstagram className="text-white" />
          </div>
        </a>
      </div>
    </section>
  )
}
