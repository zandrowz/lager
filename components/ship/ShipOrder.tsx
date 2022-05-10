import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import * as Location from 'expo-location';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route, navigation, setProducts }) {
    const { reload } = route.params || false;
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productsList, setProductsLists] = useState([]);

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index} style={Typography.normal}
                >
                    {item.name} - antal: {item.amount} st
            </Text>;
    });


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);


    return (
        <View style={Base.base}>
            <Text style={Typography.header3}>Skicka order</Text>
            <Text style={Typography.header4}>Kund:</Text>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header4}>Produkter:</Text>

            <Text style={Typography.normal}> {orderItemsList} </Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                </MapView>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
