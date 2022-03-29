import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, AppRegistry, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import warehouse from './assets/warehouse.jpg';


// 93470428f3379cb37496d818539d9134


export default function App() {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{color: '#e8998d', fontSize: 42, fontFamily: 'sans-serif-medium'}}>Lager-Appen</Text>
        <Text style={{color: '#e8998d', fontSize: 32, fontFamily: 'sans-serif-medium', marginBottom: 20}}>Infinity Warehouses</Text>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eed2cc',
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "center",
    marginBottom: 20,
  },
});

AppRegistry.registerComponent('App', () => App);
