import axios from "axios";

export const post = (url: string, userId: string, userPw: string) => {
  return axios({
    url: url,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: userId,
      password: userPw,
    },
  })
    .then((res) => res.data.access_token)
    .catch((err) => console.log(err));
};
