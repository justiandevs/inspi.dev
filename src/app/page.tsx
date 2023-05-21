import {WorkInProgress} from "@/components/workInProgress";
import {Footer} from "@/components/footer";
import {ReactElement} from "react";

export default function Home(): ReactElement {
  return (
    <main className="">
      {process.env.NEXT_PUBLIC_WORK_IN_PROGRESS === "true" ?
        <WorkInProgress />
          :
        <>
          Empty
        </>
      }
      <Footer />
    </main>
  )
}
