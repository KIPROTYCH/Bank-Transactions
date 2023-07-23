import React, { useState, useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    // Replace the fetch call with setting the sample data directly
    const sampleData = {
      transactions: [
        {
          id: 1,
          date: "2019-12-01",
          description: "Paycheck from Bob's Burgers",
          category: "Income",
          amount: 1000,
        },
        {
          id: 2,
          date: "2019-12-01",
          description: "South by Southwest Quinoa Bowl at Fresh & Co",
          category: "Food",
          amount: -10.55,
        },
        {
          id: 3,
          date: "2019-12-02",
          description: "South by Southwest Quinoa Bowl at Fresh & Co",
          category: "Food",
          amount: -10.55,
        },
        {
          id: 4,
          date: "2019-12-04",
          description: "Sunglasses, Urban Outfitters",
          category: "Fashion",
          amount: -24.99,
        },
        {
          id: 5,
          date: "2019-12-06",
          description: "Venmo, Alice Pays you for Burrito",
          category: "Food",
          amount: 8.75,
        },
        {
          id: 6,
          date: "2019-12-06",
          description: "Chipotle",
          category: "Food",
          amount: -17.59,
        },
        {
          id: 7,
          date: "2019-12-07",
          description: "Birthday Check from Grandma",
          category: "Gift",
          amount: 50,
        },
        {
          id: 8,
          date: "2019-12-09",
          description: "Lyft Ride",
          category: "Transportation",
          amount: -13.25,
        },
        {
          id: 9,
          date: "2019-12-11",
          description: "Paycheck from Bob's Burgers",
          category: "Income",
          amount: 1000,
        },
        {
          id: 10,
          date: "2019-12-16",
          description: "Tickets, Flatiron Multiplex Cinemas",
          category: "Entertainment",
          amount: -24,
        },
        {
          id: 11,
          date: "2019-12-16",
          description: "MTA Vending Machine: MetroCard",
          category: "Transportation",
          amount: -116.39,
        },
        {
          id: 12,
          date: "2019-12-17",
          description: "Venmo, Pay Roommate for Rent",
          category: "Housing",
          amount: -975,
        },
        {
          date: "2022-07-09",
          description: "Office lunch",
          category: "Food",
          amount: "2000",
          id: 13,
        },
        {
          date: "2022-07-09",
          description: "Office lunch Wednesday",
          category: "Food",
          amount: "3000",
          id: 14,
        },
      ],
    };
    setTransactions(sampleData.transactions);
  }, []);

  const addTransaction = (newTransaction) => {
    const newTransactionWithId = {
      ...newTransaction,
      id:
        transactions.length > 0
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1,
    };

    setTransactions([...transactions, newTransactionWithId]);
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
