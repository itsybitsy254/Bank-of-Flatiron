import React, { useState } from 'react';

function TransactionsTable({ transactions, deleteTransaction }) {
  const [sortCriteria, setSortCriteria] = useState('date');

  const sortTransactions = (transactions, criteria) => {
    return [...transactions].sort((a, b) => {
      if (criteria === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (criteria === 'description') {
        return a.description.localeCompare(b.description);
      } else if (criteria === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  };

  const sortedTransactions = sortTransactions(transactions, sortCriteria);

  return (
    <div>
      <div className="sort-controls">
        <button onClick={() => setSortCriteria('date')}>Sort by Date</button>
        <button onClick={() => setSortCriteria('description')}>Sort by Description</button>
        <button onClick={() => setSortCriteria('category')}>Sort by Category</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button
                  className="delete-button"  // Assign a class name here
                  onClick={() => deleteTransaction(transaction.id)}
                >
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

export default TransactionsTable;
