"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useSession } from "next-auth/react";
import PersonalContentCard from "./PersonalContentCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

function PersonalContent() {
  const { data: session } = useSession();
  const [recipeData, setRecipeData] = useState([]);
  const [category, setCategory] = useState(false);
  // const user = session?.user?.id;
  const user = "1234";

  useEffect(() => {
    fetch("/api/recipes", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRecipeData(data.results);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);
  const filteredDataByUserId = recipeData.filter((data) => {
    if (data.userId === user) {
      return data;
    }
  });
  if (!session) {
    return (
      <div>Sorry you cannot access this page if you are not logged in</div>
    );
  }
  const filteredDataByCategory = filteredDataByUserId.filter((data) => {
    return data.isPublic === category;
  });
  const publicPostsCount = filteredDataByUserId.filter(
    (item) => item.isPublic === true
  ).length;
  const privatePostsCount = filteredDataByUserId.filter(
    (item) => item.isPublic === false
  ).length;

  return (
    <>
      <div className="flex flex-col w-full">
        <h2 className=" sroll-m-20 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
          Posts that you have created{" "}
        </h2>
        <div className="flex flex-row gap-4 py-4">
          <Button
            disabled
            // onClick={() => setCategory(true)}
            className="relative text-xl active:font-extrabold focus:font-extrabold focus:border-2 focus:border-b-black cursor-help"
            variant="link"
          >
            All
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {filteredDataByUserId.length}
            </div>
          </Button>

          <Button
            onClick={() => setCategory(true)}
            className="relative text-xl active:font-extrabold focus:font-extrabold focus:border-2 focus:border-b-black"
            variant="link"
          >
            Public
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {publicPostsCount}
            </div>
          </Button>
          <Button
            onClick={() => setCategory(false)}
            className="relative text-xl active:font-extrabold focus:font-extrabold focus:border-2 focus:border-b-black"
            variant="link"
          >
            Private
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {privatePostsCount}
            </div>
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid px-1">
        {filteredDataByCategory ? (
          <PersonalContentCard filteredData={filteredDataByCategory} />
        ) : (
          <div className=" w-[50%] items-center lg:mt-0 lg:col-span-5 lg:flex animate-spin">
            <img src="/food.png" alt="food" />
          </div>
        )}
      </div>
    </>
  );
}

export default PersonalContent;
