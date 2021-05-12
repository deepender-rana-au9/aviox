import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

export default function NewTransection() {
  const allTransections = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  const [type, setType] = useState("Credit");
  const [amount, setAmount] = useState(0);
  const [descciption, setDescription] = useState("-");
  const [total, setTotal] = useState(
    allTransections.length !== 0
      ? parseFloat(allTransections[allTransections.length - 1].total)
      : 0
  );
  const [transactions, setTransection] = useState(allTransections);
  let today = new Date();

  let date =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

  const saveHandler = () => {
    console.log(type, amount, descciption);
    if (amount === 0) {
      return alert("Type valid amount");
    }

    if (isNaN(amount)) {
      return alert("Please type a valid number");
    }

    // if (type === "Credit") {
    //   setTotal(total + parseFloat(amount));
    // }
    type === "Credit"
      ? setTotal(total + parseFloat(amount), () => console.log(amount))
      : setTotal(total - parseFloat(amount), () => console.log(amount));

    window.location.reload();
  };

  useEffect(() => {
    // console.log(parseFloat(allTransections[allTransections.length - 1].amount));
    const transaction = { type, amount, descciption, date, total };
    if (
      transaction.type === "Debit" &&
      transactions[transactions.length - 1].total - transaction.amount < 0
    ) {
      console.log(amount, total);
      return alert("Running balance is less");
    }
    console.log(transaction);
    amount !== 0 && setTransection([...transactions, transaction]);
  }, [total]);

  useEffect(() => {
    console.log(transactions);
    localStorage.setItem("data", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div>
      <p style={{ fontSize: "20px", minWidth: "80vh" }}>New Transaction</p>
      <div>
        <label htmlFor="transaction" style={{ minWidth: "20vh" }}>
          Transaction Type :
        </label>
        <select
          name="transaction"
          id="transaction"
          style={{
            padding: "5px",
            margin: "10px",
            border: "none",
            width: "65vh",
            borderBottom: "1px solid gray",
          }}
          onClick={(e) => setType(e.target.value)}
        >
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="amount"
          style={{ display: "inline-block", minWidth: "20vh" }}
        >
          Amount :
        </label>
        <input
          type="text"
          id="amount"
          style={{
            minWidth: "65vh",
            border: "none",
            borderBottom: "1px solid gray",
          }}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          style={{
            display: "inline-block",
            minWidth: "20vh",
          }}
        >
          Description :
        </label>
        <textarea
          id="textarea"
          name="textarea"
          rows="3"
          cols="60"
          style={{
            margin: "10px",
            minWidth: "65vh",
            border: "none",
            borderBottom: "1px solid gray",
          }}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div style={{ float: "right" }}>
        <Button color="primary" onClick={saveHandler}>
          Save
        </Button>
        <Button onClick={() => window.location.reload()}>Cancel</Button>
      </div>
    </div>
  );
}
