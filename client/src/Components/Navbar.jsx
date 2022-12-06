import React from "react";
import { NavLink } from "react-router-dom";
import {House, Person, List} from "react-bootstrap-icons";

function Navbar() {
  return (
    <div>
      <House />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <Person />
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/flow">Flow</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/accounts">Accounts</NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <List />

    </div>
  );
}

export default Navbar;
