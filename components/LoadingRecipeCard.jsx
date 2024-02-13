/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { Like } from "./Like";
import Skeleton from "react-loading-skeleton";

export default function LoadingRecipeCard({ recipeData }) {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((item, index) => {
          return (
            <Card
              key={index}
              variant="outlined"
              sx={{
                minWidth: { md: 400, sm: 300 },
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
                <Typography fontWeight="lg">
                  {<Skeleton count={3} />}{" "}
                </Typography>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: "auto" }}
                >
                  <MoreHoriz />
                </IconButton>
              </CardContent>
              <CardOverflow>
                <AspectRatio>
                  <Skeleton height={"100%"} />
                  {/* <img src={<Skeleton />} alt="food" loading="lazy" /> */}
                </AspectRatio>
              </CardOverflow>
              <CardContent
                orientation="horizontal"
                sx={{ alignItems: "center", mx: -1 }}
              >
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                  <Like item={item} />
                  <Skeleton />
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
                ></Box>
                <Box
                  sx={{
                    width: 0,
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <IconButton variant="plain" color="neutral" size="sm">
                    <BookmarkBorderRoundedIcon />
                  </IconButton>
                </Box>
              </CardContent>
              <CardContent>
                <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {<Skeleton />}
                </Link>
                <Typography fontSize="sm">{<Skeleton count={3} />}</Typography>
                <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  startDecorator="…"
                  sx={{ color: "text.tertiary" }}
                >
                  {<Skeleton />}
                </Link>
                <Link
                  component="button"
                  underline="none"
                  fontSize="10px"
                  sx={{ color: "text.tertiary", my: 0.5 }}
                >
                  {<Skeleton />}
                </Link>
              </CardContent>
            </Card>
          );
        })}
    </>
  );
}
