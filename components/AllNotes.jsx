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
import Search from "@/components/Search";
//import { UserButton, useUser } from "@clerk/nextjs";
import SelectComp from "@/components/SelectComp";
import Draggable from "react-draggable";
import { getBgColor, getCardBgColor } from "@/app/libs/dynamicColors";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  //const { user } = useUser(); //getting user object

  //handling the modal state ...
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

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
  };

  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotes(data.results);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const filteredNotes = notes?.filter((filteredNote) => {
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
      <NavHeader setSearch={setSearch} />

      <div className="px-10 flex flex-row justify-between items-center w-full">
        <div className="my-4 flex flex-row justify-between w-auto items-center gap-10">
          <Typography variant="h6" className="text-lg ">
            {" "}
            You have {filteredNotes.length} Notes
          </Typography>
          <div className="hidden md:flex w-96">
            <Search setSearch={setSearch} search={search} />
          </div>
          <div className="inline md:hidden ">
            <SelectComp notes={notes} />
          </div>
        </div>
        <div className="hidden md:flex flex-row justify-center items-center gap-3">
          profile
        </div>
      </div>
      <div className="overflow-y-auto p-2 no-scrollbar">
        <div className=" overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            {notes &&
              filteredNotes.map((note) => {
                const { category, newNoteTitle, newNote, _id } = note;
                const avatarBg = getBgColor(category);
                const cardBg = getCardBgColor(category);

                return (
                  <>
                    <Draggable
                      axis="both"
                      handle=".handle"
                      defaultPosition={{ x: 0, y: 0 }}
                      position={null}
                      grid={[25, 25]}
                      scale={1}
                      key={_id}
                    >
                      <Card
                        key={_id}
                        className={`handle ${cardBg} dark:bg-[#515354]`}
                        onClick={() => ModalOpen(note)}
                        sx={{ bgcolor: cardBg }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: avatarBg }}
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
                    </Draggable>
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
