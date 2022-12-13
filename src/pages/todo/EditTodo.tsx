import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { todoType } from "./TodoPage";
import styled from "styled-components";
import { put } from "../../components/todoAgent";

interface todoProp {
  todoList: todoType;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}

export default function EditTodo(props: todoProp) {
  const [value, setValue] = useState<string>(props.todoList.todo);
  const [check, setCheck] = useState<boolean>(props.todoList.isCompleted);
  const onClick = () => {
    if (props.todoList.todo !== value || props.todoList.isCompleted !== check) {
      put(
        "https://pre-onboarding-selection-task.shop/todos/",
        props.todoList.id,
        value,
        check
      ).then(() => {
        props.setIsClicked(false);
        window.location.replace("/todo");
      });
    }
  };

  return (
    <>
      <TodoInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <input
        type="checkbox"
        checked={check}
        onClick={() => setCheck(!check)}
        readOnly
      ></input>
      <button onClick={onClick}>제출</button>
      <button
        onClick={() => {
          props.setIsClicked(false);
        }}
      >
        취소
      </button>
    </>
  );
}

const TodoInput = styled.input`
  width: 80%;
  height: 40px;
`;
