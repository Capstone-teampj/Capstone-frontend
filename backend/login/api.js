export async function login(url, email, passWord) {
  try {
    const response = await fetch(url + `/api/login`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: passWord,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
