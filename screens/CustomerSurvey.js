import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import SelectionButton from "../components/SelectionButton";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import CustomerMain from "./CustomerMain";

function CustomerSurvey() {
  const Navigator = useNavigation();

  const [restaurant, setRestaurant] = useState([]);
  // const [sex, setSex] = useState([]);
  const [prefer, setPrefer] = useState([]);

  function onRestaurantHandler(item) {
    if (restaurant.includes(item)) {
      setRestaurant((curArr) => curArr.filter((element) => element !== item));
    } else {
      setRestaurant((curArr) => [...curArr, item]);
    }
    console.log(restaurant);
  }
  // function onSexHandler(item) {
  //   if (sex.includes(item)) {
  //     setSex((curArr) => curArr.filter((element) => element !== item));
  //   } else {
  //     setSex((curArr) => [...curArr, item]);
  //   }
  // }
  function onPreferHandler(item) {
    if (prefer.includes(item)) {
      setPrefer((curArr) => curArr.filter((element) => element !== item));
    } else {
      setPrefer((curArr) => [...curArr, item]);
    }
  }

  function onSubmitHandler() {
    // submit logic
    onSkipHandler();
  }

  function onSkipHandler() {
    Navigator.replace("Drawer");
  }
  return (
    <>
      <View style={styles.rootContainer}>
        <Text>어떤 음식점을 선호하시나요?</Text>
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
        <View style={styles.buttonsContainer}>
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
        </View>
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
          <Text>무엇을 보시고 선택하시나요?</Text>
          <View style={styles.buttonsContainer}>
            <SelectionButton
              items={prefer}
              onPress={onPreferHandler.bind(this, "별점")}
            >
              별점
            </SelectionButton>
            <SelectionButton
              items={prefer}
              onPress={onPreferHandler.bind(this, "맛")}
            >
              맛
            </SelectionButton>
            <SelectionButton
              items={prefer}
              onPress={onPreferHandler.bind(this, "서비스")}
            >
              서비스
            </SelectionButton>
            <SelectionButton
              items={prefer}
              onPress={onPreferHandler.bind(this, "인테리어")}
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
    borderTopWidth: 1,
    gap: 8,
  },
  buttonsContainer: {
    width: 250,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
  },
  primaryButtonConatiner: {
    width: 250,
    marginTop: 32,
    flexDirection: "row",
    justifycontent: "center",
    gap: 20,
  },
});
