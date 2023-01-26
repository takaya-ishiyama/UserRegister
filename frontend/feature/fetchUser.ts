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



export const GetUser = (username:string, password: string) => {
  const [user, setUser] = useState<any>();
  const [is_accesstoken, setIsAccessToken] = useState(false);
  const [is_refreshtoken, setIsRefreshToken] = useState(false);
  let cookies = parseCookies()

  // useEffect(()=>{auth(username, password)},[]);
  useEffect(()=>{login(username, password)},[]);
  useEffect(()=>{cookies = parseCookies()},[parseCookies()]);

  const login = async (username: string, password: string)=> {
    const resp = await fetchToken(username, password);
    if (resp.ok) {
      const tokenData = await resp.json();
      setCookie(null, 'accessToken', tokenData.access, {
          maxAge: 60 * 60,/*60min X 60second*/
      })
      setCookie(null, 'refreshToken', tokenData.refresh, {
          maxAge: 30 * 24 * 60 * 60,/* 24h X 60min X 60second*/
      })
      setIsRefreshToken(true);
      const respuser = await fetchUser();
      const _user = await respuser.json()
      return _user
    } else {
      console.log("error : fetch access token");
      return;
    }
  };
  
  const getToken = async () => {
    const resp = await fetchNewToken();
    if(resp.ok){
      const tokenData = await resp.json();
      setCookie(null, 'accessToken', tokenData.access,{
        maxAge: 60 * 60,/*60min X 60second*/ 
      })
      setIsAccessToken(true)
    }else{
      console.log("error : fetch refresh token ")
      return;
    }
  }
  const logout = (): void => {
    const url = makeUrl("/logout/");
    fetch(url, {
      method: "POST",
      credentials: "include"
    });
  };

   async function auth (username: string, password: string) {
    if(cookies){
      try{
        const resp = await login(username, password);
        setUser(resp)
      }catch{
        await getToken();
        const resp = await fetchUser();
        const _user = await resp.json();
        setUser(_user);
      }
    }else{
      console.log("error auth")
      return;
    }
  };
  return user;
};

