import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FlashMessage from "react-native-flash-message";


//@ts-ignore
import Home from "./components/Home.tsx";
//@ts-ignore
import Pick from "./components/Pick.tsx";
//@ts-ignore
import Deliveries from "./components/Deliveries.tsx";
//@ts-ignore
import Invoices from "./components/Invoices.tsx";
//@ts-ignore
import Auth from "./components/auth/Auth";
//@ts-ignore
import Ship from "./components/ship/Ship.tsx";

import authModel from "./models/auth";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "car",
    "Logga in": "lock-closed",
    "Faktura": "ios-cash-sharp",
    "Leverans": "map",
};

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            // if (route.name === "Lager") {
            //     iconName = "home";
            // } else if (route.name === "Plock")  {
            //     iconName = "list";
            // } else if (route.name === "Inleveranser")  {
            //     iconName = "car";
            // } else if (route.name === "Logga in")  {
            //     iconName = "lock-closed";
            // } else if (route.name === "Faktura")  {
            //     iconName = "ios-cash-sharp";
            // } else if (route.name === "Leverans")  {
            //     iconName = "map";
            // } else {
            //     iconName = "alert";
            // }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#DF406A',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}
        >
          <Tab.Screen name="Lager">
          {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
              {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          {/* <Tab.Screen name="Inleveranser" component={Deliveries} /> */}
          <Tab.Screen name="Inleveranser">
              {() => <Deliveries products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Leverans" component={Ship} />
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
                {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#eee',
    // paddingLeft: 12,
    // paddingRight: 12,
    // marginBottom: 20,
    // color: '#fff',
  },
});
