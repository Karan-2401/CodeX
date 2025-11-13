import { useState } from "react";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Problem from "./pages/Problem";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProblemPage from "./pages/ProblemPage";
import {SessionPage} from "./pages/SessionPage";
import { LoaderIcon } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);
  const { isSignedIn } = useUser();
  console.log(isSignedIn);
  if (isSignedIn === undefined) {
    return (
      <div>
        <div className="flex items-center justify-center py-20 h-screen">
          <LoaderIcon className="size-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> :  <Navigate to={"/dashboard"} />} />
        <Route
          path="/problems"
          element={isSignedIn ? <Problem /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : <Navigate to={"/"} />}
        />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
