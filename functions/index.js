/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const OpenAI = require('openai');
const admin = require('firebase-admin');
const fs = require('fs');
const axios = require('axios');
const { Deepgram } = require("@deepgram/sdk");

admin.initializeApp();
const bucket = admin.storage().bucket('gs://webnest-f4392.appspot.com');

exports.detectNewURLRecipe = onDocumentCreated("users/{userId}/recipes/{documentId}", async (event) => {
    
    //Get Params
    const userId = event.params.userId;
    const documentId = event.params.documentId;

    //Get References
    const userRef = getFirestore().collection("users").doc(userId);
    const recipeCollectionRef = getFirestore().collection("recipes");
    const pageRef = userRef.collection('recipes').doc(documentId)

    // Get APIs
    const openai = new OpenAI({apiKey:"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"})
    const deepgram = new Deepgram("84fddc285194f0c6cf773002c6ac40d465448504");

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
                    
                const filePath = `mp3/${recipeData.url_id}.mp3`;
                const tempFilePath = `/tmp/${recipeData.url_id}.mp3`;
            
                await bucket.file(filePath).download({destination: tempFilePath});
                
                // Check if the file was downloaded successfully
                if (!fs.existsSync(tempFilePath)) {
                    console.error(`File not found at ${tempFilePath}`);
                    return;
                }
                
                // 2. Send the retrieved .mp3 file to the Whisper API
                const audio = fs.readFileSync(tempFilePath);

                await deepgram.transcription
                    .preRecorded({ buffer: audio, mimetype: "audio/mp3" }, { // <-- Assuming it's an MP3. Change if different.
                        smart_format: true,
                        model: "nova",
                    })
                    .then(async (response) => {
                        // Assuming the transcription result you want to save is in response.results.channels[0].alternatives[0].transcript
                        const transcript = response.results.channels[0].alternatives[0].transcript;

                        const completion = await openai.chat.completions.create({
                            messages: [{ role: "system", content: "Given all the text from a youtube video containing a recipe, provide the following fields in a JSON dict, where applicable: \"name\": (name of recipe), \"time\": (total time to make recipe, eg. 10), \"servings\": (total servings recipe provides, eg. 4), \"description\": (create one sentence description of recipe), \"ingredients\": (list of ingredients excluding recommended ingredients, eg. 1/4 Cup of Honey), \"instructions\": (list of instructions, eg. Preheat oven to 450 degrees fahrenheit)"},
                            {role:"user", content: transcript}],
                            model: "ft:gpt-3.5-turbo-0613:vurge-corp::89eapevQ",
                        });
                        
                        console.log(completion)

                        // Update Firestore with the transcript
                        transaction.update(pageRef, {
                            complete: true,
                            data: completion ? completion.choices[0] : null
                        });
                        transaction.set(recipeCollectionRef.doc(recipeData.url_id), {
                            data: completion ? completion.choices[0] : null,
                            rawData: transcript,
                        });
                    })
                    .catch((err) => {
                        console.error("Error with Deepgram:", err);
                    });
                
                    // Cleanup the temporary file
                    fs.unlinkSync(tempFilePath);
                    return;
                } 
                else {
                console.error(`${documentId} scan has already been run`);
            }
        });
    } catch(error) {
        console.error("Error")
    }
})

/*exports.processRawData = functions.firestore.document('users/{userID}/recipes/{recipeId}').onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Use the API key from environment configuration
    const openai = new OpenAI({apiKey:"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"})

    // Check if rawData exists in the new value but not in the previous value
    if (newValue.rawData && !previousValue.rawData) {
        const rawText = newValue.rawData.text; // Assuming the text is directly stored in rawData

        try {
            // Now, call the OpenAI API
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "Given all the text from a youtube video containing a recipe, provide the following fields in a JSON dict, where applicable: \"name\": (name of recipe), \"time\": (total time to make recipe, eg. 10), \"servings\": (total servings recipe provides, eg. 4), \"description\": (one sentence description of recipe), \"ingredients\": (list of ingredients excluding recommended ingredients), \"instructions\": (list of instructions)"
                    },
                    { role: "user", content: rawText }
                ],
                model: "ft:gpt-3.5-turbo-0613:vurge-corp::89eapevQ",
            });

            // Now, store the response back in Firestore
            await admin.firestore()
                .doc(`users/${context.params.userID}/recipes/${context.params.recipeId}`)
                .update({ data: completion.data });

        } catch (error) {
            console.error("Error processing raw data with OpenAI:", error);
            // Handle the error or rethrow as needed
        }
    }

    return null;
});*/

// Detect new page added by user


/*
const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Given all the text from a youtube video containing a recipe, provide the following fields in a JSON dict, where applicable: \"name\": (name of recipe), \"time\": (total time to make recipe, eg. 10), \"servings\": (total servings recipe provides, eg. 4), \"description\": (create one sentence description of recipe), \"ingredients\": (list of ingredients excluding recommended ingredients, eg. 1/4 Cup of Honey), \"instructions\": (list of instructions, eg. Preheat oven to 450 degrees fahrenheit)"},
    {role:"user", content: response.data.text}],
    model: "ft:gpt-3.5-turbo-0613:vurge-corp::89eapevQ",
});
transaction.update(pageRef, {
    complete: true,
    data: completion.choices[0],
});
*/ 


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