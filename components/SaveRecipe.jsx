"use client";
import IconButton from "@mui/joy/IconButton";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { Typography } from "@mui/joy";

const getFavourites = async () => {
  try {
    const response = await fetch("/api/favourites", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch favourites");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching favourites", error);
  }
};

export const SavePost = ({ item }) => {
  const { data, error, isLoading } = useSWR("/api/favourites", getFavourites);
  let favourites = [];
  if (!isLoading && !error) {
    favourites = data?.results;
  }
  const router = useRouter();
  const userId = "1234";
  //Alert after the user has posted the favourite recipe
  const alertAfterPost = () => {
    toast("comment posted", {
      description:
        " You have added this recipe to your favourites Note: You can remove it when you go to your personal panel",
      action: {
        label: "Undo",
        onClick: () => alert("Sorry, but you currently can't undo this"),
      },
    });
  };
  //check if the user has saved the post
  const isFavourite = favourites?.some(
    (favourite) =>
      favourite.favouriteRecipeId === item._id &&
      favourite.userId === item.userId
  );

  //Handle post like to the database.
  const postSaveRecipe = async (favourite) => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          favouriteRecipeId: favourite._id,
          posterUserId: favourite.userId,
          isPublic: favourite.isPublic,
          recipe: favourite.recipe,
          recipeTitle: favourite.recipeTitle,
          recipeDesc: favourite.recipeDesc,
          dietOption: favourite.dietOption,
          recipeDuration: favourite.recipeDuration,
          files: favourite.files,
          thumbnail: favourite.thumbnail,
        }),
      });
      const { results } = res.json();
      console.log(results);
      if (res.ok) {
        mutate("/api/favourites");
        alertAfterPost();
        router.push("/recipes");
      } else {
        throw new Error("Failed to post a like to this post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Handle deleting like from the database
  // const deleteSavedRecipe = async (likedPost) => {
  //   const confirmed = confirm("Are you sure?");
  //   const recipeToDelete = likes.find(
  //     (reci) =>
  //       reci.likedRecipeId === likedPost._id &&
  //       reci.likedRecipeUserId === likedPost.userId
  //   );

  //   if (confirmed) {
  //     const res = await fetch(`/api/favourites?id=${recipeToDelete._id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       alert("You just disliked this post");
  //     }
  //   }
  // };

  const handleSave = (clickedItem) => {
    mutate("/api/favourites");
    if (!isFavourite) {
      postSaveRecipe(clickedItem);
    }
  };

  return (
    <>
      {isFavourite ? (
        <Typography>Saved</Typography>
      ) : (
        <IconButton
          onClick={() => handleSave(item)}
          variant="plain"
          color="neutral"
          size="sm"
        >
          <BookmarkBorderRoundedIcon />
        </IconButton>
      )}
    </>
  );
};
