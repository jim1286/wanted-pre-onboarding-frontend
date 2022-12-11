import { Navigate } from "react-router-dom";
import Todo from "./Todo";

export default function TodoPage() {
  return (
    <>
      {!localStorage.getItem("token") && <Navigate to="/" />}
      <Todo />
    </>
  );
}
