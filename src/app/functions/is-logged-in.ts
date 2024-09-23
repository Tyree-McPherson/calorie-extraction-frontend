/**
 * Checks if the user is logged in.
 *
 * @returns {boolean} True if the user is logged in, false otherwise.
 */
export default function isLoggedIn(): boolean {
  return localStorage.getItem("loggedIn") === "true";
}