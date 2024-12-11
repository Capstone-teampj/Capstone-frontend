import { Alert, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";

import SelectionButton from "../components/SelectionButton";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { putImportance, putPrefer } from "../backend/user/api";
import { TokenContext } from "../store/store";

function CustomerSurvey() {
  const Navigator = useNavigation();
  const tokenContext = useContext(TokenContext);
  const [restaurant, setRestaurant] = useState([]);
  // const [sex, setSex] = useState([]);
  const [importance, setImportance] = useState("");
  const [fakeImportance, setFakeImportance] = useState("");

  function onRestaurantHandler(item) {
    if (restaurant.includes(item)) {
      setRestaurant((curArr) => curArr.filter((element) => element !== item));
    } else {
      setRestaurant((curArr) => [...curArr, item]);
    }
  }
  // function onSexHandler(item) {
  //   if (sex.includes(item)) {
  //     setSex((curArr) => curArr.filter((element) => element !== item));
  //   } else {
  //     setSex((curArr) => [...curArr, item]);
  //   }
  // }
  function onImportanceHandler(item) {
    setImportance(item);
    switch (item) {
      case "rating":
        setFakeImportance("별점");
        break;
      case "taste":
        setFakeImportance("맛");
        break;
      case "service":
        setFakeImportance("서비스");
        break;
      case "interior":
        setFakeImportance("인테리어");
        break;
    }
  }

  function onSubmitHandler() {
    if (!(restaurant.length > 0 && importance)) {
      Alert.alert("제출 오류", "음식점과 선호하는 점을 고르세요!!");
      return;
    }
    // submit logic
    const prefer = restaurant.join(", ");
    console.log(prefer);
    putPrefer(tokenContext.url, tokenContext.getToken(), prefer);
    putImportance(tokenContext.url, tokenContext.getToken(), importance);
    onSkipHandler();
  }

  function onSkipHandler() {
    Navigator.replace("Drawer");
  }
  return (
    <>
      <View style={styles.rootContainer}>
        <Text>어떤 음식점을 선호하시나요?</Text>
        <Text style={{ marginBottom: 4 }}>(여러 개 선택 가능)</Text>

        <View style={styles.buttonsContainer}>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "한식")}
          >
            한식
          </SelectionButton>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "중식")}
          >
            중식
          </SelectionButton>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "일식")}
          >
            일식
          </SelectionButton>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "양식")}
          >
            양식
          </SelectionButton>
        </View>
        {/* <View style={styles.buttonsContainer}>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "샐러드/샌드위치")}
          >
            샐러드/샌드위치
          </SelectionButton>
          <SelectionButton
            items={restaurant}
            onPress={onRestaurantHandler.bind(this, "카페")}
          >
            카페
          </SelectionButton>
        </View> */}
        {/* <View style={styles.innerContainer}>
          <Text>성별</Text>
          <View style={styles.buttonsContainer}>
            <SelectionButton
              items={sex}
              onPress={onSexHandler.bind(this, "남")}
            >
              남
            </SelectionButton>
            <SelectionButton
              items={sex}
              onPress={onSexHandler.bind(this, "여")}
            >
              여
            </SelectionButton>
          </View>
        </View> */}
        <View style={styles.innerContainer}>
          <Text style={{ textAlign: "center" }}>
            무엇을 보시고 선택하시나요?
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 8 }}>
            (하나만 선택 가능)
          </Text>
          <View style={styles.buttonsContainer}>
            <SelectionButton
              items={fakeImportance}
              onPress={onImportanceHandler.bind(this, "rating")}
            >
              별점
            </SelectionButton>
            <SelectionButton
              items={fakeImportance}
              onPress={onImportanceHandler.bind(this, "taste")}
            >
              맛
            </SelectionButton>
            <SelectionButton
              items={fakeImportance}
              onPress={onImportanceHandler.bind(this, "service")}
            >
              서비스
            </SelectionButton>
            <SelectionButton
              items={fakeImportance}
              onPress={onImportanceHandler.bind(this, "interior")}
            >
              인테리어
            </SelectionButton>
          </View>
        </View>
        <View style={styles.primaryButtonConatiner}>
          <View style={{ flex: 1 }}>
            <PrimaryButton onPress={onSkipHandler}>스킵</PrimaryButton>
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton onPress={onSubmitHandler}>입력</PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );
}

export default CustomerSurvey;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  innerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderColor: "gray",
    gap: 8,
    justifyContent: "center",
  },
  buttonsContainer: {
    width: 250,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  primaryButtonConatiner: {
    width: 250,
    marginTop: 32,
    flexDirection: "row",
    gap: 20,
  },
});
