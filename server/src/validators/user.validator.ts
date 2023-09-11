import validator from "validator";

export const validateEmail = (input:string) => {
    return validator.isEmail(input);
};

export const validateUsername = (input:string) => {
    return validator.isAlpha(input);
};

export const validateFullName = (input:string) => {
    return validator.isAlpha(input);
};

export const validatePassword = (input:string) => {
    return validator.isAlphanumeric(input);
};

export const validateInput = (input:string) => {
    // xss and other step
    return true
};
