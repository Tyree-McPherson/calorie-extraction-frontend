import { connectAuthEmulator, getAuth, signOut } from "firebase/auth";
import { app } from "./initialize-firebase";
import { environment } from "src/environments/environment";
import { logoutUser } from "./determine-auth-state";

/**
 * Logs out the user.
 *
 * @summary Logs out the user.
 */

export default async function logout() {

  const auth = getAuth(app);

  if (!environment.production) {
    connectAuthEmulator(auth, "http://localhost:9099");
  };

  // Sign out of Firebase.
  await signOut(auth);

  logoutUser();
};
