"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useSession } from "next-auth/react";
import PersonalContentCard from "./PersonalContentCard";

function PersonalContent() {
  const { data: session } = useSession();
  const [recipeData, setRecipeData] = useState([]);
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
  const filteredData = recipeData.filter((data) => {
    if (data.userId === user) {
      return data;
    }
  });
  if (!session) {
    return (
      <div>Sorry you cannot access this page if you are not logged in</div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid px-3">
      <PersonalContentCard filteredData={filteredData} />
    </div>
  );
}

export default PersonalContent;
