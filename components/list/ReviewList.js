import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ReviewList({ id, stars, review }) {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>{id} 님</Text>
      <View style={styles.subContainer}>
        <Ionicons name="star" color="#e8d335" size={20} />
        <Text> 5 / {stars} 점</Text>
      </View>
      <Text>{review}</Text>
    </View>
  );
}

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 8,
  },
  subContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 10,
  },
  mainText: {
    fontSize: 20,
    paddingRight: 20,
  },
});
