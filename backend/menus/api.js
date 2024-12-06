export async function getMenus(url, token, storeId) {
  try {
    const response = await fetch(url + `/api/menus/store/${storeId}`, {
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

export async function postMenu(url, token, storeId, name, price) {
  try {
    const response = await fetch(url + `/api/menus/${storeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
      }),
    });
    return await response.text();
  } catch (error) {
    console.error(error);
  }
}
