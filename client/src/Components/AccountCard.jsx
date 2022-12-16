import Button from "react-bootstrap/Button";
import React, { useContext } from "react";

import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

import { DataContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

function AccountCard({ account }) {
  //const { globalState, setGlobalState } = useContext(DataContext);
  const navigate = useNavigate();
  const acctId = account.id;
  console.log("accounttttt", acctId);

  const handleViewTransactions = (id) => {
    navigate(`/expenses/${id}`);
  };

  function CustomToggle({ children, eventKey }) {
    return (
      <Button
        variant="dark"
        onClick={() => {
          handleViewTransactions(acctId);
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <div className="container d-flex align-items-center justify-content-center">
      <Accordion
        flush
        className="w-50 p-1 align-items-center justify-content-between"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="font-weight-bold">
            {account?.name}
          </Accordion.Header>
          <Accordion.Body>
            <h6>Account Balance: S${account?.balance}</h6>
            <p className="text-muted">Account Use: {account?.description}</p>
            <CustomToggle>View Transactions</CustomToggle>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AccountCard;
