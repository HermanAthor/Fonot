import Link from "next/link";
import HeroSection from "./landing-page/HeroSection";
import { HowItWorksLeft, HowItWorksRight } from "./landing-page/HowItWorks";
import { Interested } from "./landing-page/Interested";
import { Footer } from "./landing-page/Footer";

async function App() {
  const user = "234";

  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = date.toLocaleString("en-DK", options);
  return (
    <>
      <HeroSection />
      <Link href={"/createNote"}>
        <HowItWorksRight
          image="/create-recipe.png"
          heading={"Start by CREATING"}
          description={
            "Share your kitchen secrets with the commuity by using our AI assisted editor"
          }
        />
      </Link>
      <Link href={"/recipes"}>
        <HowItWorksLeft
          image="/community-posts.png"
          heading={"Check out the COMMUNITY posts"}
          description={
            "With an instagram feel and interface but more purposeful to interact with the community posts"
          }
        />
      </Link>
      <Link href={"/recipes"}>
        <HowItWorksRight
          image="/comment-post.png"
          heading={"Interact with the RECIPES too"}
          description={
            "You can do all common post interactions with the recipes you see... Comment, Save, OR give it a like. You name it"
          }
        />
      </Link>
      <Link href="/personal">
        <HowItWorksLeft
          image="/personal-posts.png"
          heading={"You wanna keep things PERSONAL?"}
          description={
            "We have got your back, You can choose to keep all your posts personal with your access only. Thats because every post is fully authenticated by your own credentials. You can contacts us to know more about this."
          }
        />
      </Link>
      <Interested />
      <Footer />
    </>
  );
}

export default App;

{
  /* <section className="bg-white dark:bg-gray-900 bg-[url('/images/notes-photo.jpg')] bg-no-repeat bg-fixed bg-cover h-screen w-full">
  <div>
    {user && (
      <div className="flex justify-center  pt-5 px-5">
        <div className="flex flex-row gap-2 justify-between items-center w-full text-2xl ">
          <p className="text-sm md:text-xl">{currentDate}</p>
          
        </div>
      </div>
    )}
  </div>
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
        Notes Solution for Productivity
      </h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-3xl dark:text-gray-400">
        Targeted to keep you in sync and improve your productivity. From all the
        tiny notes details to your reminders, financial, todos and Work.
      </p>
      <Link
        href="/recipes"
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        View Notes
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
      </Link>
      <Link
        href="/createNote"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Start Creating Notes
      </Link>
    </div>
  </div>
</section>; */
}
