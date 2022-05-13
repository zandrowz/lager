//Listar upp alla leveranser som finns + knapp till formulär
import { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, ScrollView } from 'react-native';
import { Forms, Base, Typography } from '../styles';
import { Picker } from '@react-native-picker/picker';

import deliveryModel from "../models/delivery";
import Delivery from '../interfaces/delivery'

export default function DeliveriesList( { navigation, route}) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
        route.params = false;
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    // useEffect(async () => {
    //     setAllDeliveries(await deliveryModel.getDeliveries());
    // }, []);

    // useEffect(async () => {
    //     setAllDeliveries(await deliveryModel.getDeliveries());
    // }, []);
    // useEffect(() => {
    //     (async () => {
    //         setDeliveries(await deliveryModel.getDeliveries());
    //     })();
    // }, []);

    const listOfDeliveries = allDeliveries
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

            {/* <Pressable style={Base.button} onPress={() => {
                    navigation.navigate('Form');
                }}>
                <Text style={Typography.buttonText}>Skapa ny inleverans</Text>
            </Pressable> */}
            <Button
                title="Skapa ny inleverans"
                color="#F8D0DB"
                onPress={() => {
                    navigation.navigate('Form');
                }}
                accessibilityLabel={'Skapa inleverans genom att trycka'}
            />
        </View>
    );

}