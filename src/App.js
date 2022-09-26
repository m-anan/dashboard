import React, { useContext } from "react";
import Dashboard from "./dashboard/Dashboard";
import AuthContext from "./Store/auth-context";
import Login from "./components/Login/Login";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <main>
      {!ctx.isLoggedIn && <Login />}
      {ctx.isLoggedIn && <Dashboard></Dashboard>}
      
    </main>
  );
}

export default App;
