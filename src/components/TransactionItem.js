import React from "react";

export default function TransactionItem({ tx, onEdit, onDelete }) {
  return (
    <div className="p-2 flex justify-between border-b items-center">
      <span>
        {tx.date} — {tx.type} — ${tx.amount} ({tx.notes})
      </span>
      <div>
        <button
          onClick={() => onEdit(tx)}
          className="text-blue-600 hover:underline mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm("Delete this transaction?")) onDelete(tx.id);
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
