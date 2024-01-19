import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

import React, { useEffect, useState } from 'react'
export type StripeTypes = {
    clientSecret: string;
    appearance: {
        theme: "stripe",
        variables: {
            colorPrimary: string
        }
    }
};
// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OWf4QFj5EZEN2h0IWKDQa63z4LiwEURuSOw8xAL5lJ7lyWAsgXXmD984sT7SnKpfuBKj9r7jCxxh0gjOCgw2CZr00khJw9eIU');

const Index = (props: { stripePromise: any; }) => {
    const { stripePromise } = props;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent")
            .then((res) => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret));
    }, []);

    return (
        // <Elements stripe={stripePromise}>
        //     <CheckoutForm />
        // </Elements>
        <>
            <h1>Payment</h1>
            {/* {clientSecret && stripePromise && ( */}
            {/* <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements> */}
            {/* )} */}
        </>
    );
}

export default Index