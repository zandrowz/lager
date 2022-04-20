//Listar upp alla leveranser som finns + knapp till formulär
import { useState, useEffect } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { Forms, Base, Typography } from '../styles';

import deliveryModel from "../models/deliveries.ts";
import Delivery from '../interfaces/delivery'

export default function DeliveriesList( { navigation, deliveries, setDeliveries }) {
    // const { reload } = route.params || false;
    // const [deliveries, setAllDeliveries] = useState([]);

    // useEffect(async () => {
    //     setAllDeliveries(await deliveryModel.getDeliveries());
    // }, []);

    // useEffect(async () => {
    //     setAllDeliveries(await deliveryModel.getDeliveries());
    // }, []);
    useEffect(() => {
        (async () => {
            setDeliveries(await deliveryModel.getDeliveries());
        })();
    }, []);

    const listOfDeliveries = deliveries
    .map((delivery, index) => {
        console.log("Lista med inleveranser");
        return <View key={index} style={Forms.input}>
                <Text style={Typography.header4}>
                    {delivery.product_name}. Antal: {delivery.amount} st.</Text>
                <Text style={Typography.normal2}>
                    Levererad: {delivery.delivery_date}.
                    Kommentar: {delivery.comment}
                </Text>
                </View>
    });

//Lägger till alla deliveries
    return (
        <View style={Base.base}>
            <Text style={Typography.header3}>Inleveranser</Text>
            <ScrollView>
            {listOfDeliveries}
            </ScrollView>
            <Button
                title="Skapa ny inleverans"
                color="#F8D0DB"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    );

}