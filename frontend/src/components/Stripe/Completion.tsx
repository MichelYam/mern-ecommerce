import {useEffect, useState} from 'react';

function Completion(props: { stripePromise: any; }) {
  const [ messageBody, setMessageBody ] = useState<any>('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe: { retrievePaymentIntent: (arg0: string | null) => PromiseLike<{ error: any; paymentIntent: any; }> | { error: any; paymentIntent: any; }; }) => {
      const url = new URL(window.location as any);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
       <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;