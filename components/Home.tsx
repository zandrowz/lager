import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';

//@ts-ignore
import Stock from './Stock.tsx';
//@ts-ignore
import warehouse from '../assets/warehouse.jpg';
import box from '../assets/box.png';

export default function Home({route, products, setProducts}) {
  return (
    <SafeAreaView style={Base.base}>
      <View style={Base.container2}>
      <ScrollView>
        <Text style={Typography.header1}>Lager-Appen</Text>
        <Image source={box} style={{ width: 320, height: 220 }} />
        <Stock products={products} setProducts={setProducts} />
        <StatusBar style="auto" />
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
