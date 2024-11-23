import { Pressable, StyleSheet, Text, View } from "react-native";

function SelectionButton({ items, onPress, children }) {
  const selectedStyle = items.includes(children) ? { borderWidth: 2 } : "";
  return (
    <>
      <View style={styles.rootContainer}>
        <Pressable
          onPress={onPress}
          android_ripple={{ color: "ccc" }}
          style={[styles.innerContainer, selectedStyle]}
        >
          <Text style={styles.textContainer}>{children}</Text>
        </Pressable>
      </View>
    </>
  );
}

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
export default SelectionButton;
