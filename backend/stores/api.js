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

export async function getStoreRecommand(url, token) {
  try {
    const response = await fetch(url + "/api/top5recommendations", {
      method: "POST",
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

export async function getStoreCongestion(url, token, storeId) {
  try {
    const response = await fetch(
      // /api/store-congestion/1/all?date=2024-12-11
      url + `/api/store-congestion/${storeId}/all?date=2024-12-13`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentCongestion(url, token, storeId) {
  try {
    const response = await fetch(url + `/api/stores/${storeId}/congestion`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.text();
  } catch (error) {
    console.error(error);
  }
}

export async function getStoresNearby(url, token, lat, lng, rad = 0.5) {
  console.log("parameter", lat, lng, rad);
  try {
    const response = await fetch(
      url + `/api/stores/nearby?latitude=${lat}&longitude=${lng}&radius=${rad}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
