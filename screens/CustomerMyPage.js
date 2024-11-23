import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import CategoryButton from "../components/CategoryButton";

import CheckBox from "expo-checkbox";
import { useState } from "react";
import List from "../components/list/List";
import { useNavigation } from "@react-navigation/native";
import RestaurantDetails from "./RestaurantDetails";
import SelectionButton from "../components/SelectionButton";

function CustomerMypage() {
  const navigator = useNavigation();
  function listClickHandler() {
    navigator.navigate(RestaurantDetails);
  }
  const [alarm, setAlarm] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.userContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="person-circle-outline" size={120} />
          <Text style={{ marginRight: 20, fontSize: 20 }}>Nickname 님</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 20,
          }}
        >
          <PrimaryButton>로그아웃</PrimaryButton>
          <PrimaryButton>수정하기</PrimaryButton>
        </View>
      </View>
      <View>
        <View style={styles.checkboxContainer}>
          <Text>실시간 프로모션 알림</Text>
          <CheckBox value={alarm} onValueChange={setAlarm} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>선호 취향 변경</Text>
          <CategoryButton>변경</CategoryButton>
        </View>
      </View>
      <View style={styles.favoritesContainer}>
        <Text>즐겨찾기</Text>
        <ScrollView style={{ flex: 3 }}>
          <View>
            <List onPress={listClickHandler}>교촌치킨</List>
            <List>교촌치킨</List>
            <List>교촌치킨</List>
            <List>교촌치킨</List>
            <List>교촌치킨</List>
            <List>교촌치킨</List>
          </View>
        </ScrollView>
      </View>
      <CategoryButton>회원탈퇴</CategoryButton>
    </View>
  );
}

export default CustomerMypage;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  userContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#616161",
  },
  checkboxContainer: {
    marginTop: 30,
    flexDirection: "row",
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoritesContainer: {
    flex: 1,
    marginTop: 24,
    gap: 12,
  },
});
