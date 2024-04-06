import React, { useState } from "react";
import axios from "axios";

const NoteCard = ({ note, labels, setFilteredNotes, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [selectedLabel, setSelectedLabel] = useState(note.label);
  const [isPin, setIsPin] = useState(note.isPin);

  const handleEditNote = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Create new note object with updated values
    const updatedNote = {
      _id: note._id,
      title: title,
      body: body,
      label: selectedLabel,
      isPin: isPin,
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `http://localhost:8070/notes/${updatedNote._id}`,
        updatedNote,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Note updated:", response.data);

      // Fetch updated notes after successful edit
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }

    // Close modal
    setShowModal(false);
  };

  const handleDeleteNote = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8070/notes/${note._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Fetch updated notes after successful delete
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const fetchNotes = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8070/notes", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data); // Update filteredNotes as well
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 my-4">
      <h3 className="text-lg font-semibold ">{note.title}</h3>
      <p className="text-gray-600 text-left my-5">{note.body}</p>
      <div className="flex justify-end mt-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          onClick={() => handleDeleteNote()}
        >
          Delete
        </button>

        {showModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Edit Note</h2>
      <form onSubmit={handleEditNote}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="label" className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <select
            id="label"
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select label</option>
            {labels.map((label) => (
              <option key={label._id} value={label.labelName}>
                {label.labelName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isPin"
            checked={isPin}
            onChange={(e) => setIsPin(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isPin" className="text-sm font-medium text-gray-700">
            Pin Note
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default NoteCard;
