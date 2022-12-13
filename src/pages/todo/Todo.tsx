import { useState } from "react";
import styled from "styled-components";
import EditTodo from "./EditTodo";
import { todoType } from "./TodoPage";
import { del } from "../../components/todoAgent";

interface todoProp {
  todoList: todoType;
}
export default function Todo(props: todoProp) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const onClick = () => {
    del("https://pre-onboarding-selection-task.shop/todos/", props.todoList.id);
  };
  return (
    <Wrap>
      {isClicked ? (
        <EditTodo todoList={props.todoList} setIsClicked={setIsClicked} />
      ) : (
        <>
          <p>{props.todoList.todo}</p>
          <input
            type="checkbox"
            checked={props.todoList.isCompleted}
            readOnly
          ></input>
          <button onClick={() => setIsClicked(true)}>수정</button>
          <button onClick={onClick}>삭제</button>
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.section`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  align-items: center;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  p {
    width: 80%;
    margin: 0;
    padding: 0.5rem 1rem;
  }
`;
