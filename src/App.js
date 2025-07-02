import React, { useState } from 'react';

function App() {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();
    const principal = parseFloat(loan);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const numPayments = parseInt(term) * 12;

    if (isNaN(principal) || isNaN(monthlyRate) || isNaN(numPayments)) return;

    const payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

    setMonthlyPayment(payment);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={calculatePayment}>
        <div>
          <label>Loan Amount: </label>
          <input
            type="number"
            value={loan}
            onChange={(e) => setLoan(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Interest Rate (%): </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Loan Term (Years): </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>

      {monthlyPayment !== null && (
        <div style={{ marginTop: '20px' }}>
          <h2>Monthly Payment:</h2>
          <p>${monthlyPayment.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;