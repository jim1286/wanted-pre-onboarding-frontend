import { Navigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

export default function MainPage() {
  return (
    <>
      {localStorage.getItem("token") && <Navigate to="/todo" />}
      <Login />
      {/* <SignUp /> */}
    </>
  );
}
