import AppLayout from "@/components/Layouts/AppLayout";
import RecipeCard from "@/components/RecipeCard";
import { RecipePage } from "@/components/RecipePage";
import React from "react";

function RecipesPage() {
  return (
    <AppLayout>
      <RecipePage />
    </AppLayout>
  );
}

export default RecipesPage;
