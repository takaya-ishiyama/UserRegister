import axios, { AxiosError } from "axios";
import { useMutation, UseMutationOptions, UseMutationResult } from "react-query";
import { User, UserRegister } from "./type";

const BASE_URL = "http://localhost:8000/account/api/";

export const useMutationUserRegist = (
    username: string,
    password: string,
    options?: UseMutationOptions<
    User,
    AxiosError,
    User,
    undefined
  >
): UseMutationResult<
User,
AxiosError,
User,
undefined> => {
    return useMutation(
        async (params: User): Promise<User> => {
          const { data } = await axios.post<User>(
            `${BASE_URL}create/`,
            {username,password,params}
            );
          return data;
        },
        options
    )
}