
export type Users = {
    id: number,
    username: string,
    email: string,
    password: string,
    icon: any,
    birth: Date,
    sex: number,
    userpolicy: boolean,
}[]

export type User = {
    id?: number,
    username: string,
    email?: string,
    password: string,
    icon?: any,
    birth?: Date,
    sex?: number,
}

export type UserRegister = {
    username: string,
    email: string,
    password1: string,
    password2: string,
    icon: any,
    birth: Date,
    sex: number,
    userpolicy: boolean,
}