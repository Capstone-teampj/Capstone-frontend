import { Alert, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

function OrderWeb({ route }) {
  const { weburl } = route.params;
  const navigation = useNavigation();
  console.log(weburl);
  const handleNavigationChange = (navState) => {
    const { url } = navState;

    // 특정 URL로 리다이렉션된 경우 처리
    if (url.includes("paymentSuccess")) {
      Alert.alert("결제 성공", "결제가 완료되었습니다!", [
        {
          text: "확인",
          onPress: () => {
            navigation.reset({ routes: [{ name: "ReviewRegister" }] });
          },
        },
      ]);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{ uri: weburl }}
          onNavigationStateChange={handleNavigationChange}
        />
        <Text>매장에서 퇴장하시기 전에 결제를 해주세요.</Text>
      </View>
    </>
  );
}

export default OrderWeb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
