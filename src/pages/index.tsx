import ShortcutHome from "@/components/ShortcutHome";
import Image from "next/image";
import React from "react";
import { RoughNotation } from "react-rough-notation";

const IndexPage = () => (
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight leading-11 text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            I'm <span className="text-primary-color dark:text-primary-color-dark">Phuong</span>, a
            senior software engineer who's trying to get a bit better every day
          </h1>
        </div>
        <div>
          <Image
            src="/static/avatar.jpg"
            alt="avatar"
            width="384px"
            height="384px"
            className=" [clip-path:polygon(0%_0%,100%_0%,50%_100%,0%_50%)]"
          />
        </div>
      </div>
      <p className="text-lg leading-7 text-slate-600 dark:text-slate-300">
        This is my place for{' '}
        <RoughNotation
          type="underline"
          show={true}
          color="#fff176"
          animationDelay={800}
          animationDuration={1200}
        >
          thoughts,{' '}
        </RoughNotation>
        <RoughNotation
          type="underline"
          show={true}
          color="#ADD8E6"
          animationDelay={1400}
          animationDuration={1200}
        >
          reflections,{' '}
        </RoughNotation>
        &{' '}
        <RoughNotation
          type="underline"
          show={true}
          color="#FF0000"
          animationDelay={1700}
          animationDuration={1200}
        >
          everything{' '}
        </RoughNotation>
        in between
      </p>
      <div className="flex justify-center w-full">
        <div className="justify-center mt-2">
          <ShortcutHome />
        </div>
      </div>
    </div>
  </div>
)

export default IndexPage