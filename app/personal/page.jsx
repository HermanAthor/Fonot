import AppLayout from "@/components/Layouts/AppLayout";
import PersonalContent from "@/components/PersonalContent";
import { Button } from "@/components/ui/button";
import React from "react";

function PersonalContentPage() {
  return (
    <AppLayout>
      <div className="mb-20 w-full">
        <PersonalContent />
      </div>
    </AppLayout>
  );
}

export default PersonalContentPage;
