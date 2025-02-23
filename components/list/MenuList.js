import { Image, StyleSheet, Text, View } from "react-native";

function MenuList({ menu }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/dummy/dummyRest.jpg")}
      ></Image>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{menu.name}</Text>
        <Text
          style={[
            styles.priceText,
            menu.discountActive ? { textDecorationLine: "line-through" } : null,
          ]}
        >
          {menu.price}원
        </Text>
        {menu.discountActive ? (
          <Text style={[styles.priceText, { color: "red" }]}>
            특별할인가: {menu.discountedPrice}원
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: 10,
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "flex-end",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 20,
  },
});
