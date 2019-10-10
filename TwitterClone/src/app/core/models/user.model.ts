export interface IUser {
    id: String,
    username: String,
    email: String,
    image: String,
    token: String //
}

export interface LoginResp {
    success: boolean,
    token: string,
    user: IUser
}