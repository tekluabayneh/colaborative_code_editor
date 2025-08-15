import { formTypeLogin } from "../types/form"

export const checkEmailValidity = (email: string) => {
    // if email is not the correct email type return message for the user  
    const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regx.test(email)) {
        return false
    }
    return true
}




export const validateFormData = (data: formTypeLogin) => {
    // check if email is valid
    if (!checkEmailValidity(data.email)) {
        return false
    }

    return true;
}


