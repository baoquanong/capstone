import Button from 'react-bootstrap/Button';
import React, { useContext } from "react";

import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

import { DataContext } from "../App";
import { useNavigate } from 'react-router-dom';


function AccountCard({ account }) {
  //const { globalState, setGlobalState } = useContext(DataContext);
  const navigate = useNavigate();
  
  const handleExpenses = () => {
    navigate("/expenses")
  }

  function CustomToggle({ children, eventKey }) {
    return (
      <Button
        variant="dark"
        onClick={() => {
          handleExpenses();
        }}
      >
        {children}
      </Button>
    );
  }




  return (
    <div>
      <Accordion flush className="w-80 p-1 align-items-center justify-content-center" >
        <Accordion.Item eventKey="0">
          <Accordion.Header>{account?.name}</Accordion.Header>
          <Accordion.Body>
            <p>
            Account Balance: S${account?.balance}
            </p>
            <p>
            Account Use: {account?.description}
            </p>
            <CustomToggle  eventKey="0" >View Transactions</CustomToggle>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AccountCard;

