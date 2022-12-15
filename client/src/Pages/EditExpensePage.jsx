import React from "react";
import { useContext, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { DataContext } from "../App";
import { useNavigate, useParams,  } from 'react-router-dom';
import { useState } from "react";

function EditExpensePage() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [ oneExpense, setOneExpense ] = useState([])

    const getOneExpense = async (id) => {
        try {
          const response = await fetch(`/api/expenses/one/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: JSON.parse(localStorage.getItem("token")),
            },
          });
    
          const data = await response.json();
    
          if (response.ok) {
            console.log("successfully fetched expenses");
            setOneExpense(data);
          } else {
            console.log("error:", data.error);
          }
        } catch (error) {
          console.log("client error:", error);
        }
      };
    
      useEffect(() => {
        getOneExpense(id);
      }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        let updateExpense =  Object.fromEntries(new FormData(event.target));
            updateExpense = {
                ...updateExpense,
                amount: parseFloat(updateExpense.amount),
            }
        console.log(updateExpense);

        try {
            const response = await fetch(`/api/expenses/edit/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  token: JSON.parse(localStorage.getItem("token")),
                },
                body: JSON.stringify(updateExpense),
              });

              const data = await response.json(); 

              if (response.ok) {
                console.log("successfully fetched oneExpense");
                const id = data.accountId
                // setOneExpense(data)
                navigate(`/expenses/${id}`);
              } else {
                console.log("error:", data.error);
              }
        } catch (error) {
            console.log("client error:", error);
        }
    }





  return (
    <div className="container-fluid d-flex flex-column min-vh-100 align-items-center justify-content-center">
      <h5 className="pb-3">
      Edit Transaction
      </h5>
      <form
        className="d-flex flex-column align-items-end"
        autoComplete="off"
        onSubmit={handleUpdate}
      >
        <label className=" mb-3 d-flex gap-2 ">
          Transaction Name
          <input  type="text" name="name" required defaultValue={oneExpense.name} />
        </label>
        <label className=" mb-3 d-flex gap-2 align-items-baseline">
          Description
          <textarea
            className="form-control"
            rows="3"
            cols="20"
            name="description"
            required
            defaultValue={oneExpense.description}

          />
        </label>
        <label className=" mb-3 d-flex gap-2 ">
          Transaction Amount
          <input
            type="number"
            name="amount"
            required
            defaultValue={oneExpense.amount}
    
          />
        </label>
        <button  className="btn btn-dark">Update</button>
      </form>
      {/* <button className="btn btn-dark">Back</button> */}
    </div>
  )
}

export default EditExpensePage


//onClick={()=>handleUpdate(id)}