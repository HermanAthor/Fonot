"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditableImage from "./EditableImage";
import ToolTip from "./ToolTip";
import RecipeImages from "./RecipeImages";
import { Trash } from "lucide-react";
import Tiptap from "./TipTap";
import { useRouter } from "next/navigation";

const EditRecipe = ({ recipeData }) => {
  const { recipeTitle, recipeDesc, recipe, thumbnail, files, _id } = recipeData;
  const [title, setTitle] = useState(recipeTitle);
  const [description, setDescription] = useState(recipeDesc);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const [updatedThumbnail, setUpdatedThumbnail] = useState(thumbnail);
  const [updatedFiles, setUpdatedFiles] = useState(files);
  const router = useRouter();

  const deleteRecipe = async (id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("DELETED");
        router.push("/personal");
      }
    }
  };
  const updateRecipe = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            updatedRecipe,
            updatedFiles,
            updatedThumbnail,
          }),
        }
      );
      alert("Note updated");

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/personal");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full md:w-[70%] ">
      <CardHeader>
        <CardTitle>
          <ToolTip helperText={"Click to start editting"}>
            <input
              className="w-full outline-none "
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </ToolTip>
        </CardTitle>
        <CardDescription className="w-full">
          {/* <ToolTip helperText={"Click to start editting"}> */}
          <input
            className="w-full outline-none text-wrap overflow-hidden"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* </ToolTip> */}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white flex flex-col max-h-[80%] max-w-full">
        <div className="w-full mx-auto flex flex-col overflow-auto p-4 no-scrollbar">
          <EditableImage
            image={updatedThumbnail[0].url}
            setUpdatedThumbnail={setUpdatedThumbnail}
          />
          <RecipeImages
            files={updatedFiles}
            setUpdatedFiles={setUpdatedFiles}
          />
          <Tiptap receipe={updatedRecipe} onChange={setUpdatedRecipe} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row w-full justify-between items-center">
          <div></div>
          <div className="flex flex-row gap-5">
            <Button onClick={updateRecipe} variant="default">
              {/* <FilePenLine className="mr-2" />{" "} */}
              <span className="text-xl">Update</span>
            </Button>
            <ToolTip helperText={"Delete this recipe"}>
              <Button onClick={() => deleteRecipe(_id)} variant="destructive">
                <Trash className="mr-2" />{" "}
                <span className="text-xl">Delete</span>
              </Button>
            </ToolTip>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditRecipe;
