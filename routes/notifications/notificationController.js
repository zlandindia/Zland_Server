const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const express = require("express");
const router = express.Router();
const Token = require("../../models/notifications.models")


router.post("/sendNotification", async (req, res) => {
    const { title, body } = req.body;
    // Getting All Tokens
    async function getAllTokens() {
        return await Token.find({}).then((result, error) => {
            lengthOfTokens = result.length;
            allTokens = [];
            for (let i = 0; i < result.length; i++) {
                allTokens.push(result[i].token)
            }
            return allTokens;
        })
    }
    // End Getting All Tokens
    // let somePushTokens = await getAllTokens()
    let somePushTokens = ["ExponentPushToken[CGEEc-KuGlVbP_02DVSHX3]"];
    let messages = [];
    for (let pushToken of somePushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }
        messages.push({
            to: pushToken,
            sound: 'default',
            title: title,
            body: body,
        })
    }

    let chunks = expo.chunkPushNotifications(messages);

    async function getIds(chunks) {
        let tickets = [];
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
        return tickets;
    }

    let tickets = await getIds(chunks);


    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    console.log(receiptIds);

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);
                for (let receiptId in receipts) {
                    let { status, message, details } = receipts[receiptId];
                    if (status === 'ok') {
                        continue;
                    } else if (status === 'error') {
                        console.error(
                            `There was an error sending a notification: ${message}`
                        );
                        if (details && details.error) {
                            console.error(`The error code is ${details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();

    res.status(200).json("Success")
});


router.post("/AddToken", async (req, res) => {
    try {
        const { token } = req.body;

        // user Existence check
        async function TokenExistence(token) {
            const existingToken = await Token.findOne({ token: token });
            if (existingToken === null) {
                return false;
            }
            return true;
        }

        const existingToken = await TokenExistence(token);

        if (existingToken) {
            console.log("token already exist");
            res.status(400).json("token already exist");
        }

        if (!existingToken) {
            const newToken = new Token({ token });
            newToken.save().then(() => { res.status(200).json("Token saved"); }).catch(() => { res.status(400).json("Something went wrong"); });
        }
    }
    catch { res.status(400).json("Something went wrong"); }
});





module.exports = router;