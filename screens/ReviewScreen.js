import { FlatList, StyleSheet, Text, View } from "react-native";
import ReviewList from "../components/list/ReviewList";
import { useContext, useEffect, useState } from "react";
import { getReviews } from "../backend/review/api";
import { TokenContext } from "../store/store";

// const reviews = [
//   { id: "user_1", stars: 5, review: "음식이 맛있어요" },
//   {
//     id: "user_2",
//     stars: 4,
//     review: "사장님이 친절해요",
//   },
//   {
//     id: "user_3",
//     stars: 4.5,
//     review: "매장 분위기가 좋아요",
//   },
//   {
//     id: "user_4",
//     stars: 5,
//     review: "매장이 깔끔하고 서비스가 좋아요",
//   },
//   {
//     id: "user_5",
//     stars: 5,
//     review: "매장이 깔끔하고 서비스가 좋아요",
//   },
//   {
//     id: "user_6",
//     stars: 5,
//     review: "매장이 깔끔하고 서비스가 좋아요",
//   },
// ];
function ReviewScreen({ route }) {
  const tokenContext = useContext(TokenContext);
  const { storeId } = route.params;
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    async function getSetReviews() {
      const data = await getReviews(
        tokenContext.url,
        tokenContext.getToken(),
        storeId
      );
      setReviews(data);
    }
    getSetReviews();
  }, []);
  return reviews ? (
    <View style={styles.rootContainer}>
      <Text>리뷰</Text>

      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <ReviewList
              id={item.authorUsername}
              stars={item.rating}
              review={item.content}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  ) : null;
}

export default ReviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
});
