import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900 w-full ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className=" mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-9xl dark:text-white">
            Make your kitchen exciting
          </h1>
          <p className=" mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            The goal is to make other people's kithens and plates as exciting as
            yours. So share your recipes with us
          </p>
          <a
            href="/createNote"
            className="inline-flex items-center justify-center px-5 py-4 mb-6 mr-3 text-base font-medium text-center text-white  animate-pulse  rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-blue-900"
          >
            Get started with sharing your favourite recipes
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center px-5 py-4 mt-4 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Jump into what the community have created
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex animate-accordion-up">
          <img src="/food.png" alt="food" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
