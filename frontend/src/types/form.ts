export type formTypeRegister = {
    usreName: string;
    password: string;
    email: string;
};

export type formTypeLogin = {
    email: string;
    password: string;
};

export type formErrors = {
    userName?: string;
    email?: string;
    password?: string;
}

export type FormValues = {
    userName: string;
    email: string;
    password: string;
}

