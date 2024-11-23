import { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import PrimaryButton from "../components/PrimaryButton";

function ReviewRegister() {
  const [rating, setRating] = useState(3);

  return (
    <View style={styles.rootContanier}>
      <View style={styles.starContainer}>
        <StarRating
          rating={rating}
          onChange={setRating}
          enableHalfStar={false}
        />
        <Text style={{ marginLeft: 20, color: "gray", fontSize: 20 }}>
          {rating} / 5 점
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text>리뷰</Text>
        <View style={styles.reviewInput}>
          <TextInput placeholder="(인테리어, 맛, 서비스, 청결도에 대한 정보를 입력해주세요.)" />
        </View>
        <PrimaryButton>등록하기</PrimaryButton>
      </View>
    </View>
  );
}

export default ReviewRegister;

const styles = StyleSheet.create({
  rootContanier: {
    flex: 1,
    padding: 24,
  },
  starContainer: {
    flex: 0.2,
    alignItems: "center",
    flexDirection: "row",
  },
  reviewContainer: {
    flex: 0.8,
    gap: 16,
  },
  reviewInput: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    borderColor: "gray",
  },
});
