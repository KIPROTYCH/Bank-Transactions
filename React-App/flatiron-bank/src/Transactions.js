import React, { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortType === "category") {
      return a.category.localeCompare(b.category);
    } else if (sortType === "description") {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={() => setSortType("category")}>Sort by Category</button>
      <button onClick={() => setSortType("description")}>
        Sort by Description
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const description = e.target.description.value;
          const category = e.target.category.value;
          const amount = parseFloat(e.target.amount.value);

          const newTransaction = {
            id: transactions.length + 1,
            date: new Date().toISOString().split("T")[0],
            description: description,
            category: category,
            amount: amount,
          };

          addTransaction(newTransaction);
          e.target.reset();
        }}
      >
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" required />

        <label htmlFor="category">Category:</label>
        <input type="text" id="category" required />

        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" required />

        <button type="submit">Add Transaction</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
