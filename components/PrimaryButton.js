import { Pressable, StyleSheet, Text, View } from "react-native";

function PrimaryButton({ onPress, children, style }) {
  return (
    <>
      <View style={styles.rootContainer}>
        <Pressable
          onPress={onPress}
          android_ripple={{ color: "ccc" }}
          style={[styles.innerContainer, style]}
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
    backgroundColor: "#f5a364",
  },
  innerContainer: {
    height: 50,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textContainer: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
export default PrimaryButton;
