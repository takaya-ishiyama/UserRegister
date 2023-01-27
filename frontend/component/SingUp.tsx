import { Box, Button, Checkbox, Flex, Input, Select, SelectField } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User } from '../feature/type';

const SingUp = () => {
    const {
        register,
        getValues,
        setValue,
        formState: {errors, isValid},
        control,
    } = useForm<User>({reValidateMode: "onSubmit"});
    const [userpolicy, setUserPolicy] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        console.log(e)
    };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <Box>パスワード</Box>
                <Input
                    mb={3}
                    borderColor={errors.password? "red": "glay"}
                    {...register("password",{required: "入力してください"})}
                />
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
                            <DatePicker
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
                <Checkbox
                    size={"lg"}
                    checked={userpolicy}
                    onChange={()=>{setUserPolicy(!userpolicy)}}
                >
                    同意する
                </Checkbox>  
                <Button
                    w={"15%"}
                    display={"inline-block"}
                    type="submit"
                    bgColor={"blue.300"}
                    textAlign={"center"}
                    disabled={!userpolicy}
                >
                    送信
                </Button>
                </Flex>
            </form>
        </>
  )
}

export default SingUp