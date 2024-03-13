import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio, Typography } from "@mui/joy";
import LikesCount from "./LikesCount";
import CommentsCount from "./CommentsCount";
import { Button } from "./ui/button";
import { FilePenLine } from "lucide-react";
import Link from "next/link";

function PersonalContentCard({ filteredData }) {
  return (
    <>
      {filteredData.map((data) => {
        const { recipeTitle, recipeDesc, thumbnail, _id } = data;
        return (
          <Card>
            <CardHeader>
              <CardTitle>{recipeTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <AspectRatio objectFit="cover" ratio={"4/3"}>
                <img src={thumbnail[0]?.url} alt="recipe" loading="lazy" />
              </AspectRatio>
              <Typography>{recipeDesc}</Typography>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-row gap-5">
                  <LikesCount _id={_id} />
                  <CommentsCount recipeSlug={_id} />
                </div>
                <div>
                  <Link href={`/personal/${_id}`}>
                    <Button variant="link">
                      <FilePenLine className="mr-2" />{" "}
                      <span className="text-xl">Edit</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default PersonalContentCard;
