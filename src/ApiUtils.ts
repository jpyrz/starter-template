import axios from "axios";
import { getIdToken } from "./firebaseUtils";

export async function secureApiRequest(
  endpoint: string,
  method = "GET",
  data: any
) {
  try {
    const token = await getIdToken(); // Get the Firebase ID token

    const headers = {
      Authorization: `Bearer ${token}`, // Add token to Authorization header
    };

    const response = await axios({
      url: `http://localhost:3000/api/${endpoint}`,
      method,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
