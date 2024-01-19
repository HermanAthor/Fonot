"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function RemoveBtn({ id, handleClose }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/notes?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        handleClose();
        router.refresh();
      }
    }
  };

  return (
    <Button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </Button>
  );
}
