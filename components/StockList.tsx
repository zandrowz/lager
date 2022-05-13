
import { useEffect } from 'react';
import { Text, View} from 'react-native';
import { Base, Typography } from '../styles';
import productModel from "../models/products";


export default function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => {
        return <Text
                key={index}
                style={Base.products}
                >
                    { product.name } ({ product.stock } st)
                </Text>
    });

    return (
        <View style={Base.container}>
            {list}
        </View>
    );
}