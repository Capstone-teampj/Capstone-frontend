import axios from "axios";
// import { token, url } from "../url_token_info";

// const url = "http://10.210.43.59:8080/api/stores/";
// const token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTczMjY4Mzk5OCwiZXhwIjoxNzMyNzcwMzk4fQ.T1TKK2NbwPAN_H2oazRlTi_-5A8ut5Fwv3Nohl1dBBk";

export async function getStores(url, token) {
  try {
    const response = await fetch(url + "/api/stores/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
