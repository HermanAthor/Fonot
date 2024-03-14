import AppLayout from "@/components/Layouts/AppLayout";
import { RecipePage } from "@/components/RecipePage";
import React from "react";

function RecipesPage() {
  return (
    <AppLayout>
      <div className="mb-20">
        <RecipePage />
      </div>
    </AppLayout>
  );
}

export default RecipesPage;
