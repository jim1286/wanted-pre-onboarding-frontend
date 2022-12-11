import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import Todo from "./Todo";

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
  const [id, setId] = useState<number>(0);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    axios({
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setTodoLists(res.data);
    });
  }, [id]);

  const onSubmit = handleSubmit((data) => {
    axios({
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        todo: data.inputTodo,
      },
    }).then((res) => {
      setId(res.data.id);
    });
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
`;
