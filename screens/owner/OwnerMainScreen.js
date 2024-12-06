import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { LineChart } from "react-native-chart-kit";
import ReviewList from "../../components/list/ReviewList";
import { useNavigation } from "@react-navigation/native";
import { getReviews } from "../../backend/review/api";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../store/store";
import { getStoreId } from "../../backend/user/api";

const data = {
  labels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  datasets: [
    {
      data: [1, 4, 3, 3, 1, 1, 2, 3, 5, 4],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  // legend: ["Rainy Days"], // optional
};
// const reviews = [
//   { id: "abcd", stars: 5, review: "음식이 맛있어요" },
//   {
//     id: "????",
//     stars: 4,
//     review: "사장님이 친절해요",
//   },
//   {
//     id: "???",
//     stars: 4.5,
//     review: "매장 분위기가 좋아요",
//   },
//   {
//     id: "??",
//     stars: 5,
//     review: "매장이 깔끔하고 서비스가 좋아요",
//   },
// ];

function OwnerMainScreen() {
  const [reviews, setReviews] = useState(null);
  // const storeId = 1;
  const Navigator = useNavigation();
  const tokenContext = useContext(TokenContext);
  useEffect(() => {
    async function getSetStoreId() {
      try {
        const data = await getStoreId(
          tokenContext.url,
          tokenContext.getToken()
        );
        console.log(data);
        tokenContext.setStoreId(data);
        return data;
      } catch (e) {
        Alert.alert(
          "storeId 오류",
          "user에 등록된 storeId를 찾을 수 없습니다."
        );
      }
    }
    async function getSetReviews() {
      const storeId = await getSetStoreId();
      const data = await getReviews(
        tokenContext.url,
        tokenContext.getToken(),
        storeId
      );
      setReviews(data);
    }
    getSetReviews();
  }, []);

  return (
    <View style={styles.rootContanier}>
      <View style={styles.subContainer}>
        <Text>안녕하세요, 사장님!!</Text>
        <View style={styles.buttonsContanier}>
          <PrimaryButton
            onPress={() => {
              Navigator.navigate("PromotionRegister");
            }}
            style={styles.button}
          >
            프로모션 등록
          </PrimaryButton>
          <PrimaryButton
            onPress={() => {
              Navigator.navigate("ReviewAnalysis");
            }}
            style={{ ...styles.button, backgroundColor: "purple" }}
          >
            리뷰 분석
          </PrimaryButton>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Text>매장 혼잡도</Text>
        <View style={styles.chartContainer}>
          {/* react-native-chart-kit */}
          <LineChart
            data={data}
            width={360}
            height={200}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      </View>
      <View style={[styles.subContainer, { gap: 8 }]}>
        <Text>리뷰</Text>
        <FlatList
          data={reviews}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <ReviewList
                id={item.authorUsername}
                stars={item.rating}
                review={item.content}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
export default OwnerMainScreen;

const styles = StyleSheet.create({
  rootContanier: {
    flex: 1,
    padding: 24,
  },
  subContainer: {
    flex: 1,
  },
  buttonsContanier: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 170,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
  },
});

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55,55, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  dotColor: () => "#7a7a7a",
};
