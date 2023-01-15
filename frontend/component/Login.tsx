import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    reValidateMode: "onSubmit"
  });

  const onSubmit = (data: any, e: any) => console.log(data, e);
  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Flex
              mx={"1rem"}
              w={"40%"}
              flexFlow={"column"}
            >
              <Box>名前</Box>
              <Input
                mb={3}
                borderColor={errors.username? "red": "glay"}
                {...register("username", {required: "入力してください"})}
              />
              {/* {errors.username && errors.username.message} */}
              <Box>パスワード</Box>
              <Input
                mb={3}
                borderColor={errors.password? "red": "glay"}
                {...register("password",{required: "入力してください"})}
              />
              {/* {errors.password && errors.password.message} */}
              <Button 
                w={"15%"}
                display={"inline-block"}
                type="submit"
                bgColor={"blue.300"}
              >
                送信
              </Button>
            </Flex>
        </form>
    </>
  )
}

export default Login;