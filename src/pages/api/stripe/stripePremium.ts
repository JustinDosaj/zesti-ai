import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Notify } from '@/components/shared/notify';

interface CheckoutSessionData {
    price: string | undefined;
    success_url: string;
    cancel_url: string;
    mode: string;
    clientReferenceId?: string;
    allow_promotion_codes?: boolean;
}

export async function createPremiumCheckoutSession(id: any) {  // You might want to replace 'any' with the appropriate type for currentUser

    try {
        const checkoutSessionData: CheckoutSessionData  = {
            price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE,
            success_url: `${window.location.origin}`,
            cancel_url: `${window.location.origin}`,
            mode: "subscription",
            allow_promotion_codes: true,
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
        Notify("Could not create checkout session. Please try again later.")
    }
}
