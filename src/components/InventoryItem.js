import React from "react";

export default function InventoryItem({ item, onEdit, onDelete }) {
  return (
    <div className="p-2 flex justify-between border-b items-center">
      <span>
        {item.name} ({item.category}) — Qty: {item.quantity} — ${item.price}
      </span>
      <div>
        <button
          onClick={() => onEdit(item)}
          className="text-blue-600 hover:underline mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm(`Delete ${item.name}?`)) onDelete(item.id);
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
