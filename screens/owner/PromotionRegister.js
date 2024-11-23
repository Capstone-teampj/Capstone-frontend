import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

const discountList = [
  {
    menu: "짜장면",
    original_price: 6000,
    discount_price: 0,
  },
  {
    menu: "짬뽕",
    original_price: 7000,
    discount_price: 0,
  },
  {
    menu: "차돌짬뽕",
    original_price: 9000,
    discount_price: 0,
  },
  {
    menu: "삼선짬뽕",
    original_price: 8000,
    discount_price: 0,
  },
  {
    menu: "탕수육",
    original_price: 12000,
    discount_price: 0,
  },
  {
    menu: "볶음밥",
    original_price: 7000,
    discount_price: 0,
  },
  {
    menu: "잡채밥",
    original_price: 7000,
    discount_price: 0,
  },
];

function PromotionRegister() {
  const Navigator = useNavigation();
  function cancelHandler() {
    Navigator.navigate("OwnerMainScreen");
  }
  function submitHandler() {
    Navigator.navigate("OwnerMainScreen");
  }
  return (
    <View style={styles.rootContainer}>
      <Text>시간</Text>
      <View style={styles.timesContainer}>
        <View style={styles.timeContainer}>
          <TextInput placeholder="시작 시간" />
        </View>
        <Text> ~ </Text>
        <View style={styles.timeContainer}>
          <TextInput placeholder="종료 시간" />
        </View>
      </View>
      <Text>할인 품목 선책</Text>
      <FlatList
        data={discountList}
        renderItem={({ item }) => (
          <View style={styles.discountContainer}>
            <Text>{item.menu}</Text>
            <Text>현재 가격: {item.original_price}원</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <TextInput placeholder="할인 가격" />
              <Text>원</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.menu}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryButton onPress={cancelHandler}>취소</PrimaryButton>
        </View>
        <View style={{ flex: 1 }}>
          <PrimaryButton onPress={submitHandler}>확인</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default PromotionRegister;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  timesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  discountContainer: {
    padding: 12,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 12,
    marginBottom: 12,
  },
});
