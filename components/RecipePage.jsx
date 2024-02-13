"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import useSWR from "swr";
import LoadingRecipeCard from "./LoadingRecipeCard";

const fetchRecipes = async () => {
  try {
    const response = await fetch("/api/recipes");
    const data = await response.json();

    if (data.success) {
      return data.results;
    } else {
      throw new Error("Failed to fetch recipes");
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

export function RecipePage() {
  const { data, error, isLoading } = useSWR("/api/recipes", fetchRecipes);
  if (error) {
    console.log("Error while fetching the recipes", error);
    return (
      <div>
        Sorry, An error occured while trying to fetch the recipes. Try again
        later
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
        <LoadingRecipeCard />
      </div>
    );
  }
  if (data) {
    console.log(data);
    return (
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
        <RecipeCard recipeData={data} />
      </div>
    );
  }

  // return (
  //   <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
  //     <RecipeCard recipeData={data.results} />
  //   </div>
  // );
}
