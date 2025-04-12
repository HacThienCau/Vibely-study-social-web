const express = require('express');
const router = express.Router();
const { generateToken04 } = require('../utils/zeroServerAssistant');

router.get('/zego-token', (req, res) => {
    try {
        const { userID, roomID, callerId, receiverId } = req.query;
        const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
        const effectiveTimeInSeconds = 3600;

        console.log("Generating token with:", {
            userID,
            roomID,
            callerId,
            receiverId,
            appID,
            hasServerSecret: !!serverSecret
        });

        if (!userID) {
            return res.status(400).json({
                error: "Missing userID parameter"
            });
        }

        if (!appID) {
            return res.status(400).json({
                error: "Missing ZEGO_APP_ID environment variable"
            });
        }

        if (!serverSecret) {
            return res.status(400).json({
                error: "Missing ZEGO_SERVER_SECRET environment variable"
            });
        }

        const token = generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds);
        res.json({ token, appID });
    } catch (error) {
        console.error("Error generating Zego token:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;