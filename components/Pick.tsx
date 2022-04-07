import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//@ts-ignore
import OrderList from './OrderList.tsx';
//@ts-ignore
import PickList from './PickList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps}
                setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
