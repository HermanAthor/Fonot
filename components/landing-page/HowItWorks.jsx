import React from "react";

export const HowItWorksRight = ({ image, heading, description }) => {
  return (
    <section className="bg-white dark:bg-gray-900 w-full ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hue-rotate-30 ">
          <img src={image} alt="food" />
        </div>
        <div className="mr-auto ml-5 place-self-center lg:col-span-7">
          <h1 className=" mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-9xl dark:text-white">
            {heading}
          </h1>
          <p className=" mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksLeft = ({ image, heading, description }) => {
  return (
    <section className="bg-white dark:bg-gray-900 w-full ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto ml-5 place-self-center lg:col-span-7">
          <h1 className=" mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-9xl dark:text-white">
            {heading}
          </h1>
          <p className=" mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hue-rotate-30">
          <img src={image} alt="food" />
        </div>
      </div>
    </section>
  );
};
