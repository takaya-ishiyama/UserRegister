import { Box, Button, Flex, Input, Select, SelectField } from '@chakra-ui/react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from '../feature/type';

const SingUp = () => {
    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        formState: {errors, isValid},
        control,
    } = useForm<User>({reValidateMode: "onSubmit"});

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
                <Box>E-Mail</Box>
                <Input
                    mb={3}
                    borderColor={errors.email? "red": "glay"}
                    {...register("email",{pattern: {value: /^\w+@\w+/, message: "正しいメールアドレスを入力してください"}})}
                />
                <Box>誕生日</Box>
                    <Controller
                        control={control}
                        name={"birth"}
                        render={({ field: { onChange, value } }) => (
                            <ReactDatePicker
                                dateFormat="yyyy/MM/dd"
                                onChange={onChange}
                                selected={value as Date}
                            />
                        )}
                    />      
                <Box>性別</Box>
                <Select
                    mb={3}
                    placeholder={" "}
                    borderColor={errors.sex? "red": "glay"}
                    {...register("sex", {valueAsNumber: true})}
                >
                    <option value={0}>男性</option>
                    <option value={1}>女性</option>
                </Select>   
                <Box>利用規約</Box>
                  
                <Button
                    w={"15%"}
                    display={"inline-block"}
                    type="submit"
                    bgColor={"blue.300"}
                    textAlign={"center"}
                >
                    送信
                </Button>
                </Flex>
            </form>
        </>
  )
}

export default SingUp