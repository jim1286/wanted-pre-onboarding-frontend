import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}

  a {
    text-decoration: none;
    color: black;
  }
  
  button{
    background: #4286f4;
    margin: 0;
    padding: 0.5rem 1rem;
    -family: "Noto Sans KR", sans-serif;
    -size: 1rem;
    -weight: 400;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    display: inline-block;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: 0.5s;
    &:active {
    background: skyblue;
    outline: 0;
    }
    &:disabled {
    opacity: 0.5;
    }
    p {
    -family: "Pretendard";
    -style: normal;
    -weight: 500;
    -size: 16px;
    line-height: 24px;
    color: #ffffff;
    }
}

input{
  display: flex;
  outline: none;
  padding-left: 10px;
}
`;

export default GlobalStyle;
