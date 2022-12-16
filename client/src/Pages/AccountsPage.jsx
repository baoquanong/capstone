import Button from "react-bootstrap/Button";
import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DataContext } from "../App";
import AccountCard from "../Components/AccountCard";
import { useNavigate } from "react-router-dom";
import ChartPie from "../Components/ChartPie";

function AccountsPage() {
  const { globalState, setGlobalState } = useContext(DataContext);

  const navigate = useNavigate();

  const getAllAccounts = async () => {
    try {
      const response = await fetch("/api/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
      });

      const data = await response.json();
      //console.log("response", data);
      if (response.ok) {
        //console.log("your accounts", data);
        setGlobalState({ ...globalState, allAccounts: data });
      } else {
        //console.log("error:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.log("client error:", "get all accounts error");
    }
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  console.log("state", globalState);

  const mappedAccounts = globalState.allAccounts.map((account, index) => {
    return <AccountCard key={index} account={account} />;
  });

  const handleAddAccount = () => {
    navigate("/addaccount");
  };

  return (
    <div className="account-page">
      {<ChartPie />}
      {mappedAccounts}
      <br />
      <div className="w-100 p-3 d-flex align-items-center justify-content-center">
        <Button variant="dark" onClick={handleAddAccount}>
          Add Account
        </Button>
      </div>
    </div>
  );
}

export default AccountsPage;
