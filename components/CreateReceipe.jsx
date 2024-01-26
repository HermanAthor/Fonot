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

import Image from "next/image";
import ImageUploader from "./ImageUploader";

function CreateReceipe() {
  const [files, setFiles] = useState([]);
  console.log(files);
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
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      receipe: "",
      receipeTitle: "",
      receipeDesc: "",
    },
  });
  return (
    <div className="pt-10">
      <div className="text-2xl mb-4">Create a recipe</div>
      <Form {...form}>
        <form>
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
            name="receipe"
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
            name="receipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe</FormLabel>
                <FormControl>
                  <ImageUploader files={files} setFiles={setFiles} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="my-4">
            Post receipe
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateReceipe;
