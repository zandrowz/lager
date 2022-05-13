import { NavigationContainer } from '@react-navigation/native';
import { Button, ScrollView, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Forms, Base, Typography } from '../styles';
import { DataTable } from "react-native-paper";

import Invoice from '../interfaces/invoice';
import invoiceModel from '../models/invoices';
import storage from '../models/storage';

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Partial<Invoice[]>>([]);


    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    if (reload) {
        reloadInvoices();
        route.params = false;
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (<DataTable.Row key={index}>
            <DataTable.Cell style={{flex: 1.7}}>{invoice.name}</DataTable.Cell>
            <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
            <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
        </DataTable.Row>
        );
    });


    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header3}>Fakturor</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 1.7 }}>Namn</DataTable.Title>
                    <DataTable.Title>Pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>

            <Pressable style={Base.button} onPress={() => {
                    navigation.navigate('Form');
                }}>
                <Text style={Typography.buttonText}>Skapa ny faktura</Text>
            </Pressable>

            <Pressable style={Base.button} onPress={async () => {
                    await logOut();
                }}>
                <Text style={Typography.buttonText}>Logga ut</Text>
            </Pressable> 

            {/* <Button
            title="Skapa ny faktura"
            color="#e26b8b"
            onPress={() => {
                navigation.navigate('Form');
            }}
            />
            <Button
            title="Logga ut"
            
            onPress={async () => {
                await logOut()
            }}
            /> */}
        </ScrollView>
    )
}
