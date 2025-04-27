import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod, StripeError } from '@stripe/stripe-js';
import { useState } from 'react';
import { useAppSelector } from '../../redux/store';
// import { useGetUserQuery } from '../../redux/api/api';
import { useGetUserQuery } from '../../redux/api/userApi';

interface IPaymentMethod {
    error?: StripeError | undefined;
    paymentMethod?: PaymentMethod | undefined;
}

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserQuery("")

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    // const [formFields, setFormFields] = useState();
    //     // const handleSubmit = async (event: React.FormEvent) => {
    //     //     event.preventDefault()
    //     //     // if (!stripe || !elements) {
    //     //     //     // Stripe.js has not yet loaded.
    //     //     //     return;
    //     //     // }
    //     //     // const { error, paymentMethod }: IPaymentMethod = await stripe?.createPaymentMethod({
    //     //     //     type: "card",
    //     //     //     card: elements.getElement(CardElement),
    //     //     // });
    //     //     // if (!error) {
    //     //     //     console.log("token Generere", paymentMethod)
    //     //     // }

    //     //     const payElement = elements?.getElement(CardElement);

    //     //     if (!payElement || !stripe) {
    //     //         return;
    //     //     }

    //     //     const result = await stripe.createPaymentMethod({
    //     //         type: "card",
    //     //         card: payElement,
    //     //     });
    //     //     if (!result.error) {
    //     //         console.log("token Generere", result.paymentMethod)
    //     //     }
    //     // }

    //     const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        //         event.preventDefault();

        //         if (elements == null) {
        //             return;
        //         }

        //         // Trigger form validation and wallet collection
        //         const { error: submitError }: any = await elements.submit();
        //         if (submitError) {
        //             // Show error to your customer
        //             setErrorMessage(submitError.message);
        //             return;
        //         }

        //         // Create the PaymentIntent and obtain clientSecret from your server endpoint
        //         const res = await fetch('/create-intent', {
        //             method: 'POST',
        //         });

        //         const { client_secret: clientSecret } = await res.json();

        //         const { error }: any = await stripe?.confirmPayment({
        //             //`Elements` instance that was used to create the Payment Element
        //             elements,
        //             clientSecret,
        //             confirmParams: {
        //                 return_url: 'https://example.com/order/123/complete',
        //             },
        //         });

        //         if (error) {
        //             // This point will only be reached if there is an immediate error when
        //             // confirming the payment. Show error to your customer (for example, payment
        //             // details incomplete)
        //             setErrorMessage(error.message);
        //         } else {
        //             // Your customer will be redirected to your `return_url`. For some payment
        //             // methods like iDEAL, your customer will be redirected to an intermediate
        //             // site first to authorize the payment, then redirected to the `return_url`.
        //         }
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // redirect to route thankyou
                return_url: 'http://localhost:3000/thankyou/',
                payment_method_data: {
                    billing_details: {
                        name: `${user?.firstName} ${user?.lastName} `,
                        email: user?.email,
                        phone: '7873679090',
                        address: {
                            line1: 'Example Building #129',
                            city: 'Carolina',
                            state: 'PR',
                            postal_code: '00987',
                            country: 'US'
                        }
                    }
                }
            },
        });

        setIsProcessingPayment(false);

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage &&
                <div className='text-pink-500 p-2
              rounded-md mt-2 bold bg-pink-100'
                >
                    {errorMessage}
                </div>}
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
            {/* Show error message to your customers */}
            {/* {errorMessage && <div>{errorMessage}</div>} */}
        </form>
    );

    //     // return (
    //     //     <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
    //     //         <CardElement
    //     //             options={{ hidePostalCode: true }}
    //     //         />
    //     //         {/* <PaymentElement /> */}
    //     //         <button type="submit" disabled={!stripe || !elements}>
    //     //             Pay
    //     //         </button>
    //     //     </form>
    //     // );
};

export default CheckoutForm;

// export default function CheckoutForm() {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [message, setMessage] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             // Stripe.js has not yet loaded.
//             // Make sure to disable form submission until Stripe.js has loaded.
//             return;
//         }

//         setIsLoading(true);

//         const { error }: any = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 // Make sure to change this to your payment completion page
//                 return_url: `${window.location.origin}/completion`,
//             },
//         });

//         // This point will only be reached if there is an immediate error when
//         // confirming the payment. Otherwise, your customer will be redirected to
//         // your `return_url`. For some payment methods like iDEAL, your customer will
//         // be redirected to an intermediate site first to authorize the payment, then
//         // redirected to the `return_url`.
//         if (error.type === "card_error" || error.type === "validation_error") {
//             setMessage(error.message);
//         } else {
//             setMessage("An unexpected error occured.");
//         }

//         setIsLoading(false);
//     }

//     return (
//         <form id="payment-form" onSubmit={handleSubmit}>
//             <LinkAuthenticationElement id="link-authentication-element"
//             // Access the email value like so:
//             // onChange={(event) => {
//             //  setEmail(event.value.email);
//             // }}
//             //
//             // Prefill the email field like so:
//             // options={{defaultValues: {email: 'foo@bar.com'}}}
//             />
//             <PaymentElement id="payment-element" />
//             <button disabled={isLoading || !stripe || !elements} id="submit">
//                 <span id="button-text">
//                     {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//                 </span>
//             </button>
//             {/* Show any error or success messages */}
//             {message && <div id="payment-message">{message}</div>}
//         </form>
//     )
// }