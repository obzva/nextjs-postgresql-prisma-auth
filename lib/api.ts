import axios, { AxiosResponse } from "axios";

const userApi = axios.create({
  baseURL: "/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});

type SignupBody = {
  username: string;
  email: string;
  password: string;
};

type SignupData = {
  user: {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
};

export async function signup(
  body: SignupBody,
): Promise<AxiosResponse<SignupData>> {
  try {
    return await userApi.post("/", body);
  } catch (error) {
    throw new Error("Error occurred while requesting signup API");
  }
}
