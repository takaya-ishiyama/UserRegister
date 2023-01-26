import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import { GetUser } from '../feature/fetchUser';

export const Top = () => {
    // const {data, isLoading, isError, error} = useQuery(['users'], fetchCurrentUser);
    // useEffect(()=>{console.log(data)},[data]);;
    const [user, setUser] = useState();


    // function handleClick() {
    //     console.log(user)
    // }
    useEffect(()=>{setUser(GetUser("takaya", "taka1480"))},[])
    return (
        <>
            TOP
            {/* <Button onClick={handleClick}>cookie</Button> */}
        </>
    )
}
