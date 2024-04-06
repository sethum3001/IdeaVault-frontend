import React, { useState, useEffect } from "react";
import axios from "axios";

const LabelBar = ({ labelBarKey, onLabelSelect }) => {
  const [labels, setLabels] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchLabels = async () => {
      try {
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
  }, [labelBarKey]);

  return (
    <div className="my-4">
      <div className="flex space-x-2">
        <label
          onClick={() => onLabelSelect("")}
          className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-center"
        >
          No Label
        </label>
        <div className="flex space-x-2">
          {labels.map((label) => (
            <span
              key={label}
              onClick={() => onLabelSelect(label.labelName)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 flex items-center justify-center"
            >
              {label.labelName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabelBar;
