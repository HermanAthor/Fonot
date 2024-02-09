"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

// const fetchRecipes = async () => {
//   try {
//     const response = await fetch("/api/recipes");
//     const data = await response.json();

//     if (data.success) {
//       return data.results;
//     } else {
//       throw new Error("Failed to fetch recipes");
//     }
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }
// };

export function RecipePage() {
  const [recipeData, setRecipeData] = useState([]);
  //   const recipeData = await fetchRecipes();

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

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
      <RecipeCard recipeData={recipeData} />
    </div>
  );
}
