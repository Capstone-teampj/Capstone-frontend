import { FlatList, StyleSheet, Text, View } from "react-native";
import ReviewList from "../components/list/ReviewList";

const reviews = [
  { id: "user_1", stars: 5, review: "음식이 맛있어요" },
  {
    id: "user_2",
    stars: 4,
    review: "사장님이 친절해요",
  },
  {
    id: "user_3",
    stars: 4.5,
    review: "매장 분위기가 좋아요",
  },
  {
    id: "user_4",
    stars: 5,
    review: "매장이 깔끔하고 서비스가 좋아요",
  },
  {
    id: "user_5",
    stars: 5,
    review: "매장이 깔끔하고 서비스가 좋아요",
  },
  {
    id: "user_6",
    stars: 5,
    review: "매장이 깔끔하고 서비스가 좋아요",
  },
];
function ReviewScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>리뷰</Text>

      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <ReviewList id={item.id} stars={item.stars} review={item.review} />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ReviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
});
