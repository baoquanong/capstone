import React, { useContext, useState } from "react";
import ExpenseCard from "../Components/ExpenseCard";
import { DataContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { motion } from "framer-motion";

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getExpenses = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("successfully fetched expenses");
        setExpenses(data);
      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("client error:", error);
    }
  };

  useEffect(() => {
    getExpenses(id);
  }, []);

  const handleAddExpense = () => {
    navigate(`/expenses/${id}/add`);
  };

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
        const filtered = expenses.filter((exp) => exp.id !== data.id);

        setExpenses(filtered);
        navigate(`/expenses/${id}`);
      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("client error:", "delete expense error");
    }
  };

  const mappedExpenses = expenses.map((expense, index) => {
    if (!expense) {
      console.log("error : there are no expenditure");
    } else {
      return (
        <ExpenseCard
          key={index}
          expense={expense}
          handleDelete={handleDelete}
        />
      );
      //console.log(expense)
    }
  });

  return (
    <div className="container-fluid d-flex w-100 h-100">
      <img className="gif w-40 h-20" src="../images/shopping.gif" />
      <div className="container-fluid w-50 p-2 mx-5 ">
        <br />
        {expenses.length !== 0 ? (
          mappedExpenses
        ) : (
          <motion.p className="text-danger d-flex align-items-center justify-content-center"
          initial={{opacity: 0}}
          animate={{opacity: 1, scale: 1.5}}
          transition={{duration: 1.5, type: "tween"}}
          >
            There are no transactions record
          </motion.p>
        )}

        <div className="w-100 p-4 d-flex align-items-center justify-content-center">
          <Button onClick={handleAddExpense} variant="dark">
            Add Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
