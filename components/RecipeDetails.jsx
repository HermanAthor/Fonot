import { Typography } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import parse from "html-react-parser";

function RecipeDetails({ thumbnail, recipe, dietOption, files }) {
  return (
    <Box>
      <AspectRatio>
        <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
      </AspectRatio>
      <Typography>This is for people who eat {dietOption}</Typography>
      <Box>{parse(recipe)}</Box>
    </Box>
  );
}

export default RecipeDetails;
