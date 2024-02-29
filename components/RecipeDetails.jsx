import { Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import parse from "html-react-parser";
import DetailsImages from "./DetailsImages";

function RecipeDetails({ thumbnail, recipe, dietOption, files }) {
  return (
    <Box>
      <AspectRatio>
        <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
      </AspectRatio>
      <Typography>This is for people who eat {dietOption}</Typography>
      <Box>{parse(recipe)}</Box>
      <div className="flex flex-wrap md:grid md:grid-cols-5 gap-3 ">
        {files?.map((file) => (
          <div
            style={{
              backgroundImage: `url(${file.url})`,
              backgroundSize: "cover",
            }}
            className="bg-no-repeat h-36 md:h-60 w-60 rounded-xl relative"
          ></div>
        ))}
      </div>
      {/* <DetailsImages images={files} /> */}
    </Box>
  );
}

export default RecipeDetails;
