import { useState, useEffect } from 'react';
import { Platform, View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';


import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import Invoice from '../interfaces/invoice';
import Order from '../interfaces/order';

import orderModel from '../models/orders';
import invoiceModel from '../models/invoices';

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
}

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status_id < 600).map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({...props.invoice, order_id: itemValue });
            }}>
            {ordersList}
        </Picker>
    )
}

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
                    // value={dropDownDate}
                    onChange={(event, date) => {
                        if (date !== undefined) {
                        setDropDownDate(date);
                        props.setInvoice({
                            ...props.invoice,
                            // creation_date: date.toLocaleDateString('se-SV'),
                            creation_date: formatDate(date)
                        });
                        }
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoiceForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoice() {
        try {
            await invoiceModel.createInvoice(invoice);
        } catch (error) {
            console.log(error)
        }

        setInvoice(invoice);
    
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}>Ny faktura</Text>

            <Text style={Typography.label}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            <Text style={Typography.label}>Faktura</Text>
            <DateDropDown
            invoice={invoice}
            setInvoice={setInvoice}
        />

        <Button
            title="Skapa faktura"
            onPress={() => {
                createInvoice();
            }}
        />
        </ScrollView>
    )
}
