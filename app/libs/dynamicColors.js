export const getBgColor = (category) => {
  let bgColor1 = "";
  if (category) {
    if (category === "work") {
      bgColor1 = "#f2fa84";
    } else if (category === "todos") {
      bgColor1 = "#fa7066";
    } else if (category === "reminders") {
      bgColor1 = "#84ecfa";
    } else if (category === "money") {
      bgColor1 = "#84fa88";
    }
  }
  return bgColor1;
};

export const getCardBgColor = (category) => {
  let bgColor = "";
  if (category) {
    if (category === "work") {
      bgColor = "bg-yellow-500";
    } else if (category === "todos") {
      bgColor = "bg-red-500";
    } else if (category === "reminders") {
      bgColor = "bg-blue-500";
    } else if (category === "work") {
      bgColor = "bg-yellow-500";
    } else if (category === "money") {
      bgColor = "bg-green-500";
    }
  }
  return bgColor;
};
