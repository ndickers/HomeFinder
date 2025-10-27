"use client";
// src/components/StepBasic.js
import { useState } from "react";
//import { updateBasic } from "../api/propertyApi";

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

const StepBasic = ({ onNext }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: InputChangeEvent) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    // await updateBasic(propertyId, form);
    setLoading(false);
    onNext();
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Step 2: Basic Info</h2>
      <input
        className="border p-2 w-full rounded"
        name="title"
        placeholder="Property Title"
        onChange={handleChange}
      />
      <textarea
        className="border p-2 w-full rounded"
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <select
        className="border p-2 w-full rounded"
        name="type"
        onChange={handleChange}
      >
        <option value="">Select Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
      </select>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Next"}
      </button>
    </div>
  );
};
export default StepBasic;
