import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SignForm from "../components/SignForm";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function Landing() {
  const [isClick, setIsClick] = useState(false);
  const [signType, setSignType] = useState("");
  function signButtonHandler(value) {
    setIsClick(true);
    setSignType(value);
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="restaurant-outline"
        size={120}
        style={{ marginBottom: 12 }}
      />
      <Text style={styles.mainText}>LiveDeal</Text>
      <View>
        <Text>언제 어디서나 할인가에 지역 맛집을 즐겨보세요!</Text>
      </View>
      {isClick && (
        <>
          <SignForm signupOrLogin={signType} />

          <PrimaryButton
            onPress={() => {
              setIsClick(false);
            }}
          >
            뒤로가기
          </PrimaryButton>
        </>
      )}
      {!isClick && (
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={() => signButtonHandler("회원가입")}>
            회원가입
          </PrimaryButton>
          <PrimaryButton onPress={() => signButtonHandler("로그인")}>
            로그인
          </PrimaryButton>
        </View>
      )}
    </View>
  );
}

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1c29ba",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  mainText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
