import { useNavigation } from "@react-navigation/native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useContext, useState } from "react";
import { Pressable } from "react-native";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TokenContext } from "../store/store";

export default function ScanQR({ route }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanned, setIsScanned] = useState(false);
  const [url, setUrl] = useState("");

  const navigator = useNavigation();
  const tokenContext = useContext(TokenContext);

  const { storeId } = route.params;
  async function barcodeHandler(value) {
    setIsScanned(true);
    setUrl(value.data);
    tokenContext.setStoreId(storeId);
  }
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // function toggleCameraFacing() {
  //   setFacing((current) => (current === "back" ? "front" : "back"));
  // }

  function onPressURLHandler(weburl) {
    const encodedToken = encodeURIComponent(btoa(tokenContext.getToken()));
    const encodedUrl = encodeURIComponent(btoa(tokenContext.url));
    navigator.navigate("OrderWeb", {
      weburl: weburl + `/${storeId}/${encodedUrl}/${encodedToken}`,
    });
  }
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(value) => (isScanned ? null : barcodeHandler(value))}
        // facing={facing}
      >
        <View style={styles.qrContainer} />
        <View style={{ marginTop: 50 }}>
          {url ? (
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 24,
                backgroundColor: "black",
                opacity: 0.6,
              }}
              onPress={() => {
                onPressURLHandler(url);
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: "yellow",
                    textDecorationLine: "underline",
                    fontWeight: "300",
                  },
                ]}
              >
                {url + `/${storeId}`}
              </Text>
            </Pressable>
          ) : (
            <Text style={[styles.text]}>QR 코드를 스캔하세요.</Text>
          )}
        </View>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View> */}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 8,
  },
});
