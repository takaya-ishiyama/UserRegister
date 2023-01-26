import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react';
import {Login} from '../feature/fetchUser';

export const Top = () => {
    const User = Login("takaya","taka1480");

    return (
        <>
            TOP
            {/* <Button onClick={handleClick}>cookie</Button> */}
        </>
    )
}
