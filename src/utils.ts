import isEmail, { IsEmailOptions } from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { StrongPasswordOptions } from './types';

const emailOptions:IsEmailOptions = {
    require_tld:true
};

/**
 * This function takes a string and tells wether that string is a valid email or not
 * @param inEmail The email to be verified
 * @returns a boolean (true if valid, false otherwise)
 */
const isValidEmail = (inEmail:string):boolean => {
    return isEmail(inEmail, emailOptions)
};

const passwordOptions:StrongPasswordOptions = {
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
    minLowercase: 1
};

/**
 *  This function takes in a string and tells wether true or false the string represents a string password
 *  With at least 6 characters including one number, one upper-case letter, one lowwer-case and one special character
 * @param inPassword the password to be verified ( a string )
 * @returns a boolean (true if the password is valid and strong else it returns false)
 */
const isValidPassword = (inPassword:string):boolean => {
    return isStrongPassword(inPassword,passwordOptions && {returnScore: false});
};

/**
 * This function takes in a string and uses javascript's regular expressions to tell wether or not that string repesents a valid family-name or a valid firstname
 * @param inName The name to be chcked
 * @returns a boolean (true if valid otherwise it's false)
 */
const isValidName = (inName:string):boolean => {
    return /^(([A-z]|[âäàéèàëêïîôöûü])+'([A-z]|[âäàéèàëêïîôöûü])+|([A-z]|[âäàéèàëêïîôöûü])+\s([A-z]|[âäàéèàëêïîôöûü])+|([A-z]|[âäàéèàëêïîôöûü])+)$/gi.test(inName);
}

export {isValidEmail, isValidPassword, isValidName};