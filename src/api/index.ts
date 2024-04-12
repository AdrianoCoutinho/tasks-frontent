/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { LoginUserType } from "../shared/types";

axios.defaults.baseURL = "http://localhost:3333";

export interface ApiResponse {
  ok: boolean;
  data?: any;
  message: string;
  code?: number;
}

export const login = async (user: LoginUserType): Promise<ApiResponse> => {
  try {
    const result = await axios.post("/auth", user);
    return result.data;
  } catch (error: any) {
    if (error.request?.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }

    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listTasks = async (): Promise<ApiResponse> => {
  try {
    const userLoggedIn = localStorage.getItem("APP_ACCESS_TOKEN");

    const config = {
      headers: {
        Authorization: userLoggedIn,
      },
    };

    const result = await axios.get("/task", config);
    if (result.status === 200) {
      return {
        ok: true,
        code: 200,
        message: "Tarefas listadas com sucesso!",
        data: result,
      };
    }
    return {
      ok: false,
      message: "erro ao buscar tarefas",
    };
  } catch (error) {
    return {
      ok: false,
      code: 500,
      message: "erro",
    };
  }
};
