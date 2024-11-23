import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import dummyRest from "../../assets/dummy/dummyRest";

function List({ onPress, isPromotion, children }) {
  return (
    <>
      <Pressable onPress={onPress} android_ripple={{ color: "ccc" }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/dummy/dummyRest.jpg")}
          ></Image>
          {isPromotion && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="alert-circle-outline" size={24} color="red" />
              <Text style={styles.promotionText}>특별 프로모션 중!</Text>
            </View>
          )}
          <Text style={styles.mainText}>{children}</Text>
        </View>
      </Pressable>
    </>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: 10,
    height: 80,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 16,
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
  promotionText: {
    fontWeight: "500",
    color: "#bf2846",
  },
});
