import React from "react";
import Link from "next/link";

const navData = [
  {
    title: "Notes",
    icon: "/clipboard-list.svg",
    link: "/allNotes",
  },
  {
    title: "Personal",
    icon: "/menu-square.svg",
    link: "/mynotes",
  },
  {
    title: "Recipes",
    icon: "/cooking-pot.svg",
    link: "/recipes",
  },
  {
    title: "Create",
    icon: "/plus.svg",
    link: "/createNote",
  },
];

function BottomNavigation() {
  return (
    <div className="md:hidden flex flex-row justify-between items-center px-3 py-2 fixed bottom-0 w-full bg-slate-700">
      {navData.map((item) => (
        <Link key={item.title} href={item.link}>
          <div className="flex justify-evenly items-center flex-col">
            <img src={item.icon} alt={item.title} />
            <h6 className="ml-2 text-sm text-center items-center">
              {item.title}
            </h6>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigation;
