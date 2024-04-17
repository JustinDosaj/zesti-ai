import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getCookie } from '../handler/cookies';
import Stripe from 'stripe'


/**
 * referral code not in use -- removed from ln 36-39
 * add back when promotekit affiliate program is added back
 * Maybe add back ln 30 with affiliateCode cookie retrieval - thoughh this could actually break the affiliate program
 */

interface CheckoutSessionData {
    price: string | undefined;
    success_url: string;
    cancel_url: string;
    mode: string;
    clientReferenceId?: string;
    
    // Removed metadata from checkout session while affiliate program is not in use
    /*metadata?: {
        promotekit_referral: string,
    }*/
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);

export async function createPremiumCheckoutSession(id: any) {  // You might want to replace 'any' with the appropriate type for currentUser

   // const affiliateCode = getCookie('promotekit_referral') || 'default-value';

    try {
        const checkoutSessionData: CheckoutSessionData  = {
            price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE,
            success_url: `${window.location.origin}/account`,
            cancel_url: `${window.location.origin}`,
            mode: "subscription",
            /*metadata: {
                //promotekit_referral: window.promotekit_referral || 'default-value'
                promotekit_referral: affiliateCode
            }*/
        };
   
        const checkoutSessionsCollection = collection(doc(collection(db, 'users'), id), 'checkout_sessions');
        const docRef = await addDoc(checkoutSessionsCollection, checkoutSessionData);


        onSnapshot(docRef, (snap) => {
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
        });
    } catch (error) {
        console.error("Error creating checkout session: ", error);
    }
}
