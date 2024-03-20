import { useRecoilState } from "recoil";
import { generatedRecipeState } from "./providers/stateStore";
import copy from "copy-to-clipboard";
import { Button } from "./ui/button";
import { useState } from "react";

export const CopyGeneratedText = () => {
  const [generatedRecipe, setGeneratedRecipe] =
    useRecoilState(generatedRecipeState);
  const [copyStatus, setCopyStatus] = useState(false);
  // function to run when recipe is copied
  const onCopy = () => {
    copy(generatedRecipe);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 5000);
  };
  return (
    <>
      {generatedRecipe && (
        <div>
          {copyStatus ? (
            <Button variant="copied" disabled>
              Copied!
            </Button>
          ) : (
            <Button onClick={() => onCopy()}>Copy generated recipe</Button>
          )}
        </div>
      )}
    </>
  );
};
