export async function getStoreId(url, token) {
  try {
    const response = await fetch(url + "/api/stores/my-store-id", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
}
export async function putImportance(url, token, importance) {
  try {
    const response = await fetch(url + "/api/users/importance", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        importance: importance,
      }),
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function putPrefer(url, token, prefer) {
  try {
    const response = await fetch(url + "/api/users/preferences", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Preference: prefer,
      }),
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}
