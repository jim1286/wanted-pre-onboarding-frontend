import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  userId: string;
  userPw: string;
}

export default function Login() {
  const [clicked, isClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    if (clicked) {
      isClicked(false);
      axios({
        url: "https://pre-onboarding-selection-task.shop/auth/signup",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: data.userId,
          password: data.userPw,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        url: "https://pre-onboarding-selection-task.shop/auth/signin",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: data.userId,
          password: data.userPw,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
            navigate("/todo");
          }
        })
        .catch((err) => console.log(err));
    }
  });

  return (
    <Wrap>
      <LoginForm onSubmit={onSubmit}>
        <LoginId
          placeholder="이메일을 입력해주세요(이메일 형식)"
          {...register("userId", {
            required: true,
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.userId && <p>{errors.userId.message}</p>}
        <LoginPw
          placeholder="비밀번호를 입력해주세요(8자 이상)"
          {...register("userPw", {
            required: true,
            minLength: {
              value: 8,
              message: "8자리 이상이 아닙니다.",
            },
          })}
        />
        {errors.userPw && <p>{errors.userPw.message}</p>}
        {clicked ? (
          <FormBtn disabled={!isValid}>가입하기</FormBtn>
        ) : (
          <FormBtn disabled={!isValid}>로그인</FormBtn>
        )}
      </LoginForm>
      {!clicked && (
        <SignupBtn
          onClick={() => {
            isClicked(true);
          }}
        >
          회원가입
        </SignupBtn>
      )}
    </Wrap>
  );
}

const Wrap = styled.section`
  position: absolute;
  width: 50vw;
  height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
const LoginForm = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginId = styled.input`
  border: 1px solid black;
`;
const LoginPw = styled.input`
  border: 1px solid black;
`;
const FormBtn = styled.button``;
const SignupBtn = styled.button`
  width: 40%;
  background: white;
`;
