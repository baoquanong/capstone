import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { House, Person, List } from "react-bootstrap-icons";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }
  const handleToAccounts = () => {
    navigate("/accounts")
  }


  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark ">
        <div className="container-fluid align-items-center justify-content-between ">
          <NavLink className="navbar-brand" to="/">FundsFlow</NavLink>
          {/* <NavLink to="/login">Login</NavLink> */}
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
          {/* <NavLink to="/flow">Flow</NavLink> */}
          {/* <NavLink to="/dashboard">Dashboard</NavLink> */}
          <div className="d-flex align-items-end">
          <p className="nav-link text-white pt-3" onClick={()=>handleToAccounts()}>Accounts</p>
          <p className="mx-5 text-white pt-3" onClick={()=>handleLogout()}>Logout</p>
          </div>
          {/* <NavLink to="/transactions">Transactions</NavLink> */}
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
