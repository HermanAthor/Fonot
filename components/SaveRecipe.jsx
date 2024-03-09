"use client";
import IconButton from "@mui/joy/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import { logIn } from "@/app/actions";

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
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR("/api/favourites", getFavourites);
  let favourites = [];
  if (!isLoading && !error) {
    favourites = data?.results;
  }
  const router = useRouter();
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
  //Alert user to login
  const alertUserToSign = () => {
    toast.info("Cannot perform this task", {
      position: "top-center",
      duration: 5000,
      description:
        " You need to be logged in to make a comment: Please consider to log in",
      action: {
        label: "Sign In",
        onClick: () => logIn(),
      },
    });
  };
  const warningToRemoveSavedRecipe = () => {
    toast("Can't remove from saved", {
      description:
        " To remove saved recipes you need to go to your personal panel to delete them",
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
    if (session) {
      const userId = session?.user?.id;
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
    } else {
      alertUserToSign();
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
        <IconButton
          onClick={warningToRemoveSavedRecipe}
          variant="plain"
          color="neutral"
          size="sm"
        >
          <BookmarkAddedIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => handleSave(item)}
          variant="plain"
          color="neutral"
          size="sm"
        >
          <BookmarkAddIcon />
        </IconButton>
      )}
    </>
  );
};
