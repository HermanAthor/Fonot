"use client";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

export const Like = ({ item }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = (clickedItem) => {
    const isCurrentlyLiked = likedItems.some(
      (item) =>
        item._id === clickedItem._id && item.userId === clickedItem.userId
    );
    setIsLiked(!isCurrentlyLiked);

    if (isCurrentlyLiked) {
      setLikedItems(
        likedItems.filter(
          (item) =>
            item._id !== clickedItem._id || item.userId !== clickedItem.userId
        )
      );
    } else {
      setLikedItems([...likedItems, clickedItem]);
    }
  };
  console.log(likedItems);

  return (
    <IconButton
      onClick={() => handleLike(item)}
      //onClick={() => setIsLiked((prev) => !prev)}
      variant="plain"
      color="neutral"
      size="sm"
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorder />}
    </IconButton>
  );
};
