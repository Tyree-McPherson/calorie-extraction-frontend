import { environment } from "../../environments/environment";

/**
 * Signs up the user.
 *
 * @summary Signs up the user.
 * @param {string} email - The email.
 * @param {string} password - The password.
 * @param {string} passwordConfirm - The password confirmation.
 * @returns {Promise<{success: boolean, message: string}>} A promise that
 *   resolves with an object containing a boolean indicating success and a
 *   message.
 */
export default async function signup(
  email: string, password: string,
  passwordConfirm: string
  ): Promise<{ success: boolean; message: string; }> {

  const payload = new FormData();
  payload.append("email", email);
  payload.append("password", password);
  payload.append("passwordConfirm", passwordConfirm);

  const responseData = await fetch(`${environment.apiUrl}signup`, {
    method: "POST",
    body: payload
  })
  .then(async (response: any) => {

    const data = await response.json();

    // If there is an error, display an error message.
    if (!data.valid) {
      return {
        success: false,
        message: data.message
      };
    };

    // Redirect to the login modal.
    // Return the response.
    return {
      success: true,
      message: data.message
    };
  })
  .catch((error) => {

    let message = "An unknown error occurred.";

    if (error.response?.data?.message
      ?.includes("The email address is already")) {
      message = error.response.data.message
    };

    return {
      success: false,
      message: message
    };
  });

  return {
    success: responseData.success,
    message: responseData.message
  };
};
