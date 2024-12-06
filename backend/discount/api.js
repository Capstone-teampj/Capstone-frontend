export async function postDiscounts(
  url,
  token,
  menuId,
  discountRate,
  durationHours
) {
  try {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 18 * 60 * 60 * 1000;
    const koreaTime = new Date(utc + koreaTimeDiff);
    console.log(koreaTime);
    const response = await fetch(url + "/api/discounts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId: menuId,
        discountRate: discountRate,
        startTime: koreaTime,
        durationHours: durationHours,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
