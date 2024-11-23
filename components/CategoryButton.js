import { Pressable, StyleSheet, Text, View } from "react-native";

function CategoryButton({ onPress, children }) {
  return (
    <>
      <View style={styles.rootContainer}>
        <Pressable
          onPress={onPress}
          android_ripple={{ color: "ccc" }}
          style={styles.innerContainer}
        >
          <Text style={styles.textContainer}>{children}</Text>
        </Pressable>
      </View>
    </>
  );
}

export default CategoryButton;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e3e3e3",
  },
  innerContainer: {
    height: 36,
    borderRadius: 32,
    // borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  textContainer: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
