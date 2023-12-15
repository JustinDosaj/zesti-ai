import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';


interface CheckoutSessionData {
    price: string | undefined;
    success_url: string;
    cancel_url: string;
    mode: string;
    clientReferenceId?: string; // Make sure this line is included
}

export async function createPremiumCheckoutSession(id: any) {  // You might want to replace 'any' with the appropriate type for currentUser

    try {
        const checkoutSessionData: CheckoutSessionData  = {
            price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE,
            success_url: `${window.location.origin}/dashboard`,
            cancel_url: `${window.location.origin}/dashboard`,
            mode: "subscription",
        };

        if (window.Rewardful?.referral) {
            checkoutSessionData.clientReferenceId = window.Rewardful.referral;
        }


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
