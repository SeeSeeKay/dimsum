import React, { useState } from 'react';
import './MortgageCalculator.css';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = (principal, rate, years) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    return (
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);
    const payment = calculateMonthlyPayment(principal, rate, years);
    setMonthlyPayment(payment.toFixed(2));
  };

  const reset = (event) => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
  }

  return (
    <div className="calculator-container">
      <h2>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Loan Amount:
            <input
              type="number"
              min={0.01}
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Interest Rate (%):
            <input
              type="number"
              step="0.01"
              min={0.01}
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Loan Term (years):
            <input
              type="number"
              min={0.1}
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <button type="submit">Calculate</button>
        </div>
        <div className="form-group">
        <button className="resetBtn" onClick={reset}>Reset</button>
        </div>
      </form>
      {monthlyPayment !== null && (
        <div className="result">
          <h3>Monthly Payment: ${monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;