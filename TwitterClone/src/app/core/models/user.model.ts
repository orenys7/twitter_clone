export interface IUser {
    _id: string,
    username: string,
    email: string,
    image: string,
    token: string
}

export interface LoginResp {
    success: boolean,
    token: string,
    user: IUser
}