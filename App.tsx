import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//@ts-ignore
import Home from "./components/Home.tsx";
//@ts-ignore
import Pick from "./components/Pick.tsx";
//@ts-ignore
import Deliveries from "./components/Deliveries.tsx";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "car",
};

export default function App() {
    const [products, setProducts] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            if (route.name === "Lager") {
                iconName = "home";
            } else if (route.name === "Plock")  {
                iconName = "list";
            } else if (route.name === "Inleveranser")  {
                iconName = "car";
            } else {
                iconName = "alert";
            }

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
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
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
