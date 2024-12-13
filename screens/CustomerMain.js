import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";

import * as Notifications from "expo-notifications";
import * as Location from "expo-location";

import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import List from "../components/list/List";
import CategoryButton from "../components/CategoryButton";
import RestaurantDetails from "./RestaurantDetails";
import {
  getStoreRecommand,
  getStores,
  getStoresNearby,
} from "../backend/stores/api";
import { TokenContext } from "../store/store";
import PrimaryButton from "../components/PrimaryButton";

// const restaurants = [
//   {
//     name: "교촌치킨",
//     stars: "4.5",
//     promotion: true,
//     category: "한식",
//     latitude: 37.506621,
//     longitude: 126.957824,
//   },
//   {
//     name: "홍콩반점",
//     stars: "4.5",
//     promotion: true,
//     category: "중식",
//     latitude: 37.507194,
//     longitude: 126.958281,
//   },
//   {
//     name: "순대국밥",
//     stars: "4.5",
//     promotion: false,
//     category: "한식",
//     latitude: 37.507441,
//     longitude: 126.958906,
//   },
//   {
//     name: "카츠",
//     stars: "4.5",
//     promotion: false,
//     category: "일식",
//     latitude: 37.507843,
//     longitude: 126.958504,
//   },
//   {
//     name: "버거집",
//     stars: "4.5",
//     promotion: false,
//     category: "양식",
//     latitude: 37.507158,
//     longitude: 126.959667,
//   },
// ];
//
function CustomerMain() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const tokenContext = useContext(TokenContext);
  const navigator = useNavigation();
  const [location, setLocation] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false); // 알림 전송 여부 상태 추가
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [recommandedList, setRecommandedList] = useState(null);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  async function recommandHandler() {
    const data = await getStoreRecommand(
      tokenContext.url,
      tokenContext.getToken()
    );
    console.log(data);
    setRecommandedList(data);
    setModal(true);
  }

  function categoryButtonHandler(value) {
    setSearch(value);
  }
  function listClickHandler(store) {
    navigator.navigate("RestaurantDetails", {
      // 평균별점, 프로모션 여부
      storeId: store.id,
      storeName: store.name,
      congestionLevel: store.congestionLevel,
      averageRating: store.averageRating,
      discountActive: store.discountActive,
    });
  }

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation); // location 상태를 업데이트
    }
    // 현재 위치 가져오기 호출
    getCurrentLocation();
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("알림 권한이 거부되었습니다!");
      }
    })();
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    async function getNearby() {
      if (!location) return; // location이 설정되지 않았다면 종료
      const stores = await getStoresNearby(
        tokenContext.url,
        tokenContext.getToken(),
        location.coords.latitude,
        location.coords.longitude
      );
      setRestaurants(stores);
    }

    // location이 설정되면 근처 매장 호출
    getNearby();
  }, [location]); // location이 변경될 때만 실행

  useEffect(() => {
    console.log(search);
    if (search) {
      setFiltered(() =>
        restaurants.filter(
          (one) => one.category === search || one.name.includes(search)
        )
      );
    }
  }, [search]);
  useEffect(() => {
    async function sendNotification() {
      if (!restaurants || notificationSent) return; // restaurants가 없거나 이미 알림이 전송된 경우 종료

      const discountStores = restaurants.filter(
        (store) => store.discountActive
      );
      if (discountStores.length > 0) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "매장 할인 정보",
            body: `현재 위치 주변에 ${discountStores.length}개의 할인 매장이 있어요.`,
          },
          trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
        });
        setNotificationSent(true); // 알림 전송 완료 상태 설정
      }
    }

    sendNotification();
  }, [restaurants]); // restaurants 상태 변경 시 실행
  return restaurants ? (
    <>
      <View style={styles.rootContainer}>
        <Modal transparent={true} visible={modal}>
          <View style={styles.centeredModal}>
            <View style={styles.modalView}>
              <Text>당신을 위한 추천 음식점입니다.</Text>
              <FlatList
                data={
                  recommandedList
                    ? restaurants.filter((one) =>
                        recommandedList.recommendedStoreIds.includes(one.id)
                      )
                    : null
                }
                renderItem={({ item }) => (
                  <List
                    onPress={() => listClickHandler(item)}
                    isPromotion={item.discountActive}
                  >
                    {/* stores에 할인 여부 필요 */}
                    {item.name}
                  </List>
                )}
              />
              <PrimaryButton onPress={() => setModal(false)}>
                닫기
              </PrimaryButton>
            </View>
          </View>
        </Modal>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            style={{ paddingTop: 8, paddingLeft: 8 }}
          />
          <TextInput
            value={search}
            placeholder="음식점, 카테고리 검색"
            style={{ flex: 1 }}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <ScrollView horizontal={true}>
            <CategoryButton onPress={recommandHandler}>
              나만의 맛집 추천
            </CategoryButton>
            <CategoryButton onPress={() => categoryButtonHandler("한식")}>
              한식
            </CategoryButton>
            <CategoryButton onPress={() => categoryButtonHandler("중식")}>
              중식
            </CategoryButton>
            <CategoryButton onPress={() => categoryButtonHandler("일식")}>
              일식
            </CategoryButton>
            <CategoryButton onPress={() => categoryButtonHandler("양식")}>
              양식
            </CategoryButton>
            {/* <CategoryButton
              onPress={() => categoryButtonHandler("샐러드/샌드위치")}
            >
              샐러드/샌드위치
            </CategoryButton>
            <CategoryButton onPress={() => categoryButtonHandler("카페")}>
              카페
            </CategoryButton> */}
          </ScrollView>
        </View>
        {/* mapview로 지도 출력 */}
        {/* 지도에 marker 기능 시험 */}
        {/* 사장이 입력한 가게 좌표 기반으로 marker 활성화 */}
        {location || search ? (
          <View>
            <MapView
              style={{ width: "100%", height: 300 }}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                // latitude: 34.432432,
                // longitude: 22.957824,
                // latitude: location ? location.coords.latitude : 37.506621,
                // longitude: location ? location.coords.longitude : 126.957824,

                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Circle
                center={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                radius={500}
              />
              {restaurants.map((restaurant) => (
                <Marker
                  key={restaurant.id}
                  title={restaurant.name}
                  description={restaurant.category}
                  coordinate={{
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                  }}
                  onPress={() => console.log("pressed")}
                />
              ))}
              {/* <Marker
            title="음식점2"
            coordinate={{
              latitude: 37.507264,
              longitude: 126.959081,
              }}
              /> */}
            </MapView>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
        <FlatList
          data={search ? filtered : restaurants}
          renderItem={({ item }) => (
            <List
              onPress={() => listClickHandler(item)}
              isPromotion={item.discountActive}
            >
              {/* stores에 할인 여부 필요 */}
              {item.name}
            </List>
          )}
        />
      </View>
    </>
  ) : null;
}

export default CustomerMain;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 30,
    justifyContent: "center",
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    height: 40,
  },
  centeredModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    gap: 6,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
