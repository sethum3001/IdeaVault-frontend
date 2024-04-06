import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../const";

const Label = ({ setLabelBarKey }) => {
  const [showModal, setShowModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [existingLabels, setExistingLabels] = useState([]);

  // Function to fetch existing labels from the server
  const fetchLabels = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/labels`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setExistingLabels(response.data);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  // Function to create a new label
  const handleCreateLabel = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/labels`,
        { labelName: newLabel },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Refetch existing labels after creating a new one
      fetchLabels();
      setNewLabel("");
      setLabelBarKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error creating label:", error);
    }
  };

  // Function to delete a label
  const handleDeleteLabel = async (labelId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/labels/${labelId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Refetch existing labels after deleting one
      fetchLabels();
      setLabelBarKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  // Function to handle editing label
  const handleEditLabel = async (labelId, newName) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.patch(
        `${BASE_URL}/labels/${labelId}`,
        { labelName: newName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Refetch existing labels after editing one
      fetchLabels();
      setLabelBarKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error editing label:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    fetchLabels();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="border-solid border-2 border-blue-500 hover:border-blue-700 text-black py-1 px-4 rounded mr-2"
      >
        Edit Labels
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-white rounded-lg overflow-hidden max-w-lg w-full">
              <div className="p-8">
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Enter new label"
                  className="border border-gray-300 rounded-md p-2 mb-4 block w-full"
                />
                <button
                  onClick={handleCreateLabel}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Create
                </button>
                <div className="mt-3">
                  <ul>
                    {existingLabels.map((label) => (
                      <li
                        key={label._id}
                        className="flex items-center justify-between mb-2"
                      >
                        <input
                          type="text"
                          value={label.labelName}
                          onChange={(e) => {
                            label.labelName = e.target.value;
                            setExistingLabels([...existingLabels]);
                          }}
                          className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
                        />
                        <button
                          onClick={() => handleDeleteLabel(label._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            handleEditLabel(label._id, label.labelName)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Save
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Label;
