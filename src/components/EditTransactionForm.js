import React, { useState } from "react";

export default function EditTransactionForm({ currentTx, onSave, onCancel }) {
  const [form, setForm] = useState(currentTx);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 border rounded bg-gray-50 mb-4">
      <h2 className="font-bold mb-2">Edit Transaction</h2>
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
        value={form.amount}
        onChange={handleChange}
        className="border p-1 m-1"
      />
      <input
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="border p-1 m-1"
      />
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
