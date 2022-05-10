import { createNativeStackNavigator } from '@react-navigation/native-stack';
//@ts-ignore
import ShipList from './ShipList.tsx';
//@ts-ignore
import ShipOrder from './ShipOrder.tsx';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Ship" component={ShipList} />
            <Stack.Screen name="Details">
                {(screenProps) => <ShipOrder {...screenProps}
                setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}