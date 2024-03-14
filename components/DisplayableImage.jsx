import AspectRatio from "@mui/joy/AspectRatio";
import React from "react";

const DisplayableImage = ({ image }) => {
  return (
    <div
      className="relative group"
      style={{ background: `url(${image})`, backgroundSize: "cover" }}
    >
      <AspectRatio objectFit="cover" ratio={"4/3"}>
        <img src={image} alt="recipe" loading="lazy" />
      </AspectRatio>
    </div>
  );
};

export default DisplayableImage;
