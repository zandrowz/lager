import config from "../config/config.json";
import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";

// export default function OrderList({ route, navigation }) {
//     const { reload } = route.params || false;
//     const [allOrders, setAllOrders] = useState([]);

//     if (reload) {
//         reloadOrders();
//     }

//     async function reloadOrders() {
//         setAllOrders(await orderModel.getOrders());
//         navigation.navigate("List", { reload: false });
//         console.log("Inne i reloadOrders");
//     }

//     useEffect(() => {
//         reloadOrders();
//     }, []);

    
export default function OrderList({ route, navigation }) {
    const [allOrders, setAllOrders] = useState([]);
    const { reload } = route.params || false;

    if (reload) {
        reloadOrders();
        route.params = false;
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);


    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                color="#e26b8b"
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            <Text style={Typography.header3}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
