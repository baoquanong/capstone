import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams,  } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { DataContext } from "../App";


function ExpenseCard({ expense }) {


  const handleDelete = async (expId) => {
    try {
      const response = await fetch(`/api/expenses/delete/${expId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
        body: null,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("delete successfully");
        // const acctId = data.accountId
        // const filterAccount = globalState?.allAccounts?.filter((acct)=> acct.id === acctId)
        // const filteredExpenses = filterAccount.Expense.filter((exp)=> exp.id !== data.id)
        // filterAccount.Expense = filteredExpenses;
        // const filteredAccounts = globalState?.allAccounts?.filter((acct)=> acct.id !== acctId)
        // const filtered = filteredAccounts.push(filterAccount)
        // setGlobalState({...globalState, 
        //     allAccounts: filtered});

      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("client error:", "delete expense error");
    }
  };

  return (
    <div className="">
        <Card > 
            <Card.Body>
            <Card.Title>{expense?.name}</Card.Title>
            <Card.Text>
              Account Balance: S${expense?.amount}
              <br/>
              Description: {expense?.description}
            </Card.Text>
            <div className="d-flex gap-2">
            <Button variant="dark" >Edit</Button>
            <Button onClick={()=>handleDelete(expense?.id)} variant="dark" >Delete</Button>
            </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ExpenseCard;