import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import LabelBar from "../components/LabelBar";
import CreateNoteButton from "../components/CreateNoteButton";
import Label from "../components/Label";
import UserInfo from "../components/UserInfo";
import Logo from "../components/Logo";
import { BASE_URL } from "../const";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [labelBarKey, setLabelBarKey] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/labels`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLabels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Note:", notes);
    const filtered = notes.filter(
      (note) =>
        note.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [notes, searchQuery]);

  useEffect(() => {
    if (selectedLabel) {
      const filtered = notes.filter((note) =>
        note.label.includes(selectedLabel)
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [notes, selectedLabel]);

  const handleLabelSelect = (label) => {
    setSelectedLabel(label);
  };

  const handleCreateNote = async (newNote) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(`${BASE_URL}/notes`, newNote, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Note created:", response.data);
      setNotes([...notes, response.data]);
      setFilteredNotes([...filteredNotes, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col mt-10">
        <Logo />
        <UserInfo />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 my-2 py-2 px-2 md:px-0">
        <SearchBar setSearchQuery={setSearchQuery} />
        <CreateNoteButton onCreateNote={handleCreateNote} />
      </div>
      <div className="flex py-2 items-center bg-gray-100">
        <Label setLabelBarKey={setLabelBarKey} />
        <LabelBar labelBarKey={labelBarKey} onLabelSelect={handleLabelSelect} />
      </div>

      <div className="mb-4">
        <h2 className="text-base font-medium mb-2">Pinned Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredNotes
            .filter((note) => note.isPin)
            .map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                labels={labels}
                setNotes={setNotes}
                setFilteredNotes={setFilteredNotes}
              />
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-base font-medium mb-2">Unpinned Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredNotes
            .filter((note) => !note.isPin)
            .map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                labels={labels}
                setNotes={setNotes}
                setFilteredNotes={setFilteredNotes}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
