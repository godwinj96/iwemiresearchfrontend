import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../Context/GlobalState';

const stripePromise = loadStripe('pk_test_51Pl654BtS3lVeLJEYpzqhlEkp4B9qmaX8ch4gJDslvwEm0kTw06sOZJ9Pc9J0VlC2wP2hiFqa0R43nHcXCwLFQWW00QtE9aDAU');

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Get the client secret from your backend
        axios.post('https://api.iwemiresearch.org/api/create-payment-intent/', {
            amount: 100,  // Replace with your dynamic amount
            currency: 'ngn'
        }).then((response) => {
            setClientSecret(response.data.clientSecret);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            },
        });

        if (error) {
            console.error('Error:', error);
        } else if (paymentIntent.status === 'succeeded') {
            // Handle successful payment here
            navigate('/payment-success');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay Now</button>
        </form>
    );
};

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default PaymentPage;
