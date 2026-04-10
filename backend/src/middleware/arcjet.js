import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";


const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ],
        }),
        shield({ mode: "LIVE" }),
    ]
})

const arcjetProtection = async (req, res, next) => {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            res.status(429).json({ error: "Too Many Requests" });
            console.log(`ratelimited`);

        } else if (decision.reason.isBot()) {
            res.status(403).json({ error: "Bots not allowed" });
        } else {
            res.status(403).json({ error: "Forbidden" });
        }
    } else {

        next();

    }
};


export default arcjetProtection;