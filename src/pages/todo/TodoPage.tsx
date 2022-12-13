import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Todo from "./Todo";
import { post, get } from "../../components/todoAgent";

export interface todoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface FormValues {
  inputTodo: string;
}

export default function TodoPage() {
  const [todoLists, setTodoLists] = useState<todoType[]>([]);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    get("https://pre-onboarding-selection-task.shop/todos").then((data) => {
      setTodoLists(data);
    });
  }, []);

  const onSubmit = handleSubmit((data) => {
    post("https://pre-onboarding-selection-task.shop/todos", data.inputTodo);
  });

  return (
    <Wrap>
      {!localStorage.getItem("token") && <Navigate to="/" />}
      <AddTodoWrap onSubmit={onSubmit}>
        <AddTodo
          placeholder="할 일 추가"
          {...register("inputTodo", {
            required: true,
          })}
        />
        <AddBtn>추가</AddBtn>
      </AddTodoWrap>
      <TodoWrap>
        {todoLists.map((todoList) => (
          <Todo key={todoList.id} todoList={todoList} />
        ))}
      </TodoWrap>
    </Wrap>
  );
}

const Wrap = styled.section`
  position: absolute;
  width: 80vw;
  height: 80vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

const AddTodoWrap = styled.form`
  width: 80%;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const AddTodo = styled.input`
  width: 80%;
`;
const AddBtn = styled.button``;

const TodoWrap = styled.section`
  width: 80%;
  height: 95%;
  overflow-y: scroll;
`;
