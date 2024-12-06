import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useContext, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { getLatLng } from "../../geocoding/api";
import { TokenContext } from "../../store/store";
import { getStoreId } from "../../backend/user/api";
import { postMenu } from "../../backend/menus/api";
const categoryList = [
  { label: "한식", value: "한식" },
  { label: "일식", value: "일식" },
  { label: "양식", value: "양식" },
  { label: "중식", value: "중식" },
  { label: "카페", value: "카페" },
  { label: "샐러드/샌드위치", value: "샐러드/샌드위치" },
];
function InitialRegister() {
  const [name, setName] = useState("");
  const [tables, setTables] = useState(1);
  const [address, setAddress] = useState("");
  const [latlng, setLatlng] = useState({});
  const [results, setResults] = useState([]);
  const [dialogue, setDialogue] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // 메뉴 아이템 배열
  const [category, setCategory] = useState("한식");
  const [temp, setTemp] = useState();

  const Navigator = useNavigation();
  const tokenContext = useContext(TokenContext);

  async function registerHandler() {
    await fetch(tokenContext.url + "/api/stores/register", {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenContext.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone: "string",
        category: category,
        latitude: latlng.lat || 0,
        longitude: latlng.lng || 0,
        totalTables: tables,
        emptyTables: tables,
      }),
    });
    const storeId = await getStoreId(tokenContext.url, tokenContext.getToken());
    await Promise.all(
      menuItems.map((menu) => {
        postMenu(
          tokenContext.url,
          tokenContext.getToken(),
          storeId,
          menu.name,
          menu.price
        );
      })
    );

    Navigator.replace("OwnerMainScreen");
  }

  function addMenuItem() {
    setMenuItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), name: "", price: "" }, // 고유 ID와 초기값 설정
    ]);
  }

  function updateMenuItem(id, field, value) {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function removeMenuItem(id) {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  console.log(menuItems);
  return (
    <>
      <ScrollView>
        <View style={styles.rootContainer}>
          <Modal transparent={true} visible={dialogue}>
            <View style={styles.centeredModal}>
              <View style={styles.modalView}>
                <Text>주소를 선택하세요</Text>
                {results.map((item) => (
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
                ))}
                <PrimaryButton onPress={() => setDialogue(false)}>
                  닫기
                </PrimaryButton>
              </View>
            </View>
          </Modal>
          <View style={styles.sectionContainer}>
            <Text style={styles.mainText}>등록 페이지</Text>
            <View style={{ width: 150 }}>
              <PrimaryButton>이미지 업로드</PrimaryButton>
            </View>
            <TextInput
              style={styles.searchContanier}
              placeholder="가게이름"
              onChangeText={setName}
            />
            <TextInput
              style={styles.searchContanier}
              placeholder="테이블 수"
              onChangeText={setTables}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                value={address}
                style={[styles.searchContanier, { width: 220 }]}
                placeholder="주소를 먼저 입력하세요"
                onChangeText={setAddress}
              />
              {address && (
                <PrimaryButton
                  onPress={() => {
                    getLatLng(address).then((results) => setResults(results));
                    setDialogue(true);
                  }}
                >
                  주소 입력
                </PrimaryButton>
              )}
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
                setCategory(item.value);
              }}
            />
          </View>
          {/* 모달 및 기존 코드 유지 */}
          <Text style={[styles.mainText, { marginBottom: 10 }]}>메뉴</Text>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.listContainer}>
              <PrimaryButton>이미지</PrimaryButton>
              <TextInput
                style={[styles.listText, { width: 100 }]}
                placeholder="품목명"
                value={item.name}
                // onFocus={()=>}
                onChangeText={(text) => updateMenuItem(item.id, "name", text)}
              />
              <TextInput
                style={styles.listText}
                placeholder="가격"
                keyboardType="numeric"
                value={item.price}
                // onFocus={setTemp}
                // onBlur={(temp) => updateMenuItem(item.id, "price", temp)}
                onChangeText={(text) => updateMenuItem(item.id, "price", text)}
              />
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => removeMenuItem(item.id)}
              >
                <Ionicons name="remove-circle-outline" size={30} color="red" />
              </Pressable>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Pressable android_ripple={{ color: "#ccc" }} onPress={addMenuItem}>
              <Ionicons name="add-circle-outline" size={50} />
            </Pressable>
          </View>
          <PrimaryButton onPress={registerHandler}>등록</PrimaryButton>
        </View>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "gray",
    borderColor: "#6c6c6c",
    marginBottom: 20,
    gap: 16,
  },
  listText: {
    fontSize: 20,
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
