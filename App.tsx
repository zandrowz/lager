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

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
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
