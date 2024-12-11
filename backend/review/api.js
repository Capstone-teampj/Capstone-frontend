export async function getReviews(url, token, storeId) {
  try {
    const response = await fetch(url + `/api/reviews/store/${storeId}`, {
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

export async function registerReview(url, token, storeId, content, rating) {
  try {
    const response = await fetch(url + `/api/reviews/${storeId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        rating: rating,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getReviewScore(url, token, storeId) {
  try {
    const reviews = await getReviews(url, token, storeId);
    await Promise.all(
      reviews.map(async (review) => {
        review["storeId"] = storeId;
        // 추가적인 비동기 작업이 필요하다면 여기에 작성
      })
    );
    console.log(reviews);
    const response = await fetch(
      "https://e4fd-49-142-59-70.ngrok-free.app/reviewscore/scoring_reviews/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviews),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getReviewSummary(url, token, storeId) {
  try {
    const reviews = await getReviews(url, token, storeId);
    await Promise.all(
      reviews.map(async (review) => {
        review["storeId"] = storeId;
        delete review.rating;
      })
    );
    console.log(reviews);
    const response = await fetch(
      "https://e4fd-49-142-59-70.ngrok-free.app/reviewanal/analyze_reviews/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviews),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
