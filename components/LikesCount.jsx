import { Link } from "@mui/joy";
import React from "react";
import useSWR from "swr";
import CircularProgress from "@mui/joy/CircularProgress";

const getLikes = async () => {
  try {
    const response = await fetch("/api/likes", {
      next: { revalidate: 100 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching comments", error);
  }
};

function LikesCount({ _id }) {
  const { data, error, isLoading } = useSWR("/api/likes/count", getLikes);
  let likes = [];
  if (!isLoading && !error) {
    likes = data?.results;
  }
  const filteredLikes = likes?.filter((like) => like.likedRecipeId === _id);
  return (
    <>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        {isLoading ? (
          <CircularProgress color="primary" size="sm" variant="plain" />
        ) : (
          <span>
            {filteredLikes.length} {filteredLikes.length > 1 ? "Likes" : "Like"}
          </span>
        )}
      </Link>
    </>
  );
}

export default LikesCount;
