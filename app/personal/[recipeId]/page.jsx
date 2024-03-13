import AppLayout from "@/components/Layouts/AppLayout";
import { getData } from "@/lib/getData";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import { Button } from "@/components/ui/button";
import EditRecipe from "@/components/EditRecipe";

async function EditRecipePage({ params }) {
  const recipeId = params.recipeId;
  const { results } = await getData(
    `${process.env.BASE_URL}/api/recipes/${recipeId}`
  );
  console.log(results[0]);
  let recipe = {};
  if (results) {
    recipe = results[0];
  }

  return (
    <AppLayout>
      <EditRecipe recipeData={recipe} />
    </AppLayout>
  );
}

export default EditRecipePage;
