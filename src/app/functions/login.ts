import { connectAuthEmulator, getAuth, signInWithEmailAndPassword }
from "firebase/auth";
import { app } from "./initialize-firebase";
import { environment } from "src/environments/environment";
import { loginUser } from "./determine-auth-state";

/**
 * Logs in the user.
 *
 * @summary Logs in the user.
 * @param {string} email - The email.
 * @param {string} password - The password.
 * @returns {Promise<{success: boolean, message: string}>} A promise that
 *   resolves with an object containing a boolean indicating success and a
 *   message.
 */
export default async function login(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; }> {
  
  const auth = getAuth(app);

  if (!environment.production) {
    connectAuthEmulator(auth, "http://localhost:9099");
  };

  const responseData = await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      loginUser(
        await userCredential.user.getIdToken(),
        userCredential.user.uid
      );

      return  {
        success: true,
        message: "Login Successful",
      };
    })
    .catch(() => {
      return {
        success: false,
        message: "Failed to login"
      };
    });

  return {
    success: responseData.success,
    message: responseData.message
  };
};