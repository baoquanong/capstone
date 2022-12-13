import React from 'react'
import { useContext, use } from 'react';
import ExpenseCard from '../Components/ExpenseCard'
import { DataContext } from "../App";
import { useNavigate, useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function ExpensesPage() {
  const { globalState, setGlobalState } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();


  const handleAddExpense = () => {
    navigate(`/expenses/${id}/add`)
  }
  

    const filteredAccts = globalState.allAccounts.find((account) => account.id === id);  
    console.log(filteredAccts);
    const mappedExpenses = filteredAccts?.Expense?.map((expense, index) => {
      if (!expense)  {
        console.log("error : there are no expenditure")
      } else {
        return <ExpenseCard key={index} expense={expense}/>
      //console.log(expense)
    }
  });




  return (
    <div className="container p-1 col- ">
      {mappedExpenses}
      <div className="w-100 p-3 d-flex align-items-center justify-content-center">
      <Button onClick={handleAddExpense} variant="dark" >Add</Button>
      </div>
      </div>
  )
}

export default ExpensesPage