import axios from "axios";

export const post = (url: string, inputTodo: string) => {
  axios({
    url: url,
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      todo: inputTodo,
    },
  })
    .then(() => {
      window.location.replace("./todo");
    })
    .catch((err) => console.log(err));
};

export const get = (url: string) => {
  return axios({
    url: url,
    method: "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const del = (url: string, id: number) => {
  axios({
    url: url + id,
    method: "delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(() => {
      window.location.replace("/todo");
    })
    .catch((err) => console.log(err));
};

export const put = (url: string, id: number, value: string, check: boolean) => {
  return axios({
    url: url + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      todo: value,
      isCompleted: check,
    },
  }).catch((err) => console.log(err));
};
