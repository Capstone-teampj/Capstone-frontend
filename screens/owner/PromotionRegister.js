import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../store/store";
import { getMenus } from "../../backend/menus/api";
import { postDiscounts } from "../../backend/discount/api";

// const discountList = [
//   {
//     menu: "짜장면",
//     original_price: 6000,
//     discount_price: 0,
//   },
//   {
//     menu: "짬뽕",
//     original_price: 7000,
//     discount_price: 0,
//   },
//   {
//     menu: "차돌짬뽕",
//     original_price: 9000,
//     discount_price: 0,
//   },
//   {
//     menu: "삼선짬뽕",
//     original_price: 8000,
//     discount_price: 0,
//   },
//   {
//     menu: "탕수육",
//     original_price: 12000,
//     discount_price: 0,
//   },
//   {
//     menu: "볶음밥",
//     original_price: 7000,
//     discount_price: 0,
//   },
//   {
//     menu: "잡채밥",
//     original_price: 7000,
//     discount_price: 0,
//   },
// ];

function PromotionRegister() {
  const [menus, setMenus] = useState(null);
  const [discountMenus, setDiscountMenus] = useState([]);
  const [discountRate, setDiscountRate] = useState({});
  const [discountDuration, setDiscountDuration] = useState({});
  const tokenContext = useContext(TokenContext);
  useEffect(() => {
    async function getSetMenus() {
      const data = await getMenus(
        tokenContext.url,
        tokenContext.getToken(),
        tokenContext.getStoreId()
      );
      setMenus(data);
    }
    getSetMenus();
  }, []);

  const Navigator = useNavigation();

  function addList(menuId, discountRate, durationHours) {
    setDiscountMenus(discountMenus.filter((one) => one.menuId !== menuId));
    setDiscountMenus((prev) => [
      ...prev,
      {
        menuId: menuId,
        discountRate: discountRate,
        durationHours: durationHours,
      },
    ]);
    console.log(discountMenus);
  }
  function deleteList(menuId) {
    setDiscountMenus(discountMenus.filter((one) => one.menuId !== menuId));
  }

  function cancelHandler() {
    Navigator.navigate("OwnerMainScreen");
  }
  function submitHandler() {
    discountMenus.map((menu) =>
      postDiscounts(
        tokenContext.url,
        tokenContext.getToken(),
        menu.menuId,
        menu.discountRate,
        menu.durationHours
      )
    );

    Navigator.replace("OwnerMainScreen");
    // Navigator.navigate("OwnerMainScreen");
  }
  return menus ? (
    <View style={styles.rootContainer}>
      {/* <Text>시간</Text>
      <View style={styles.timesContainer}>
        <View style={styles.timeContainer}>
          <TextInput placeholder="시작 시간" />
        </View>
        <Text> ~ </Text>
        <View style={styles.timeContainer}>
          <TextInput placeholder="종료 시간" />
        </View>
      </View> */}
      <Text>할인 품목 선택</Text>
      <FlatList
        data={menus}
        renderItem={({ item }) => (
          <View style={styles.discountContainer}>
            <Text>{item.name}</Text>
            {item.discountActive && (
              <Text style={{ color: "red" }}>현재 할인 중입니다...</Text>
            )}
            <Text>현재 가격: {item.price}원</Text>
            {item.discountActive ? (
              <Text>할인 중인 가격: {item.discountedPrice}</Text>
            ) : (
              <>
                <View style={styles.rowContainer}>
                  <Text>할인된 가격:</Text>
                  <TextInput
                    style={styles.textInputContainer}
                    placeholder="할인된 가격을 입력하세요"
                    onChangeText={(value) => {
                      setDiscountRate((prev) => {
                        const updatedRate = { ...prev };
                        if (value) {
                          updatedRate[item.id] = 1 - value / item.price;
                        } else {
                          delete updatedRate[item.id];
                        }
                        console.log(updatedRate); // 디버깅용 콘솔 출력
                        return updatedRate;
                      });
                    }}
                    keyboardType="numeric"
                  />
                  <Text>원</Text>
                </View>
                <Text>
                  할인율:{" "}
                  {discountRate[item.id]
                    ? parseInt(discountRate[item.id] * 100)
                    : null}
                  %
                </Text>
                <View style={styles.rowContainer}>
                  <Text>할인 시간:</Text>
                  <TextInput
                    style={styles.textInputContainer}
                    placeholder="(1시간 이상 가능)"
                    onChangeText={(value) => {
                      value
                        ? (discountDuration[item.id] = value)
                        : delete discountDuration[item.id];
                      console.log(discountDuration);
                    }}
                    keyboardType="numeric"
                  />
                  <Text>시간</Text>
                </View>
                <PrimaryButton
                  onPress={() => {
                    if (!(discountDuration[item.id] && discountRate[item.id])) {
                      console.log(
                        discountDuration[item.id],
                        discountRate[item.id]
                      );
                      Alert.alert(
                        "입력 오류",
                        "할인 가격 또는 할인시간을 입력해주세요."
                      );
                    } else {
                      addList(
                        item.id,
                        discountRate[item.id],
                        discountDuration[item.id]
                      );
                    }
                  }}
                >
                  적용
                </PrimaryButton>
              </>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
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
  ) : null;
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
  textInputContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "gray",
    paddingHorizontal: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
