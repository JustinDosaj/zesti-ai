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
const OpenAI = require('openai');

initializeApp();

exports.detectNewURLRecipe = onDocumentCreated("users/{userId}/recipes/{documentId}", async (event) => {
    
    const userId = event.params.userId;
    const documentId = event.params.documentId;
    const userRef = getFirestore().collection("users").doc(userId);
    const pageRef = userRef.collection('recipes').doc(documentId)
    const openai = new OpenAI({apiKey:"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"}) 

    try {
        await getFirestore().runTransaction(async (transaction) => {
            
            const recipeDoc = await transaction.get(pageRef);
            const userDoc = await transaction.get(userRef)
            const recipeData = recipeDoc.data();

            if (!userDoc.exists || !recipeDoc.exists) {
                console.error(`Error: either ${userId} does not exist or ${documentId} does not exist`);
                return;
            }

            if (recipeData.complete == false || !recipeData.complete) {

                const completion = await openai.chat.completions.create({
                    messages: [{ role: "system", content: "Given all the text from a webpage containing a recipe, provide the following fields in a JSON dict, where applicable: \"name\": (name of recipe), \"time\": (total time to make recipe, eg. 10), \"servings\": (total servings recipe provides, eg. 4), \"description\": (create one sentence description of recipe), \"ingredients\": (list of ingredients excluding recommended ingredients, eg. 1/4 Cup of Honey), \"instructions\": (list of instructions, eg. Preheat oven to 450 degrees fahrenheit), \"recommendations\": (list of 3 possible recipe improvements gathered from reviews | Filter out bad reviews)"},
                    {role:"user", content: recipeData.rawData}],
                    model: "ft:gpt-3.5-turbo-0613:vurge-corp::89eapevQ",
                  });
                transaction.update(pageRef, {
                    complete: true,
                    data: completion.choices[0],
                });
                console.log(`Completed scan for ${documentId}`);
            } 
            else {
                console.error(`${documentId} scan has already been run`);
            }
        });
    } catch(error) {

    }
})

// Detect new page added by user
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