import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { DataContext } from "../App";
import { motion } from "framer-motion";




function ExpenseCard({ expense, handleDelete }) {
  const navigate = useNavigate();


  const handleEditExpense = (id) => {
    navigate(`/expenses/${id}/edit`);
  };


  return (
    <motion.div className="">
      <Card>
        <Card.Body>
          <Card.Title>{expense?.name}</Card.Title>
          <Card.Text>
            Amount : S${expense?.amount}
            <br />
            Description: {expense?.description}
          </Card.Text>
          <div className="d-flex gap-2">
            <Button onClick={() => handleEditExpense(expense?.id)} variant="dark">Edit</Button>
            <Button onClick={() => handleDelete(expense?.id)} variant="dark">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default ExpenseCard;
