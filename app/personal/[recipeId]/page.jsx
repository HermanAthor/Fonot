import AppLayout from "@/components/Layouts/AppLayout";
import { getData } from "@/lib/getData";
import React from "react";
import EditRecipe from "@/components/EditRecipe";

async function EditRecipePage({ params }) {
  const recipeId = params.recipeId;
  const { results } = await getData(
    `${process.env.BASE_URL}/api/recipes/${recipeId}`
  );
  let recipe = {};
  if (results) {
    recipe = results[0];
  }

  return (
    <AppLayout>
      <div className="mb-20 w-full">
        <EditRecipe recipeData={recipe} />
      </div>
    </AppLayout>
  );
}

export default EditRecipePage;
