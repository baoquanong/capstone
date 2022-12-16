import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import * as Icon from 'react-bootstrap-icons';
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AccountsPage from "./Pages/AccountsPage";
import ExpensesPage from "./Pages/ExpensesPage";
import Navbar from "./Components/Navbar";
import FlowPage from "./Pages/FlowPage";
import AddAccountPage from "./Pages/AddAccountPage";
import AddExpensePage from "./Pages/AddExpensePage";
import EditExpensePage from "./Pages/EditExpensePage";

export const DataContext = createContext();

function App() {
  const [globalState, setGlobalState] = useState({
    allAccounts: [], // array containing all accounts
  });

  return (
    <div>
      <DataContext.Provider value={{ globalState, setGlobalState }}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/flow" element={<FlowPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navbar />}>
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/expenses/:id" element={<ExpensesPage />} />
            </Route>
            <Route path="/addaccount" element={<AddAccountPage />} />
            <Route path="/expenses/:id/add" element={<AddExpensePage />} />
            <Route path="/expenses/:id/edit" element={<EditExpensePage />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;
