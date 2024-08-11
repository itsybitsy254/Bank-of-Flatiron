import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionsTable from './components/TransactionsTable';
import TransactionForm from './components/TransactionForm';
import SearchBar from './components/SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://flatiron-bank-db.onrender.com/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTransaction = (newTransaction) => {
    fetch('https://flatiron-bank-db.onrender.com/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
    .then(response => response.json())
    .then(addedTransaction => {
      setTransactions([...transactions, addedTransaction]);
    });
  };

  const deleteTransaction = (id) => {
    fetch(`https://flatiron-bank-db.onrender.com/transactions/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bank Of Flatiron</h1>
      </header>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionsTable 
        transactions={filteredTransactions} 
        deleteTransaction={deleteTransaction} 
      />
    </div>
  );
}

export default App;
