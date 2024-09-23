/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 *
 * @returns {boolean} `true` if the email is valid, `false` if not.
 */
export default function validateEmail(email: string): boolean {
  
  const validation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return validation.test(String(email).toLowerCase());
};
