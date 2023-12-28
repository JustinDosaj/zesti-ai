import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import axios from 'axios';
import Stripe from 'stripe'

declare global {
    interface Window {
      promotekit_referral?: string;
    }
  }

interface CheckoutSessionData {
    price: string | undefined;
    success_url: string;
    cancel_url: string;
    mode: string;
    clientReferenceId?: string; // Make sure this line is included
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);

export async function createPremiumCheckoutSession(id: any) {  // You might want to replace 'any' with the appropriate type for currentUser

    try {
        const checkoutSessionData: CheckoutSessionData  = {
            price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE,
            success_url: `${window.location.origin}/dashboard`,
            cancel_url: `${window.location.origin}/dashboard`,
            mode: "subscription",
        };

        // FINISH PROMOTE KIT REFERRAL LATER WHEN I CAN DEPLOY TO PRODUCTION
        const referralId = window.promotekit_referral || 'justin2';
        

        // Getting meta data passed to checkout session in stripe --> however referral id is set to default value from global
        // could be because the stripe tag is not on the page therefore the referral isnt being recognized
        const session = await stripe.checkout.sessions.create({
            success_url: `${window.location.origin}/dashboard`,
            cancel_url: `${window.location.origin}/dashboard`,
            metadata: {
                promotekit_referral: window.promotekit_referral || 'default-value'
            },
            line_items: [
            {price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE, quantity: 1},
            ],
            mode: 'subscription',
        });
   
        const checkoutSessionsCollection = collection(doc(collection(db, 'users'), id), 'checkout_sessions');
        const docRef = await addDoc(checkoutSessionsCollection, checkoutSessionData);


        /*onSnapshot(docRef, (snap) => {
            const data = snap.data();
            if (data) {
                const { error, url } = data;
                if (error) {
                    // Show an error to your customer and inspect your Cloud Function logs in the Firebase console.
                    alert(`An error occurred: ${error.message}`);
                }
                if (url) {
                    // We have a Stripe Checkout URL, let's redirect.
                    window.location.assign(url)
                }
            }
        });*/
    } catch (error) {
        console.error("Error creating checkout session: ", error);
    }
}
