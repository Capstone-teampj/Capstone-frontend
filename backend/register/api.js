export async function registerUser(url, email, password) {
  try {
    const response = await fetch(url + `/api/register`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        address: "string",
        latitude: 0,
        longitude: 0,
      }),
    });
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}

export async function registerAdmin(url, email, password) {
  try {
    const response = await fetch(url + `/api/register/admin`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        address: "string",
        latitude: 0,
        longitude: 0,
      }),
    });
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}
