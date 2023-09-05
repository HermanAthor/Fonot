"use client";
import DialogComp from "@/components/DialogComp";
import AppLayout from "@/components/Layouts/AppLayout";
import DetailModal from "@/components/Modals/DetailModal";
import NavHeader from "@/components/NavHeader";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  //handling the modal state ...
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  console.log("Selected Note: ", selectedNote);

  const handleEdit = () => {
    // a function that determines if i can show the edit functionallity or not*
    setEdit(!edit);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNote(null);
  };

  const ModalOpen = (note) => {
    setIsOpen(true);
    setSelectedNote(note);
    console.log("Note", note);
  };

  useEffect(() => {
    fetch("/api/getNote")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotes(data.results);
          console.log(notes);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const filteredNotes = notes.filter((filteredNote) => {
    if (search === "") {
      return filteredNote;
    } else if (
      filteredNote.newNoteTitle.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.newNote.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.category.toLowerCase().includes(search.toLowerCase())
    ) {
      return filteredNote;
    }
  });

  return (
    <AppLayout>
      <div className="overflow-y-auto">
        <NavHeader />
        <div className="flex justify-center items-center p-4 mx-24">
          <input
            className="w-full p-3 rounded-3xl mt-3 mb-3 border-2 border-slate-700"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="px-10">
          <Typography variant="h5">
            {" "}
            You have {filteredNotes.length} Notes
          </Typography>
        </div>
        <div className="container overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            {notes &&
              filteredNotes.map((note) => {
                const { category, newNoteTitle, newNote, _id } = note;
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

                const getBgColor = () => {
                  let bgColor1 = "";
                  if (category) {
                    if (category === "work") {
                      return (bgColor1 = "#f2fa84");
                    } else if (category === "todos") {
                      return (bgColor1 = "#fa7066");
                    } else if (category === "reminders") {
                      return (bgColor1 = "#84ecfa");
                    } else if (category === "money") {
                      return (bgColor1 = "#84fa88");
                    }
                  }
                };
                return (
                  <>
                    <Card
                      key={_id}
                      className={`${bgColor}`}
                      onClick={() => ModalOpen(note)}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: { getBgColor } }}
                            aria-label="category"
                          >
                            {category[0].toUpperCase()}
                          </Avatar>
                        }
                        title={newNoteTitle}
                        subheader={category}
                      />
                      <CardContent>
                        <Typography variant="body2">{newNote}</Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton>
                          <MoreHorizOutlinedIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </>
                );
              })}
          </div>
          {isOpen && (
            <DetailModal
              note={selectedNote}
              isOpen={isOpen}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default AllNotes;

/*
<div
  key={_id}
  style={{ backgroundColor: bgColor1 }}
  className="w-full border-2 p-5 gap-3 mx-3 space-x-4 shadow-lg"
>
  <div className="flex flex-col justify-start">
    <div className="flex flex-row gap-2">
      <Avatar className={`${bgColor}`}>
        {category[0].toUpperCase()}
      </Avatar>
      <div className="flex flex-col">
        <p>{newNoteTitle}</p>
        <p>{category}</p>
      </div>
    </div>
    <div className="flex">
      <p className="leading-relaxed">{newNote}</p>
    </div>
  </div>
</div>


*/
