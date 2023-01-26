import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useState, useEffect, useContext } from "react";

const base_url = "http://localhost:8000/account/api";

async function allUserListAxios() {
  const {data} = await axios.get(`${base_url}/users/`);
  return data;
}

const makeUrl = (endpoint: string): string => {
  return base_url + endpoint;
}

const fetchToken = (username: string, password: string): Promise<Response> => {
  const url = makeUrl("/token/");
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
};

const fetchNewToken = (): Promise<Response> => {
  const url = makeUrl("/token/refresh/");
  const cookies = parseCookies()
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(cookies["refreshToken"]),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
};

async function fetchUser(): Promise<Response> {
  const url = makeUrl("/detail/")
  const cookies = parseCookies()
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `JWT ${cookies["accessToken"]}`,
    },
  });
}


export const Login = async (username: string, password: string) => {
  const resp = await fetchToken(username, password);
  if (resp.ok) {
    const tokenData = await resp.json();
    setCookie(null, 'accessToken', tokenData.access, {
        maxAge: 60 * 60,/*60min X 60second*/
    })
    setCookie(null, 'refreshToken', tokenData.refresh, {
        maxAge: 30 * 24 * 60 * 60,/* 24h X 60min X 60second*/
    })
    // setIsRefreshToken(true);
    const respuser = await fetchUser();
    const User = await respuser.json();
    return User;
  } else {
    console.log("error : fetch access token");
    return;
  }
};