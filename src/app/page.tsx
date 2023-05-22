import {WorkInProgress} from "@/components/workInProgress";
import {Footer} from "@/layout/footer";
import {ReactElement} from "react";

export default function Home(): ReactElement {
  return (
    <main className="">
      {process.env.NEXT_PUBLIC_WORK_IN_PROGRESS === "true" ?
        <WorkInProgress />
          :
        <>
          <h1>heading 1</h1>
          <h2>heading 2</h2>
          <h3>heading 3</h3>
          <h4>heading 4</h4>
          <h5>heading 6</h5>
          <h6>heading 6</h6>
          <a href="https://test.dev">test.dev</a>
          <p>test</p>
        </>
      }
    </main>
  )
}
