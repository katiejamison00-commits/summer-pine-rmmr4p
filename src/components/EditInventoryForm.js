import React, { useState } from "react";

export default function EditInventoryForm({ currentItem, onSave, onCancel }) {
  const [form, setForm] = useState(currentItem);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border rounded bg-gray-50 mb-4">
      <h2 className="font-bold mb-2">Edit Inventory Item</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-1 m-1"
      >
        <option value="Balls">Balls</option>
        <option value="Shoes">Shoes</option>
        <option value="Snacks">Snacks</option>
      </select>
      <div className="mt-2">
        <button
          onClick={() => onSave(form)}
          className="bg-green-500 text-white px-2 py-1 m-1"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-2 py-1 m-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
