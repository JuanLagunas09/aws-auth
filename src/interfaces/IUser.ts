export interface IUser {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    adress: string;
    role: string;
    status: string;
    id_cognito?: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface IProfile extends Pick<IUser, "name" | "lastname" | "username" | "email" | "phone" | "adress"> {}

export interface ISignUp extends Omit<IUser, "id" | "role" | "status" | "createdDate" | "updatedDate" | "id_cognito"> {}

export interface IStoreUser extends Pick<IUser, "name" | "lastname" | "phone" | "adress" | "role" | "id_cognito"> {}
