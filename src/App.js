import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import InventoryItem from "./components/InventoryItem";
import EditInventoryForm from "./components/EditInventoryForm";
import AddInventoryForm from "./components/AddInventoryForm";
import TransactionItem from "./components/TransactionItem";
import EditTransactionForm from "./components/EditTransactionForm";
import AddTransactionForm from "./components/AddTransactionForm";

export default function App() {
  // Load inventory from localStorage (or start with empty array)
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("inventory");
    return saved ? JSON.parse(saved) : [];
  });

  // Load transactions from localStorage (or start with empty array)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // State for editing/adding
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [addingTx, setAddingTx] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Inventory functions
  const saveItem = (updatedItem) => {
    setInventory(
      inventory.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
    setEditingItem(null);
  };

  const addItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setAddingItem(false);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((i) => i.id !== id));
  };

  // Transaction functions
  const saveTx = (updatedTx) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
    setEditingTx(null);
  };

  const addTx = (newTx) => {
    setTransactions([...transactions, { ...newTx, id: Date.now() }]);
    setAddingTx(false);
  };

  const deleteTx = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bowling Inventory</h1>

      {/* Inventory Section */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Inventory</h2>
      {editingItem ? (
        <EditInventoryForm
          currentItem={editingItem}
          onSave={saveItem}
          onCancel={() => setEditingItem(null)}
        />
      ) : addingItem ? (
        <AddInventoryForm
          onAdd={addItem}
          onCancel={() => setAddingItem(false)}
        />
      ) : (
        <>
          <button
            onClick={() => setAddingItem(true)}
            className="bg-green-600 text-white px-3 py-1 mb-2 rounded"
          >
            + Add Item
          </button>
          {inventory.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              onEdit={setEditingItem}
              onDelete={deleteItem}
            />
          ))}
        </>
      )}

      {/* Transactions Section */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Transactions</h2>
      {editingTx ? (
        <EditTransactionForm
          currentTx={editingTx}
          onSave={saveTx}
          onCancel={() => setEditingTx(null)}
        />
      ) : addingTx ? (
        <AddTransactionForm onAdd={addTx} onCancel={() => setAddingTx(false)} />
      ) : (
        <>
          <button
            onClick={() => setAddingTx(true)}
            className="bg-blue-600 text-white px-3 py-1 mb-2 rounded"
          >
            + Add Transaction
          </button>
          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              tx={tx}
              onEdit={setEditingTx}
              onDelete={deleteTx}
            />
          ))}
        </>
      )}
    </div>
  );
}
export default function App() {
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newAthlete, setNewAthlete] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [checkoutQty, setCheckoutQty] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const adminPassword = "admin123"; // change this to your own password

  // Load from localStorage
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    const savedAthletes = JSON.parse(localStorage.getItem("athletes")) || [];
    setInventory(savedInventory);
    setTransactions(savedTransactions);
    setAthletes(savedAthletes);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("athletes", JSON.stringify(athletes));
  }, [inventory, transactions, athletes]);

  // Admin login
  const handleAdminLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAdmin(true);
      setPasswordInput("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  // Add item
  const addItem = () => {
    if (!newItem || !newQty) return;
    const updated = [...inventory, { name: newItem, qty: parseInt(newQty) }];
    setInventory(updated);
    setNewItem("");
    setNewQty("");
  };

  // Delete item
  const deleteItem = (name) => {
    setInventory(inventory.filter((i) => i.name !== name));
  };

  // Adjust quantity
  const adjustQty = (name, change) => {
    setInventory(
      inventory.map((i) =>
        i.name === name ? { ...i, qty: i.qty + change } : i
      )
    );
  };

  // Checkout
  const checkoutItem = () => {
    if (!selectedAthlete) {
      alert("Please select your name first");
      return;
    }
    if (!selectedItem || !checkoutQty) return;
    const item = inventory.find((i) => i.name === selectedItem);
    if (!item || item.qty < checkoutQty) {
      alert("Not enough stock");
      return;
    }

    setInventory(
      inventory.map((i) =>
        i.name === selectedItem
          ? { ...i, qty: i.qty - parseInt(checkoutQty) }
          : i
      )
    );

    const log = {
      athlete: selectedAthlete,
      item: selectedItem,
      qty: checkoutQty,
      date: new Date().toLocaleString(),
    };
    setTransactions([log, ...transactions]);
    setCheckoutQty("");
    setSelectedItem("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">🎳 UAB Bowling Inventory 💚💛</h1>

      {/* Admin Mode Toggle */}
      {!isAdmin ? (
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={handleAdminLogin}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Switch to Admin
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout Admin
          </button>
        </div>
      )}

      {/* Inventory List */}
      <h2 className="text-xl font-semibold mb-2">📦 Inventory</h2>
      <ul className="mb-4">
        {inventory.map((item) => (
          <li key={item.name} className="mb-1">
            {item.name}: {item.qty}
            {isAdmin && (
              <>
                <button
                  onClick={() => adjustQty(item.name, 1)}
                  className="ml-2 bg-green-500 text-white px-2 rounded"
                >
                  +1
                </button>
                <button
                  onClick={() => adjustQty(item.name, -1)}
                  className="ml-1 bg-yellow-500 text-white px-2 rounded"
                >
                  -1
                </button>
                <button
                  onClick={() => deleteItem(item.name)}
                  className="ml-1 bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Admin Add Item */}
      {isAdmin && (
        <div className="mb-4">
          <h3 className="font-semibold">➕ Add New Item</h3>
          <input
            type="text"
            placeholder="Item name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Qty"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={addItem}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}

      {/* Admin Athlete Manager */}
      {isAdmin && (
        <div className="mb-4">
          <h3 className="font-semibold">👥 Manage Athletes</h3>
          <input
            type="text"
            placeholder="Athlete name"
            value={newAthlete}
            onChange={(e) => setNewAthlete(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={() => {
              if (!newAthlete) return;
              setAthletes([...athletes, newAthlete]);
              setNewAthlete("");
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
          <ul className="mt-2">
            {athletes.map((athlete) => (
              <li key={athlete} className="mb-1">
                {athlete}
                <button
                  onClick={() =>
                    setAthletes(athletes.filter((a) => a !== athlete))
                  }
                  className="ml-2 bg-red-500 text-white px-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Athlete Checkout */}
      {!isAdmin && (
        <div className="mb-4">
          <h3 className="font-semibold">🏅 Athlete Checkout</h3>
          <select
            value={selectedAthlete}
            onChange={(e) => setSelectedAthlete(e.target.value)}
            className="border px-2 py-1 mr-2"
          >
            <option value="">Select Your Name</option>
            {athletes.map((athlete) => (
              <option key={athlete} value={athlete}>
                {athlete}
              </option>
            ))}
          </select>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="border px-2 py-1 mr-2"
          >
            <option value="">Select Item</option>
            {inventory.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Qty"
            value={checkoutQty}
            onChange={(e) => setCheckoutQty(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={checkoutItem}
            className="bg-purple-600 text-white px-3 py-1 rounded"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Transaction Log */}
      <h2 className="text-xl font-semibold mb-2">📝 Transaction Log</h2>
      <ul>
        {isAdmin
          ? transactions.map((t, idx) => (
              <li key={idx}>
                {t.athlete} took {t.qty} × {t.item} — {t.date}
              </li>
            ))
          : transactions
              .filter((t) => t.athlete === selectedAthlete)
              .map((t, idx) => (
                <li key={idx}>
                  You checked out {t.qty} × {t.item} — {t.date}
                </li>
              ))}
      </ul>
    </div>
  );
}
