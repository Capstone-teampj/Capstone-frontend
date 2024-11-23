import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { getLatLng } from "../../geocoding/api";

const categoryList = [
  { label: "한식", value: "한식" },
  { label: "일식", value: "일식" },
  { label: "양식", value: "양식" },
  { label: "중식", value: "중식" },
  { label: "카페", value: "카페" },
  { label: "샐러드/샌드위치", value: "샐러드/샌드위치" },
];
function InitialRegister() {
  const [category, setCategory] = useState("");
  const Navigator = useNavigation();

  function registerHandler() {
    Navigator.replace("OwnerMainScreen");
  }

  const [address, setAddress] = useState("");
  const [latlng, setLatlng] = useState({});
  const [results, setResults] = useState([]);
  const [dialogue, setDialogue] = useState(false);
  return (
    <>
      <View style={styles.rootContainer}>
        <Modal transparent={true} visible={dialogue}>
          <View style={styles.centeredModal}>
            <View style={styles.modalView}>
              <Text>주소를 선택하세요</Text>
              {results.map((item) => (
                <>
                  <Pressable
                    key={item.formatted_address}
                    android_ripple={{ color: "#ccc" }}
                    onPress={() => {
                      setAddress(item.formatted_address);
                      setLatlng(item.geometry.location);
                      setDialogue(false);
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 0.5,
                        borderColor: "gray",
                        padding: 6,
                      }}
                    >
                      <Text>{item.formatted_address}</Text>
                    </View>
                  </Pressable>
                </>
              ))}
            </View>
          </View>
        </Modal>
        <View style={styles.sectionContainer}>
          <Text style={styles.mainText}>등록 페이지</Text>
          <View style={{ width: 150 }}>
            <PrimaryButton>이미지 업로드</PrimaryButton>
          </View>
          <TextInput style={styles.searchContanier} placeholder="가게이름" />
          <TextInput style={styles.searchContanier} placeholder="테이블 수" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              value={address}
              style={[styles.searchContanier, { width: 220 }]}
              placeholder="주소"
              onChangeText={setAddress}
            />
            <PrimaryButton
              onPress={() => {
                getLatLng(address).then((results) => setResults(results));
                setDialogue(true);
              }}
            >
              주소 입력
            </PrimaryButton>
          </View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={categoryList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="카테고리 설정..."
            searchPlaceholder="Search..."
            value={category}
            onChange={(item) => {
              setCategory(item.category);
            }}
          />
        </View>
        <View style={[styles.sectionContainer, { flex: 0.8 }]}>
          <Text style={styles.mainText}>메뉴</Text>
          <View style={styles.listContainer}>
            <PrimaryButton>이미지 업로드</PrimaryButton>
            <TextInput
              style={[styles.listText, { marginLeft: 50, width: 100 }]}
              placeholder="품목명"
            />
            <TextInput style={styles.listText} placeholder="가격" />
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable android_ripple={{ color: "ccc" }}>
            <Ionicons name="add-circle-outline" size={50} />
          </Pressable>
        </View>
        <PrimaryButton onPress={registerHandler}>등록</PrimaryButton>
      </View>
    </>
  );
}

export default InitialRegister;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 24,
    flex: 1,
  },
  sectionContainer: {
    gap: 16,
    marginBottom: 20,
  },
  searchContanier: {
    height: 40,
    fontSize: 16,
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "600",
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 100,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6c6c6c",
  },
  listText: {
    fontSize: 20,
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  dropdown: {
    marginHorizontal: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
