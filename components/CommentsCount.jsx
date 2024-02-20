import { Link } from "@mui/joy";
import React from "react";
import useSWR from "swr";
import CircularProgress from "@mui/joy/CircularProgress";

const getComments = async () => {
  try {
    const response = await fetch("/api/comments", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching comments", error);
  }
};

function CommentsCount({ recipeSlug }) {
  const { data, error, isLoading } = useSWR("/api/comments", getComments);
  let comments = [];
  if (!isLoading && !error) {
    comments = data?.results;
  }
  const filteredComments = comments?.filter((newComment) => {
    return newComment.recipeId === recipeSlug;
  });
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
          <span>{filteredComments.length} Comments</span>
        )}
      </Link>
    </>
  );
}

export default CommentsCount;
