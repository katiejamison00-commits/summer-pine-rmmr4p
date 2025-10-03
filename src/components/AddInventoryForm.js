import React, { useState } from "react";

export default function AddInventoryForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "Balls",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border rounded bg-green-50 mb-4">
      <h2 className="font-bold mb-2">Add New Inventory Item</h2>
      <input
        name="name"
        placeholder="Item name"
        value={form.name}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
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
          onClick={() => onAdd(form)}
          className="bg-green-600 text-white px-2 py-1 m-1"
        >
          Add
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
