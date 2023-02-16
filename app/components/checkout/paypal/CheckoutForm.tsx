import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, OnApproveData, SubscriptionDetail} from '@paypal/paypal-js';

const CheckoutPaypal = () => {
    const [{options, isPending}, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    // @ts-ignore
    const onCurrencyChange = ({target: {value}}) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data: CreateOrderData, actions: { order: any; }) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "8.99",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data: OnApproveData, actions: { order: any; subscription?: { get: () => Promise<SubscriptionDetail>; activate: () => Promise<void>; } | undefined; redirect?: (redirectURL: string) => void; restart?: () => void; }) => {
        return actions.order.capture().then((details: { payer: { name: { given_name: any; }; }; }) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <select value={currency} onChange={onCurrencyChange}>
                        <option value="USD">💵 USD</option>
                        <option value="EUR">💶 Euro</option>
                    </select>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default CheckoutPaypal;