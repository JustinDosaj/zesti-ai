import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function createBaseCheckoutSession(id: any) {  // You might want to replace 'any' with the appropriate type for currentUser
    try {
        const checkoutSessionsCollection = collection(doc(collection(db, 'users'), id), 'checkout_sessions');
        
        const docRef = await addDoc(checkoutSessionsCollection, {
            price: process.env.NEXT_PUBLIC_STRIPE_BASE_PRICE,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

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
                    window.location.assign(url);
                }
            }
        });
    } catch (error) {
        console.error("Error creating checkout session: ", error);
    }
}
