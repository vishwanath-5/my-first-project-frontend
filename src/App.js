import React, { useState } from "react";
import TaskList from "./components/TaskList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {" "}
      {isAuth ? (
        <TaskList setAuth={setIsAuth} />
      ) : isSignup ? (
        <Signup setAuth={setIsAuth}/>
      ):(
        <Login setAuth={setIsAuth} />
      )}
      {!isAuth &&(
        <button onClick={()=> setIsSignup(!isSignup)}>
          {isSignup ? "Go to Login" : "Create Account"}
        </button>
      )}
    </div>
  );
}
export default App;
