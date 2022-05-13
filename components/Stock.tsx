import { Text, View} from 'react-native';
import { Base, Typography } from '../styles';
import productModel from "../models/products";

//@ts-ignore
import StockList from './StockList.tsx';


export default function Stock({products, setProducts}) {
    return (
        <View style={Base.container2}>
            <Text style={Typography.header3}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
