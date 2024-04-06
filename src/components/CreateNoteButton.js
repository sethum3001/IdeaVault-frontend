import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateNoteButton = ({ onCreateNote }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isPin, setIsPin] = useState(false);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8070/labels", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLabels(response.data);
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    };

    fetchLabels();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Create new note object
    const newNote = {
      title,
      body,
      label: selectedLabel,
      isPin,
    };

    // Call onCreateNote function passed from parent component
    onCreateNote(newNote);
    setTitle("");
    setBody("");
    setSelectedLabel("");
    setIsPin(false);

    // Close modal
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        onClick={() => setShowModal(true)}
      >
        Create Note
      </button>

      {/* Modal */}
      {showModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">Create New Note</h2>
      <form onSubmit={handleCreateNote}>
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
  );
};

export default CreateNoteButton;
