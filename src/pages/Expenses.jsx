import { useState } from "react";
import { members } from "../data/members";
import ExpenseForm from "../components/ExpenseForm";
import { Trash2 } from "lucide-react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const perPerson =
    members.length > 0 ? totalSpent / members.length : 0;

  const addExpense = (newExpense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      newExpense,
    ]);
  };

  const deleteExpense = (expenseId) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== expenseId
      )
    );
  };

  const getMemberName = (memberId) => {
    const member = members.find(
      (member) => member.id === Number(memberId)
    );

    return member ? member.name : "Unknown";
  };

  return (
    <section className="expenses-section" id="expenses">

      {/* HEADER */}
      <div className="expenses-header">
        <span>TRIP FINANCES</span>

        <h2>Shared Expenses</h2>

        <p>Banaras • 11 Travellers</p>
      </div>


      {/* SUMMARY */}
      <div className="expense-summary">

        <div className="summary-card">
          <span>TOTAL SPENT</span>

          <strong>
            ₹{totalSpent.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="summary-card">
          <span>PER PERSON</span>

          <strong>
            ₹{Math.round(perPerson).toLocaleString("en-IN")}
          </strong>
        </div>

      </div>


      {/* ADD EXPENSE */}
      <div className="expense-form-wrapper">

        <h3>ADD EXPENSE</h3>

        <ExpenseForm onAddExpense={addExpense} />

      </div>


      {/* EXPENSE HISTORY */}
      <div className="expense-history">

        <div className="expense-history-header">
          <h3>EXPENSE HISTORY</h3>

          <span>
            {expenses.length}{" "}
            {expenses.length === 1
              ? "expense"
              : "expenses"}
          </span>
        </div>


        {expenses.length === 0 ? (

          <div className="empty-expenses">
            <p>No expenses added yet.</p>

            <span>
              Add your first trip expense above.
            </span>
          </div>

        ) : (

          <div className="expense-list">

            {expenses.map((expense) => (

              <div
                className="expense-item"
                key={expense.id}
              >

                <div className="expense-main">

                  <div className="expense-category">
                    {expense.category}
                  </div>

                  <div className="expense-info">

                    <h4>
                      {expense.description}
                    </h4>

                    <p>
                      Paid by{" "}
                      <strong>
                        {getMemberName(expense.paidBy)}
                      </strong>
                    </p>

                  </div>

                </div>


                <div className="expense-right">

                  <strong className="expense-amount">
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </strong>

                  <button
                    className="delete-expense"
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                    title="Delete expense"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* TRAVELLERS */}
      <div className="members-section">

        <h3>TRAVELLERS</h3>

        <div className="members-grid">

          {members.map((member) => (

            <div
              className="member-card"
              key={member.id}
            >
              {member.name}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Expenses;