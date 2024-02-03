import AppLayout from "@/components/Layouts/AppLayout";
import RecipeCard from "@/components/RecipeCard";
import React from "react";

function RecipesPage() {
  return (
    <AppLayout>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:grid">
        <RecipeCard />
      </div>
    </AppLayout>
  );
}

export default RecipesPage;
