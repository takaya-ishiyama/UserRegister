import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { User, Users } from '../feature/type';
import axios from "axios";
import { AuthProvider } from '../feature/fetchUser';

export const Top = () => {
    // const {data, isLoading, isError, error} = useQuery(['users'], fetchCurrentUser);
    // const data = AuthProvider();
    // useEffect(()=>{console.log(data)},[data]);;
    return (
        <>
            TOP
        </>
    )
}
