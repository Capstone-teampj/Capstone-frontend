import { StyleSheet, Text, View } from "react-native";

function ReviewAnalysis() {
  return (
    <>
      <View style={styles.rootContanier}>
        <View style={styles.scoresContanier}>
          <Text style={styles.mainText}>리뷰 점수</Text>
          <View style={styles.scoreContainer}>
            <Text>유저 별점</Text>
            <Text>4.2 점</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text>인테리어</Text>
            <Text>80 점</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text>서비스</Text>
            <Text>95 점</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text>맛</Text>
            <Text>80 점</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text>청결도</Text>
            <Text>95 점</Text>
          </View>
        </View>
        <View style={styles.reviewanalysisContainer}>
          <Text style={styles.mainText}>리뷰 요약</Text>
          <View style={styles.reviewsContainer}>
            <View style={styles.reviewContanier}>
              <Text style={styles.positiveTitle}>이런 점이 좋았습니다.</Text>
              <Text>
                이 음식점은 최고의 서비스와 음식 품질을 자랑합니다. 특히 파스타
                요리는 소스의 풍미와 면의 익힘 정도가 완벽했어요. 직원들도 매우
                친절하고, 식사 내내 세심하게 신경 써주는 느낌이 좋았습니다.
                분위기도 아늑해서 가족 모임이나 데이트 장소로도 손색이 없어요.
                강력 추천합니다!
              </Text>
            </View>
            <View style={styles.reviewContanier}>
              <Text style={styles.negativeTitle}>개선이 필요합니다.</Text>
              <Text>
                음식이 너무 늦게 나왔고, 직원들이 친절하지 않았어요. 특히 메인
                요리가 나올 때까지 거의 40분을 기다려야 했습니다. 음식의 맛도
                기대 이하였고, 소스가 너무 짜서 먹기 힘들었어요. 가성비가 좋지
                않다고 느껴서 다시 방문할 생각은 없습니다.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default ReviewAnalysis;

const styles = StyleSheet.create({
  rootContanier: {
    flex: 1,
    padding: 24,
  },
  scoresContanier: {
    flex: 0.9,
    gap: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 32,
    paddingHorizontal: 20,
  },
  reviewanalysisContainer: {
    flex: 1,
    gap: 12,
  },
  reviewsContainer: {
    gap: 12,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
  },
  positiveTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1d8c35",
  },
  reviewContanier: {
    borderWidth: 0.5,
    borderColor: "black",
    padding: 10,
    borderRadius: 24,
    backgroundColor: "#ffe8c7",
    gap: 8,
  },
  negativeTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e03439",
  },
});
