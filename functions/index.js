/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
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
            const userData = userDoc.data();

            if (!userDoc.exists || !recipeDoc.exists) {
                console.error(`Error: either ${userId} does not exist or ${documentId} does not exist`);
                return;
            }

            // Download Video & Upload
            const options = {
                method: 'GET',
                url: 'https://youtube-mp310.p.rapidapi.com/download/mp3',
                params: {
                  url: recipeData.url
                },
                headers: {
                  'X-RapidAPI-Key': '2fffa4118fmsh3a9b118e2f8b730p14358djsn079fd7f6a771',
                  'X-RapidAPI-Host': 'youtube-mp310.p.rapidapi.com'
                },
                responseType: 'arraybuffer',
              };
            

            const response = await axios.request(options);
            const parsedData = JSON.parse(response.data.toString());
            
            let retries = 0;
            let maxRetries = 5;
            let mp3Blob;
            
            while(retries < maxRetries) {
                try {
                    const mp3Response = await axios.get(parsedData.downloadUrl, { responseType: 'arraybuffer' })
                    mp3Blob = mp3Response.data;
                    if(mp3Blob) break;

                } catch (err) { 
                    retries++
                    if(retries === maxRetries) { 
                        console.log("Max retires attempted") 
                        throw err;
                    }
                    console.log("Error getting mp3 response") 
                    await new Promise(res => setTimeout(res, 10000));
                }
            }

            const tempAudioPath = `/tmp/${recipeData.url_id}.mp3`;
            fs.writeFileSync(tempAudioPath, mp3Blob);
            await bucket.upload(tempAudioPath, {
                destination: `mp3/${recipeData.url_id}.mp3`,
                metadata: {
                    ContentType: 'audio/mp3'
                }
            });

            
            // Clean up the temporary file
            fs.unlinkSync(tempAudioPath);

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

                        // Update Firestore with the transcript
                        transaction.update(pageRef, {
                            complete: true,
                            data: completion ? completion.choices[0] : null
                        });
                        transaction.set(recipeCollectionRef.doc(recipeData.url_id), {
                            data: completion ? completion.choices[0] : null,
                            rawData: transcript,
                        });
                        transaction.update(userRef, {
                            tokens: userData.tokens - 10
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

exports.detectNewPayment = onDocumentCreated("users/{userId}/payments/{documentId}", async (event) => {
    //Get Params
    const userId = event.params.userId;
    const documentId = event.params.documentId;

    //Get References
    const userRef = getFirestore().collection("users").doc(userId);
    const pageRef = userRef.collection('payments').doc(documentId)

    try {
        await getFirestore().runTransaction(async (transaction) => { 
            
            const paymentDoc = await transaction.get(pageRef);
            const userDoc = await transaction.get(userRef)
            const paymentData = paymentDoc.data();

            if (!userDoc.exists || !paymentDoc.exists) {
                console.error(`Error: either ${userId} does not exist or ${documentId} does not exist`);
                return;
            }

            let tokensToAdd = 0;

            switch(paymentData.prices[0].path) {
                case 'products/prod_OqNq2NeOxy8xUS/prices/price_1O2h4ZGtkWdn4NzbF9sRI1pt':
                    tokensToAdd = 50;
                    break
                case 'products/prod_OqhPZzda86ZAaX/prices/price_1O300kGtkWdn4NzbM1ysXyXC':
                    tokensToAdd = 150;
                    break
                case 'products/prod_OqhTsJEmFMrzfb/prices/price_1O304tGtkWdn4NzbOrQt7EBE':
                    tokensToAdd = 300;
                    break
                default:
                    console.log("Error determing how many coins to add")
                    return;
            }

            transaction.update(userRef, {
                tokens: tokensToAdd
            });
        })
    } 
    catch (err) {
        console.log("error")
    }
})