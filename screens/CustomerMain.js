import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import * as Location from "expo-location";

import MapView, { Callout, Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import List from "../components/list/List";
import CategoryButton from "../components/CategoryButton";
import RestaurantDetails from "./RestaurantDetails";

const restaurants = [
  {
    name: "교촌치킨",
    stars: "4.5",
    promotion: true,
    category: "한식",
    latitude: 37.506621,
    longitude: 126.957824,
  },
  {
    name: "홍콩반점",
    stars: "4.5",
    promotion: true,
    category: "중식",
    latitude: 37.507194,
    longitude: 126.958281,
  },
  {
    name: "순대국밥",
    stars: "4.5",
    promotion: false,
    category: "한식",
    latitude: 37.507441,
    longitude: 126.958906,
  },
  {
    name: "카츠",
    stars: "4.5",
    promotion: false,
    category: "일식",
    latitude: 37.507843,
    longitude: 126.958504,
  },
  {
    name: "버거집",
    stars: "4.5",
    promotion: false,
    category: "양식",
    latitude: 37.507158,
    longitude: 126.959667,
  },
];

function CustomerMain() {
  const navigator = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  function listClickHandler() {
    navigator.navigate(RestaurantDetails);
  }
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    }

    getCurrentLocation();
  }, []);
  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            style={{ paddingTop: 8, paddingLeft: 8 }}
          />
          <TextInput placeholder="음식점, 카테고리 검색" style={{ flex: 1 }} />
        </View>
        <View style={styles.buttonsContainer}>
          <ScrollView horizontal={true}>
            <CategoryButton>나만의 맛집 추천</CategoryButton>
            <CategoryButton>한식</CategoryButton>
            <CategoryButton>중식</CategoryButton>
            <CategoryButton>일식</CategoryButton>
            <CategoryButton>양식</CategoryButton>
            <CategoryButton>샐러드/샌드위치</CategoryButton>
            <CategoryButton>카페</CategoryButton>
          </ScrollView>
        </View>
        {/* mapview로 지도 출력 */}
        {/* 지도에 marker 기능 시험 */}
        {/* 사장이 입력한 가게 좌표 기반으로 marker 활성화 */}
        {location ? (
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
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
            >
              {restaurants.map((restaurant) => (
                <Marker
                  key={restaurant.name}
                  title={restaurant.name}
                  description={restaurant.stars}
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
          data={restaurants}
          renderItem={({ item }) => (
            <List onPress={listClickHandler} isPromotion={item.promotion}>
              {item.name}
            </List>
          )}
        />
      </View>
    </>
  );
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
});
