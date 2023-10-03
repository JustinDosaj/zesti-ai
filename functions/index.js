/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { logger } = require("firebase-functions");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { launch } = require('puppeteer');

initializeApp();

// Deducts Tokens when new page is added by user
/*exports.deductTokensOnNewPage = onDocumentCreated("users/{userId}/pages/{documentId}", async (event) => {

    //PARAMS CAUSING ERROR: IT IS UNDEFINED -- MAYBE JUST context.userId?
    const userId = event.params.userId;

    const userRef = getFirestore().collection("users").doc(userId);

    try {
        await getFirestore().runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);

            if (!userDoc.exists) {
                console.error("User does not exist:", userId);
                return;
            }

            const userData = userDoc.data();

            if (userData.tokens && userData.tokens >= 10) {
                transaction.update(userRef, {
                    tokens: userData.tokens - 10
                });
                console.log(`Deducted 10 tokens from user ${userId}`);
            } else {
                console.error(`User ${userId} does not have enough tokens`);
            }
        });
    } catch (error) {
        console.error("Transaction failure:", error);
    }

});*/

// Detect new page added by user
exports.testDetect = onDocumentCreated("users/{userId}/pages/{documentId}", async (event) => {

    const userId = event.params.userId;
    const documentId = event.params.documentId;
    const userRef = getFirestore().collection("users").doc(userId);
    const pageRef = userRef.collection('pages').doc(documentId)

    try {
        await getFirestore().runTransaction(async (transaction) => {
            const pageDoc = await transaction.get(pageRef);
            const userDoc = await transaction.get(userRef)

            if (!userDoc.exists || !pageDoc.exists) {
                console.error(`Error: either ${userId} does not exist or ${documentId} does not exist`);
                return;
            }
            const pageData = pageDoc.data();

            if (pageData.complete == false || !pageData.complete) {
                transaction.update(pageRef, {
                    complete: true,
                    data: textContent,
                });
                console.log(`Completed scan for ${documentId}`);
            } else {
                console.error(`${documentId} scan has already been run`);
            }
        });
    } catch (error) {
        console.error("Transaction failure:", error);
    }
});
// Store page with {"complete": false, {"permission_granted": true}}
// onDetect -> scrape webpage --> send data to chatgpt model --> store response
// onDetectComplete -> deductTokens()
