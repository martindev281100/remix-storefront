import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, OnApproveData, SubscriptionDetail} from '@paypal/paypal-js';
import {addPaymentToOrder} from "~/providers/checkout/checkout";
import {useSubmit} from "@remix-run/react";

const CheckoutPaypal = (props: {fullAmount: number}) => {
    const [{options, isPending}, dispatch] = usePayPalScriptReducer();
    const submit = useSubmit();

    // @ts-ignore


    const onCreateOrder = (data: CreateOrderData, actions: { order: any; }) => {
        console.log("123123", props.fullAmount)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.fullAmount/100,
                    }
                },
            ],
        });
    }

    const onApproveOrder =  (data: OnApproveData, actions: { order: any; subscription?: { get: () => Promise<SubscriptionDetail>; activate: () => Promise<void>; } | undefined; redirect?: (redirectURL: string) => void; restart?: () => void; }) => {
        return actions.order.capture().then(async(details: any) => {
            console.log("detail", details)
            const name = details.payer.name.given_name;
            console.log(`Transaction completed by ${name}`);

            let request: Request;
            request = new Request('');

            console.log("data.payment", data.paymentID, data.orderID)
            const formData = new FormData();
            formData.set('paymentMethodCode', 'paypal');
            formData.set('paymentNonce', data.orderID ||"");

            await addPaymentToOrder(
                { method: 'paypal', metadata: data },
                { request },
            );

            submit(formData, { method: 'post' });
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
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