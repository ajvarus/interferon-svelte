import { getToken } from "../../stores/queries/tokenStoreQueries";
import { INTF_AUTH_ENDPOINT } from "../../config";

async function logout() {
  const token = getToken();
  if (token) {
    try {
      const response = await fetch(`${INTF_AUTH_ENDPOINT}/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      const session = await response.json();
      console.log(session);
      return !session.is_active;
    } catch (error) {
      console.log("Error in logout", error);
      return false;
    }
  } else {
    return false;
  }
}

export { logout };
