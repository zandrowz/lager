// //Startvyn för inleveranser
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();


export default function Deliveries(props) {
    const [deliveries, setDeliveries] = useState([]);
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <DeliveriesList {...screenProps}
                deliveries={deliveries} 
                setDeliveries={setDeliveries} />}
            </Stack.Screen>

            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps}
                products={props.products}
                setProducts={props.setProducts}
                setDeliveries={setDeliveries} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};