import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Landing from "./screens/Landing";
import CustomerSurvey from "./screens/CustomerSurvey";
import CustomerMain from "./screens/CustomerMain";
import RestaurantDetails from "./screens/RestaurantDetails";
import CustomerMypage from "./screens/CustomerMyPage";
import InitialRegister from "./screens/owner/InitialRegister";
import OwnerMainScreen from "./screens/owner/OwnerMainScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ReviewAnalysis from "./screens/owner/ReviewAnalysis";
import ReviewRegister from "./screens/ReviewRegister";
import PromotionRegister from "./screens/owner/PromotionRegister";
import ScanQR from "./screens/ScanQR";
import TokenContextProvider from "./store/store";
import OrderWeb from "./screens/orderweb/OrderWeb";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="CustomerMain"
        component={CustomerMain}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="CustomerMyPage"
        component={CustomerMypage}
        options={{ title: "마이페이지" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <TokenContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="OwnerRegister" component={InitialRegister} />
          <Stack.Screen name="OwnerMainScreen" component={OwnerMainScreen} />
          {/* 사장님 화면 */}
          <Stack.Screen name="CustomerMain" component={CustomerMain} />
          <Stack.Screen name="ReviewAnalysis" component={ReviewAnalysis} />
          <Stack.Screen
            name="PromotionRegister"
            component={PromotionRegister}
          />
          {/* 고객 화면 */}
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="ScanQR" component={ScanQR} />
          <Stack.Screen
            name="RestaurantDetails"
            component={RestaurantDetails}
          />
          <Stack.Screen name="CustomerSurvey" component={CustomerSurvey} />
          <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
          <Stack.Screen name="ReviewRegister" component={ReviewRegister} />
          <Stack.Screen name="OrderWeb" component={OrderWeb} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenContextProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
