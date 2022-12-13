import React from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddAccountPage() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleAccount = async (data) => {
    const addAccount = {
      name: data.name,
      description: data.description,
      balance: parseFloat(data.balance),
      userId: JSON.parse(localStorage.getItem("currUser")).id,
    };
    console.log("form sent", addAccount);

    try {
      const response = await fetch("/api/accounts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify(addAccount),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("success");
        navigate("/accounts");
      } else {
        console.log("error:", data.error);
      }
    } catch (error) {
      console.log("client error:", "add button error");
    }
  };

  const handleBack = () => {
    navigate("/accounts");
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 align-items-center justify-content-center">
      AddAccountPage
      <form
        className="d-flex flex-column align-items-end"
        autoComplete="off"
        onSubmit={handleSubmit(handleAccount)}
      >
        <label className=" mb-3 d-flex gap-2 ">
          Account Name
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
          Account Balance
          <input
            type="number"
            name="balance"
            required
            {...register("balance")}
          />
        </label>
        <button className="btn btn-dark">Add</button>
      </form>
      <button onClick={handleBack} className="btn btn-dark">
        Back
      </button>
    </div>
  );
}

export default AddAccountPage;
