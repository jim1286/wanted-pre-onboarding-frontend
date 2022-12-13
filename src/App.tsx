import MainPage from "./pages/main/MainPage";
import TodoPage from "./pages/todo/TodoPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default App;
