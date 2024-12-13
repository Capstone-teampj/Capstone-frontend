import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { LineChart } from "react-native-chart-kit";
import ReviewList from "../../components/list/ReviewList";
import { useNavigation } from "@react-navigation/native";
import { getReviews } from "../../backend/review/api";
import { useContext, useEffect, useMemo, useState } from "react";
import { TokenContext } from "../../store/store";
import { getStoreId } from "../../backend/user/api";
import {
  getCurrentCongestion,
  getStoreCongestion,
} from "../../backend/stores/api";

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
  // const data = {
  //   labels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  //   datasets: [
  //     {
  //       data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   // legend: ["Rainy Days"], // optional
  // };
  const [congestionData, setCongestion] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [curCongestion, setCurCongestion] = useState("");
  const Navigator = useNavigation();
  const tokenContext = useContext(TokenContext);

  const data = useMemo(() => {
    return {
      labels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
      datasets: [
        {
          data:
            congestionData.length > 0
              ? congestionData
              : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }, [congestionData]);
  useEffect(() => {
    async function getSetStoreId() {
      try {
        const data = await getStoreId(
          tokenContext.url,
          tokenContext.getToken()
        );
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
    async function getSetCongeston() {
      const storeId = await getSetStoreId();
      const congestions = await getStoreCongestion(
        tokenContext.url,
        tokenContext.getToken(),
        storeId
      );
      const curCongestion = await getCurrentCongestion(
        tokenContext.url,
        tokenContext.getToken(),
        storeId
      );
      setCurCongestion(curCongestion);
      // console.log(congestions);
      let congestionsArr = new Array();
      await Promise.all(
        congestions.map((congestion) =>
          congestionsArr.push(congestion.congestionLevel + 1)
        )
      );
      // console.log(congestionsArr);
      setCongestion(congestionsArr);
    }
    getSetReviews();
    getSetCongeston();
  }, []);

  return congestionData.length > 0 ? (
    <View style={styles.rootContanier}>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.mainText}>안녕하세요, 사장님!!</Text>
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
        <Text style={styles.mainText}>
          매장 혼잡도 (현재 혼잡도는 {curCongestion.slice(-1)}입니다.)
        </Text>
        <View style={styles.chartContainer}>
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
        <Text style={styles.mainText}>리뷰</Text>
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
  ) : null;
}
export default OwnerMainScreen;

const styles = StyleSheet.create({
  rootContanier: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
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
    borderRadius: 20,
    overflow: "hidden",
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
