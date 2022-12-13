import { Navigate } from "react-router-dom";
import Login from "./Login";

export default function MainPage() {
  return (
    <>
      {localStorage.getItem("token") && <Navigate to="/todo" />}
      <Login />
    </>
  );
}
