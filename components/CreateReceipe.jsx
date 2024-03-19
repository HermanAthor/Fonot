"use client";
import React, { useState } from "react";
import Tiptap from "./TipTap";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ImageUploader from "./ImageUploader";
import ThumbnailUploader from "./ThumbnailUploader";
import { DietOptions, PrivateOrPublic } from "./RadioButtons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { alertUserToSign } from "@/lib/alertUserToSignIn";
import { useRecoilState } from "recoil";
import { generatedRecipeState } from "./providers/stateStore";

function CreateReceipe() {
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [dietOption, setDietOptions] = useState("");
  const [generatedRecipe, setGeneratedRecipe] =
    useRecoilState(generatedRecipeState);
  const router = useRouter();
  const { data: session } = useSession();

  function stringToBool(value) {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    return value;
  }
  const handleIsPrivate = (event) => {
    setIsPublic(stringToBool(event.target.value));
  };
  const handleDietOptions = (event) => {
    setDietOptions(event.target.value);
  };
  const formSchema = z.object({
    receipe: z
      .string()
      .min(5, { message: "description can't be less than five characters" }),
    receipeTitle: z.string().min(5, {
      message: "Its better when your title is longer than 5 characters",
    }),
    receipeDesc: z.string().min(5, {
      message: "Its better when your title is longer than 5 characters",
    }),
    duration: z.string().min(1, {
      message: "You need to tell us how long it takes to prepare the meal",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      recipe: "",
      recipeTitle: "",
      recipeDesc: "",
      duration: 0,
    },
  });
  const { getValues } = form;

  // All the form data

  const alertAfterPost = () => {
    toast("Recipe has been created", {
      description:
        "Congradulations!! You have chosen to share some your meals with us and your friends",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };
  // Function to post recipe to the database
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    if (session) {
      const userId = session?.user?.id;
      try {
        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            files: files,
            thumbnail: thumbnail,
            isPublic: isPublic,
            dietOption: dietOption,
            recipe: getValues("recipe"),
            recipeTitle: getValues("recipeTitle"),
            recipeDesc: getValues("recipeDesc"),
            recipeDuration: getValues("duration"),
          }),
        });
        // const { results } = res.json();
        // console.log(results);
        if (res.ok) {
          alertAfterPost();
          router.push("/allNotes");
        } else {
          throw new Error("Failed to create a topic");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alertUserToSign();
    }
  };

  return (
    <div className="pt-10">
      <div className="text-2xl mb-4">Create a recipe</div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="recipeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Recipe title"
                    receipe={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipeDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Recipe description"
                    receipe={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time it takes to prepare</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Time to prepare in minutes"
                    receipe={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe description</FormLabel>
                <FormControl>
                  <ThumbnailUploader
                    files={thumbnail}
                    setFiles={setThumbnail}
                    title={"Attach recipe thumbnail"}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe</FormLabel>
                <FormControl>
                  <Tiptap receipe={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <p>{generatedRecipe}</p>
          <FormField
            control={form.control}
            name="dietOptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose diet options</FormLabel>
                <FormControl>
                  <DietOptions handleChange={handleDietOptions} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Images to attach for your recipe</FormLabel> */}
                <FormControl>
                  <ImageUploader
                    files={files}
                    setFiles={setFiles}
                    title={"Attach recipe images for your recipe"}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <PrivateOrPublic handleChange={handleIsPrivate} />
          <Button type="submit" className="my-4">
            Post receipe
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateReceipe;
