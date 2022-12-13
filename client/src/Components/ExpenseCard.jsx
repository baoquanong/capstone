import React from 'react'
import Card from "react-bootstrap/Card";
import { useNavigate, useParams,  } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ExpenseCard({ expense }) {




  return (
    <div className="">
        <Card > 
            <Card.Body>
            <Card.Title>{expense?.name}</Card.Title>
            <Card.Text>
              Account Balance: S${expense?.amount}
              <br/>
              Description: {expense?.description}
            </Card.Text>
            <div className="d-flex gap-2">
            <Button variant="dark" >Edit</Button>
            <Button variant="dark" >Delete</Button>
            </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ExpenseCard;