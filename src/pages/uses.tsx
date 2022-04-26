import UsesTech from "@/components/Uses";

import { USES } from "../data/usesData";

export default function Uses() {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          What I use
        </h1>
        <div className="text-gray-500 dark:text-gray-400 mt-5">
          I've seen similar lists flying around and I like the idea.
          <br />
          This is also a nice way to see how my setup changes over time.
        </div>
        <span className="text-lg font-semibold mt-3">Software&nbsp;&&nbsp;gear</span>
        <div className="mt-3">
          {USES.map((d) => (
            <UsesTech key={d.name} name={d.name} description={d.description} link={d.link} />
          ))}
        </div>
      </div>
    </>
  )
}
