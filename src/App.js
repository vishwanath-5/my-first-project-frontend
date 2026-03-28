import React, { useState } from "react";
import TaskList from "./components/TaskList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className="minh-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Smart Task Manager
        </h1>
      {isAuth ? (
        <TaskList setAuth={setIsAuth} />
      ) : isSignup ? (
        <Signup setAuth={setIsAuth}/>
      ):(
        <Login setAuth={setIsAuth} />
      )}
      {!isAuth &&(
        <button  className="bg-blue-500 py-3 px-4 my-1 py-2 text-white rounded" onClick={()=> setIsSignup(!isSignup)}>
          {isSignup ? "Go to Login" : "Create Account"}
        </button>
      )}
      </div>
    </div>
  );
}
export default App;
