import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import MenuList from "../components/list/MenuList";
import List from "../components/list/List";
import { ScrollView } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { getMenus } from "../backend/menus/api";
import { TokenContext } from "../store/store";
// const dummyMenu = [
//   {
//     image: null,
//     menu: "돈까스",
//     price: "9000",
//     isDiscount: false,
//     discontedPrice: null,
//   },
//   {
//     image: null,
//     menu: "치즈돈까스",
//     price: "10000",
//     isDiscount: false,
//     discontedPrice: null,
//   },
//   {
//     image: null,
//     menu: "비빔밥",
//     price: "9000",
//     isDiscount: true,
//     discontedPrice: 7000,
//   },
//   {
//     image: null,
//     menu: "김밥",
//     price: "3000",
//     isDiscount: false,
//     discontedPrice: null,
//   },
//   {
//     image: null,
//     menu: "제육덮밥",
//     price: "8000",
//     isDiscount: false,
//     discontedPrice: null,
//   },
//   {
//     image: null,
//     menu: "오므라이스",
//     price: "8000",
//     isDiscount: false,
//     discontedPrice: null,
//   },
//   {
//     image: null,
//     menu: "떡볶이",
//     price: "5000",
//     isDiscount: true,
//     discontedPrice: 4000,
//   },
// ];

function RestaurantDetails({ route }) {
  const tokenContext = useContext(TokenContext);
  const { storeId, storeName, congestionLevel, averageRating } = route.params;
  const [menus, setMenus] = useState(null);
  useEffect(() => {
    async function getSetMenus() {
      const data = await getMenus(
        tokenContext.url,
        tokenContext.getToken(),
        storeId
      );
      setMenus(data);
    }
    getSetMenus();
  }, []);
  const Navigator = useNavigation();
  function qrButtonHandler() {
    Navigator.navigate("ScanQR", {
      storeId: storeId,
    });
  }
  function reviewButtonHandler() {
    Navigator.navigate("ReviewScreen", {
      storeId: storeId,
    });
  }
  return menus ? (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={require("../assets/dummy/dummyRest.jpg")}
          />
          <View style={styles.topLeftContainer}>
            <PrimaryButton onPress={qrButtonHandler}>
              주문 QR 촬영
            </PrimaryButton>
            <PrimaryButton onPress={reviewButtonHandler}>
              리뷰 보기
            </PrimaryButton>
            <Text style={styles.titleText}>{storeName}</Text>
          </View>
        </View>
        <View style={styles.middleTopContainer}>
          <Ionicons name="star" color="#e8d335" size={32} />
          <Text style={{ marginLeft: 8 }}>{averageRating}</Text>
          <Text style={{ fontSize: 20, marginLeft: 80 }}>혼잡도</Text>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>
            {congestionLevel} 단계
          </Text>
        </View>
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>특별 할인 중!</Text>
          <Text style={styles.eventText}>00:00 까지</Text>
        </View>
        <FlatList
          style={styles.listView}
          data={menus}
          // keyExtractor={(item) => item.menu}
          renderItem={(itemData) => {
            return (
              <View style={{ marginBottom: 20 }}>
                <MenuList menu={itemData.item} />
              </View>
            );
          }}
        />
      </View>
    </>
  ) : null;
}

export default RestaurantDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  topLeftContainer: {
    marginLeft: 60,
    alignItems: "center",
    gap: 10,
  },

  middleTopContainer: {
    marginVertical: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c9c9c9",
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
  },
  eventContainer: {
    flexDirection: "row",
    backgroundColor: "#ab2e45",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 40,
  },
  eventText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listView: {
    marginTop: 20,
  },
});
