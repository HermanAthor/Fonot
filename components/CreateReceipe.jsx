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

function CreateReceipe() {
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [dietOption, setDietOptions] = useState("");
  const router = useRouter();

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
      message: "Something is not right",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      receipe: "",
      receipeTitle: "",
      receipeDesc: "",
      duration: 0,
    },
  });
  // All the form data
  const formData = {
    files: files,
    thumbnail: thumbnail,
    isPublic: isPublic,
    dietOption: dietOption,
  };
  // Function to post recipe to the database

  const postRecipe = () => {
    console.log("The recipe", files, thumbnail, isPublic, dietOption);
    router.push("/allNotes");
  };
  return (
    <div className="pt-10">
      <div className="text-2xl mb-4">Create a recipe</div>
      <Form {...form}>
        <form onSubmit={postRecipe}>
          <FormField
            control={form.control}
            name="receipeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Receipe title"
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
            name="receipeDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Receipe description"
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
          <FormField
            control={form.control}
            name="recipe"
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
