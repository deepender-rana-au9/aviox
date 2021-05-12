import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import TableRow from "./TableRows";
import NewTransection from "./NewTransection";
import { v4 } from "uuid";

const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];

const List = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false, window.location.reload());
  const newArr = data.slice().reverse();
  console.log(newArr);

  const resetHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>
              <b>Office Transactions</b>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <button
                style={{
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={onOpenModal}
              >
                + Add Transaction
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Date </th>
            <td>Description </td>
            <td>Credit</td>
            <td>Debit</td>
            <td>Running Balance</td>
          </tr>
          <TableRow />

          {newArr.map((item) => {
            const id = v4();
            return (
              <tr key={id}>
                <td key="date">{item.date}</td>
                <td key="des">{item.descciption}</td>
                <td key="Credit">
                  {item.type === "Credit" ? item.amount : "-"}
                </td>
                <td key="Debit">{item.type === "Debit" ? item.amount : "-"}</td>
                <td key="total">{item.total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal open={open} onClose={onCloseModal} center>
        <NewTransection />
      </Modal>
      <br />
      <Button onClick={resetHandler}>Reset</Button>
    </div>
  );
};

export default List;
