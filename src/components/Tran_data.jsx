import React, { useEffect, useState } from "react";
import axios from "axios";

function AccountsTable() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken"); // Replace with your authentication token if required

  const API_ENDPOINT = "http://localhost:8000/home/accounts/"; // Replace with your endpoint

  // Fetch accounts and transactions from the API
  useEffect(() => {
    const fetchAccountsData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
        console.log("Accounts Data:", response.data);
      } catch (error) {
        console.error("Error fetching accounts data:", error.response?.data || error.message);
        setError("Failed to load accounts. Please try again.");
      }
    };

    fetchAccountsData();
  }, [token]);

  return (
    <div>
      <h2>Accounts and Transactions</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Account ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Account Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Balance</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Transactions (From)</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Transactions (To)</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{account.id}</td>
              <td style={{ padding: "8px" }}>{account.account_type}</td>
              <td style={{ padding: "8px" }}>{account.balance}</td>

              {/* Transactions From */}
              <td style={{ padding: "8px" }}>
                {account.transactions_from && account.transactions_from.length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Transaction ID
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Transaction Type
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          To Account
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Amount
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Status
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {account.transactions_from.map((transaction) => (
                        <tr key={transaction.transaction_id}>
                          <td style={{ padding: "4px" }}>{transaction.transaction_id}</td>
                          <td style={{ padding: "4px" }}>{transaction.transaction_type}</td>
                          <td style={{ padding: "4px" }}>{transaction.account_to}</td>
                          <td style={{ padding: "4px" }}>{transaction.amount}</td>
                          <td style={{ padding: "4px" }}>{transaction.status}</td>
                          <td style={{ padding: "4px" }}>
                            {new Date(transaction.transaction_date).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No transactions from this account</p>
                )}
              </td>

              {/* Transactions To */}
              <td style={{ padding: "8px" }}>
                {account.transactions_to && account.transactions_to.length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Transaction ID
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Transaction Type
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          From Account
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Amount
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Status
                        </th>
                        <th style={{ border: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {account.transactions_to.map((transaction) => (
                        <tr key={transaction.transaction_id}>
                          <td style={{ padding: "4px" }}>{transaction.transaction_id}</td>
                          <td style={{ padding: "4px" }}>{transaction.transaction_type}</td>
                          <td style={{ padding: "4px" }}>{transaction.account_from}</td>
                          <td style={{ padding: "4px" }}>{transaction.amount}</td>
                          <td style={{ padding: "4px" }}>{transaction.status}</td>
                          <td style={{ padding: "4px" }}>
                            {new Date(transaction.transaction_date).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No transactions to this account</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountsTable;
