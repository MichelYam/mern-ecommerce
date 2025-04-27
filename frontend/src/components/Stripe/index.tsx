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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

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