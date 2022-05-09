//Formulär
import { useState } from 'react';
import { Platform, View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import productModel from "../models/products";
import deliveryModel from "../models/delivery";

import Delivery from '../interfaces/delivery';
import Product from '../interfaces/product';

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button color="#dfbbc5" onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    value={dropDownDate}
                    onChange={(event, date) => {
                        if (date !== undefined) {
                        setDropDownDate(date);
                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });
                        }
                        setShow(false);
                    }}
                    // value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {

    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(async () => {
    //     setProducts(await productModel.getProducts());
    // }, []);
    let productsHash: any = {};

    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue,
                product_name: productsHash[itemValue].name});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

export default function DeliveryForm({ route, navigation, products, setDeliveries, setProducts }) {
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    console.log(delivery);
    

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        setDeliveries(await deliveryModel.getDeliveries());
        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    }
        // TODO
        //Skicka delivery till deliver model
        //öka antalet produkter i lagret för vald produkt (använda produktmodellen)

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}>Ny inleverans</Text>

            <Text style={Typography.label}>Produkt</Text>
            <View style={Forms.picker}>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                products={products}
                setCurrentProduct={setCurrentProduct}
            />
            </View>

            <Text style={Typography.label}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={Typography.label}>Datum</Text>
            <View style={Forms.date}>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            </View>

            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                color="#F8D0DB"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};