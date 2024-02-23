"use client";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

const getLikes = async () => {
  try {
    const response = await fetch("/api/likes", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching comments", error);
  }
};

export const Like = ({ item }) => {
  const { data, error, isLoading } = useSWR("/api/likes", getLikes);
  let likes = [];
  if (!isLoading && !error) {
    likes = data?.results;
  }
  const [likedItems, setLikedItems] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  //check if the user has liked the post
  const isCurrentlyLiked = likes?.some(
    (likedItem) =>
      likedItem.likedRecipeId === item._id &&
      likedItem.likedRecipeUserId === item.userId
  );
  //setIsLiked(isCurrentlyLiked);

  //Handle post like to the database.
  const postLike = async (likedPost) => {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          likedRecipeId: likedPost._id,
          likedRecipeUserId: likedPost.userId,
        }),
      });
      const { results } = res.json();
      console.log(results);
      if (res.ok) {
        mutate("/api/likes");
        setLikedItems(likes);
        //alertAfterPost();
        router.push("/recipes");
      } else {
        throw new Error("Failed to post a like to this post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Handle deleting like from the database
  const deleteLike = async (likedPost) => {
    const confirmed = confirm("Are you sure?");
    const recipeToDelete = likes.find(
      (reci) =>
        reci.likedRecipeId === likedPost._id &&
        reci.likedRecipeUserId === likedPost.userId
    );

    if (confirmed) {
      const res = await fetch(`/api/likes?id=${recipeToDelete._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("You just disliked this post");
      }
    }
  };

  // const handleLike = (clickedItem) => {
  //   mutate("/api/likes");
  //   if (isCurrentlyLiked) {
  //     deleteLike(clickedItem);
  //   } else {
  //     postLike(clickedItem);
  //   }
  // };

  return (
    <>
      {isCurrentlyLiked ? (
        <IconButton
          onClick={() => deleteLike(item)}
          variant="plain"
          color="neutral"
          size="sm"
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => postLike(item)}
          variant="plain"
          color="neutral"
          size="sm"
        >
          <FavoriteBorder />
        </IconButton>
      )}
    </>
  );
};
