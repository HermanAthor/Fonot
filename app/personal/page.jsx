import AppLayout from "@/components/Layouts/AppLayout";
import PersonalContent from "@/components/PersonalContent";
import React from "react";

function PersonalContentPage() {
  return (
    <AppLayout>
      <div className="mb-20">
        <PersonalContent />
      </div>
    </AppLayout>
  );
}

export default PersonalContentPage;
