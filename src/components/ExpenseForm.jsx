import { useState } from "react";
import { members } from "../data/members";

function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!amount || !paidBy || !description) {
      alert("Please fill all required fields.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      paidBy: Number(paidBy),
      category,
      description,
      date: new Date().toISOString(),
    };

    onAddExpense(newExpense);

    setAmount("");
    setPaidBy("");
    setCategory("Food");
    setDescription("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>AMOUNT</label>

        <input
          type="number"
          min="1"
          placeholder="₹ 0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>PAID BY</label>

        <select
          value={paidBy}
          onChange={(event) => setPaidBy(event.target.value)}
        >
          <option value="">Select member</option>

          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>CATEGORY</label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Hotel">Hotel</option>
          <option value="Transport">Transport</option>
          <option value="Tickets">Tickets</option>
          <option value="Shopping">Shopping</option>
          <option value="Boat">Boat</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>DESCRIPTION</label>

        <input
          type="text"
          placeholder="e.g. Dinner at Dashashwamedh"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <button type="submit" className="add-expense-button">
        + ADD EXPENSE
      </button>
    </form>
  );
}

export default ExpenseForm;