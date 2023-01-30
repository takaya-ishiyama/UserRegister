import { Box, Button, Checkbox, Flex, Input, Select, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { User, UserRegister } from '../feature/type';
import { useMutationUserRegist } from '../feature/usermutationUserRegist';
import { useRouter } from 'next/router';

const SingUp = () => {
    const {
        register,
        getValues,
        setValue,
        formState: {errors, isValid},
        control,
    } = useForm<UserRegister>({reValidateMode: "onSubmit"});
    const [userpolicy, setUserPolicy] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(e);
    };

    const toast = useToast();
    const router = useRouter();
    const MutationUser = useMutationUserRegist(
        getValues().username,
        getValues().password1,
        {
        onSuccess: (data: User) => {
          console.log('保存成功');
          console.log(data);
          toast({
            title: '成功',
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
          router.push(`${data.id}/home`);
        },
        onError: (error) => {
          console.log('保存失敗');
          toast({
            title: '失敗',
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });
          console.log(error);
        },
    });

    const create_user = () => {
        MutationUser.mutate({
            username: getValues().username,
            email: getValues().email,
            password: getValues().password1,
            icon: getValues().icon,
            birth: getValues().birth,
            sex: getValues().sex,
        })
    }
    
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
                    borderColor={errors.password1? "red": "glay"}
                    {...register("password1",{required: "入力してください"})}
                />
                <Box>パスワード確認</Box>
                <Input
                    mb={3}
                    borderColor={errors.password2? "red": "glay"}
                    {...register("password2",{required: "入力してください"})}
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
                    onClick={()=>{create_user()}}
                >
                    送信
                </Button>
                </Flex>
            </form>
        </>
  )
}

export default SingUp