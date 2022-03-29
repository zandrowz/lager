import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from "../config/config.json";


function StockList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock } st</Text>);

    return (
        <View style={styles.container}>
        {list}
        </View>
    );
}

export default function Stock() {
    return (

        <View style={styles.container}>
        <Text style={styles.row}>Lagerförteckning</Text>

        <StockList/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        marginTop: 10,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#e8998d",
    },
    row: {
        alignItems: "center",
        fontSize: 24,
        color: '#eed2cc',
        marginBottom: 6,
        justifyContent: "center",
        borderBottomWidth: 1.5,
        borderBottomColor: "#eed2cc",
    }

});