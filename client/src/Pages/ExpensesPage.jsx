import React from 'react'
import { useContext } from 'react';
import ExpenseCard from '../Components/ExpenseCard'
import { DataContext } from "../App";

function ExpensesPage() {
  const { globalState, setGlobalState } = useContext(DataContext);

  const allAccounts = () => {
    console.log(globalState.allAccounts)
  }
 allAccounts();

  return (
    <div className="container d-flex p-1 col- ">
      <ExpenseCard/>
      <ExpenseCard/>
      <ExpenseCard/>
      <ExpenseCard/>
      </div>
  )
}

export default ExpensesPage