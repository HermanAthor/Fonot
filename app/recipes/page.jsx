import AppLayout from "@/components/Layouts/AppLayout";
import RecipeCard from "@/components/RecipeCard";
import React from "react";

function RecipesPage() {
  return (
    <AppLayout>
      <div className="flex flex-wrap justify-center items-center md:gap-3 md:grid md:grid-cols-3">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </AppLayout>
  );
}

export default RecipesPage;
