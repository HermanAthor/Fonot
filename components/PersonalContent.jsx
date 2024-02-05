"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function PersonalContent() {
  const [recipeData, setRecipeData] = useState([]);
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

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
      <RecipeCard recipeData={filteredData} />
    </div>
  );
}

export default PersonalContent;
