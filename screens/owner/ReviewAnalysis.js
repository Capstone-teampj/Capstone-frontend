import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getReviewScore, getReviewSummary } from "../../backend/review/api";
import { TokenContext } from "../../store/store";

function ReviewAnalysis() {
  const tokenContext = useContext(TokenContext);
  const [scores, setScores] = useState(null);
  const [summaries, setSummaries] = useState(null);
  useEffect(() => {
    async function getSetReviewScore() {
      const result = await getReviewScore(
        tokenContext.url,
        tokenContext.getToken(),
        1
      );
      setScores(result[0]);
      console.log();
    }
    async function getSetReviewSummary() {
      const result = await getReviewSummary(
        tokenContext.url,
        tokenContext.getToken(),
        1
      );
      setSummaries(result);
      console.log(result);
    }
    getSetReviewScore();
    getSetReviewSummary();
  }, []);

  return scores && summaries ? (
    <>
      <View style={styles.rootContanier}>
        <View style={styles.scoresContanier}>
          <Text style={styles.mainText}>리뷰 점수</Text>
          <View style={styles.scoreContainer}>
            <Text>유저 별점</Text>
            <Text>{scores.ratingscore} 점</Text>
          </View>
          <View style={styles.subScoreContainer}>
            <View style={styles.scoreContainer}>
              <Text>인테리어</Text>
              <Text>{scores.interior} 점</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text>서비스</Text>
              <Text>{scores.service} 점</Text>
            </View>
          </View>
          <View style={styles.subScoreContainer}>
            <View style={styles.scoreContainer}>
              <Text>맛</Text>
              <Text>{scores.taste} 점</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text>청결도</Text>
              <Text>{scores.cleanliness} 점</Text>
            </View>
          </View>
        </View>
        <View style={styles.reviewanalysisContainer}>
          <ScrollView>
            <Text style={styles.mainText}>리뷰 요약</Text>
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewContanier}>
                <Text style={styles.positiveTitle}>이런 점이 좋았습니다.</Text>
                {summaries.important_reviews.positive.map((one) => (
                  <Text>{one}</Text>
                ))}
              </View>
              <View style={styles.reviewContanier}>
                <Text style={styles.negativeTitle}>
                  이런 점이 별로였습니다.
                </Text>
                {summaries.important_reviews.negative.map((one) => (
                  <Text>{one}</Text>
                ))}
              </View>
              <View style={styles.reviewContanier}>
                <Text style={styles.summaryTitle}>리뷰 요약</Text>
                <Text>{summaries.summary}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  ) : null;
}

export default ReviewAnalysis;

const styles = StyleSheet.create({
  rootContanier: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  scoresContanier: {
    flex: 0.5,
    gap: 16,
  },
  subScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
  },
  scoreContainer: {
    flex: 1,
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
  summaryTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#124ba6",
  },
});
