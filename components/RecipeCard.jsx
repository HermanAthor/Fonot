/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import SendOutlined from "@mui/icons-material/SendOutlined";
import CommentTextInput from "./CommentTextInput";
import { Comments } from "./Comments";
import { Like } from "./Like";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { toast } from "sonner";
import LikesCount from "./LikesCount";
import CommentsCount from "./CommentsCount";
import { SavePost } from "./SaveRecipe";
import { RecipeDetailDialog } from "./RecipeDetailsDialog";
import { recipeDurationCount } from "@/lib/recipeDurationCount";

export default function RecipeCard({ recipeData }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [comment, setComment] = useState("");
  const router = useRouter();
  // notify the user about the comment post

  const alertAfterPost = () => {
    toast("comment posted", {
      description: " You have added a comment to this post",
      action: {
        label: "Undo",
        onClick: () => alert("Sorry, but you currently can't undo this"),
      },
    });
  };

  //handlepost comment
  const postComment = async (userId, recipeId) => {
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          comment,
          userId,
          recipeId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create a comment. Status: ${res.status}`);
      }
      alertAfterPost();
      const { results } = await res.json();

      // setData(results);

      router.push("/recipes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {recipeData?.length === 0 ? (
        <div className="flex justify-center items-center text-2xl">
          There is nothing to show you here
        </div>
      ) : (
        <>
          {recipeData?.map((item) => {
            const {
              _id,
              userId,
              files,
              thumbnail,
              isPublic,
              dietOption,
              recipe,
              recipeTitle,
              recipeDesc,
              recipeDuration,
            } = item;
            return (
              <Card
                variant="outlined"
                sx={{
                  minWidth: { md: "100%", sm: 300 },
                  "--Card-radius": (theme) => theme.vars.radius.xs,
                }}
              >
                <CardContent
                  orientation="horizontal"
                  sx={{ alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        m: "-2px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                      },
                    }}
                  >
                    <Avatar
                      size="sm"
                      src="/static/logo.png"
                      sx={{
                        p: 0.5,
                        border: "2px solid",
                        borderColor: "background.body",
                      }}
                    />
                  </Box>
                  <Typography fontWeight="lg">Athor</Typography>
                  <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ ml: "auto" }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </CardContent>
                <RecipeDetailDialog
                  isDesktop={isDesktop}
                  thumbnail={thumbnail}
                  recipeTitle={recipeTitle}
                  recipeDesc={recipeDesc}
                  recipe={recipe}
                  dietOption={dietOption}
                  files={files}
                />
                <CardContent
                  orientation="horizontal"
                  sx={{ alignItems: "center", mx: -1 }}
                >
                  <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                    <Like item={item} />
                    {/* <RecipeDetailDialog isDesktop={isDesktop} /> */}
                    <Comments
                      recipeSlug={_id}
                      isDesktop={isDesktop}
                      setComment={setComment}
                      postComment={postComment}
                      userId={userId}
                      _id={_id}
                    />
                    <IconButton variant="plain" color="neutral" size="sm">
                      <SendOutlined />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mx: "auto",
                    }}
                  >
                    <Typography>
                      {recipeDurationCount(recipeDuration)} to prepare
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 0,
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <SavePost item={item} />
                  </Box>
                </CardContent>
                <CardContent>
                  <LikesCount _id={_id} />
                  <CommentsCount recipeSlug={_id} />
                  <Typography fontSize="sm">{recipeDesc}</Typography>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    startDecorator="…"
                    sx={{ color: "text.tertiary" }}
                  >
                    more
                  </Link>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="10px"
                    sx={{ color: "text.tertiary", my: 0.5 }}
                  >
                    2 DAYS AGO
                  </Link>
                </CardContent>
                <CommentTextInput
                  setComment={setComment}
                  postComment={postComment}
                  userId={userId}
                  _id={_id}
                />
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}
