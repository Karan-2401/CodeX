import { useState } from "react";
import "./App.css";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Problem from "./pages/Problem";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);
  const {isSignedIn} = useUser()
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
       <Route path="/problem" element={<Problem/>}/>
    </Routes>
      <Toaster/>
    </>
  );
}

export default App;
