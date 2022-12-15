import React from "react";
import { useContext } from 'react';
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { DataContext } from "../App";
import { useNavigate, useParams,  } from 'react-router-dom';

function AddExpensePage() {
  const { register, handleSubmit } = useForm();
  const { globalState, setGlobalState } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleExpense = async (data) => {
    const addExpense = {
      name: data.name,
      description: data.description,
      amount: parseFloat(data.amount),
      userId: JSON.parse(localStorage.getItem("currUser")).id,
      accountId: id,
    };
    console.log("form sent", addExpense);

    try {
      const response = await fetch("/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(addExpense),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("success");

        const filtered = globalState?.allAccounts?.filter((acct)=> acct.id !== data.account.id)
        filtered.push(data.account);
        setGlobalState({...globalState, allAccounts: filtered});
        navigate(`/expenses/${id}`);
      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("client error:", "add expense error");
    }
  };

  const handleBack = () => {
    navigate("/accounts");
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 align-items-center justify-content-center">
      <h5 className="pb-3">
      Add Transaction
      </h5>
      <form
        className="d-flex flex-column align-items-end"
        autoComplete="off"
        onSubmit={handleSubmit(handleExpense)}
      >
        <label className=" mb-3 d-flex gap-2 ">
          Transaction Name
          <input type="text" name="name" required {...register("name")} />
        </label>
        <label className=" mb-3 d-flex gap-2 align-items-baseline">
          Description
          <textarea
            className="form-control"
            rows="3"
            cols="20"
            name="description"
            required
            {...register("description")}
          />
        </label>
        <label className=" mb-3 d-flex gap-2 ">
          Transaction Amount
          <input
            type="number"
            name="amount"
            required
            {...register("amount")}
          />
        </label>
        <button className="btn btn-dark">Add</button>
      </form>
      {/* <button className="btn btn-dark">Back</button> */}
    </div>
  );
}

export default AddExpensePage;
