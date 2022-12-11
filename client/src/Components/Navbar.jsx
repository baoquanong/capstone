import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { House, Person, List } from "react-bootstrap-icons";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/dashboard">FundsFlow</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/flow">Flow</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/accounts">Accounts</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          {/* <House /> */}
          {/* <Person /> */}
          {/* <List /> */}
        </div>
      </nav>
    <Outlet/>
    </div>
  );
}

export default Navbar;
