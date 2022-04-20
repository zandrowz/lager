import config from "../config/config.json";

import products from "./products";
import Delivery from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
            delivery.api_key = config.api_key;
            const response = await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        const result = await response.json();

        console.log(result.data);
        return result.data;
    },
};

export default deliveries;