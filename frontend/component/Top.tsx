import React, { useEffect, useState } from 'react'
import { getServerSideProps } from '../feature/fetchapi';
import { useQuery } from 'react-query';
import { User, Users } from '../feature/type';

export const Top = () => {
    const {data, isLoading, isError, error} = useQuery(['users'], getServerSideProps);
    return (
        <>
            TOP
        </>
    )
}
