import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders";
import productModel from "../models/products";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        // fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
        //   .then(response => response.json())
        setProductsList(await productModel.getProducts());
        // await orderModel.getOrders()
        //   .then(result => setAllOrders(result.data));
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", {reload: true});
    }

    const productsHash = productsList.reduce((hash, current) => ({ ...hash,
    [current.id]: current.stock}), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
        }

        return <Text
                key={index}
                >
                    - {item.name}. Antal: {item.amount} st. Plats: {item.location}
            </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={{ fontSize: 24, color: "black", marginBottom: 10 }}>Kund:</Text>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.normal2}>Produkter:</Text>

            <Text style={Typography.normal}> {orderItemsList} </Text>

            {allInStock
            ? <Button title="Plocka order" color="#DF406A" onPress={pick} />
            : <Text style={{ fontSize: 20, color: "red", marginTop: 10 }}>OBS! Ordern går inte att packa, då varor saknas.</Text>
            }
        </View>
    )
};