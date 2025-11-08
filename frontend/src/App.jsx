import { useState } from "react";
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
import Dashboard from "./pages/Dashboard";
import ProblemPage from "./pages/ProblemPage";

function App() {
  const [count, setCount] = useState(0);
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<Problem />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
