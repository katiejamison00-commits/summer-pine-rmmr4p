import React, { useState } from "react";

export default function AddTransactionForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    date: "",
    type: "Sale",
    amount: 0,
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border rounded bg-blue-50 mb-4">
      <h2 className="font-bold mb-2">Add New Transaction</h2>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-1 m-1"
      >
        <option value="Sale">Sale</option>
        <option value="Purchase">Purchase</option>
      </select>
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <div className="mt-2">
        <button
          onClick={() => onAdd(form)}
          className="bg-blue-600 text-white px-2 py-1 m-1"
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
