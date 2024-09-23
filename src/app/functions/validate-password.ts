/**
 * Validates a password.
 *
 * @summary Validates a password.
 * @param {string} passwordOne - The first password.
 * @param {string} [passwordTwo] - The second password for comparison.
 * @returns {{valid: boolean, value: string}} An object containing a boolean
 *   indicating whether the password is valid and a string explaining why the
 *   password is invalid.
 */
export default function validatePassword(
  passwordOne: string, passwordTwo?: string
  ): { valid: boolean; value: string; } {

  const passwordLengthMinimum = 8;
  const passwordLengthMaximum = 30;
  const symbolsPassword = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const regexLowerCase = /[a-z]/;
  const regexUpperCase = /[A-Z]/;
  const regexNumeric = /\d/;

  let passwordLength = passwordOne.length;
  let passwordErrorMessage: string = '';
  let passwordIsValid: boolean = true;

  if (passwordLength === 0) {
    passwordErrorMessage = passwordErrorText("cannot be empty");

  } else if (
      passwordLength < passwordLengthMinimum ||
      passwordLength > passwordLengthMaximum
    ) {
    passwordErrorMessage =
    passwordErrorText("must be 8 - 30 characters");

  } else if (!regexLowerCase.test(passwordOne)) {
    passwordErrorMessage =
    passwordErrorText("must have at least one lowercase letter");

  } else if (!regexUpperCase.test(passwordOne)) {
    passwordErrorMessage =
    passwordErrorText("must have at least one uppercase letter");

  } else if (!regexNumeric.test(passwordOne)) {
    passwordErrorMessage = passwordErrorText("must contain a numeric value");

  } else if (!symbolsPassword.test(passwordOne)) {
    passwordErrorMessage = passwordErrorText("must contain a symbol");

  } else if (passwordTwo) {

    // passwordTwo is only used to compare passwords.
    if (passwordOne !== passwordTwo) {
      passwordErrorMessage = "Passwords do not match";

    } else {
      passwordIsValid = true;
    };

  } else {
    passwordIsValid = true;
  };

  if (passwordErrorMessage) {
    passwordIsValid = false;
  }

  const passwordValidationObject = {
    valid: passwordIsValid,
    value: passwordErrorMessage
  };

  return passwordValidationObject;
};

/**
 * Returns a string that is the given error message with "Password "
 * prepended to it.
 *
 * @param {string} errorMessage - The error message to prepend "Password "
 *   to.
 *
 * @returns {string} The "Password " prepended error message.
 */
const passwordErrorText = (errorMessage: string): string => {
  return `Password ${errorMessage}`;
};