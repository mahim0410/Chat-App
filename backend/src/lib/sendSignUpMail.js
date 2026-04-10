import { MailtrapClient } from "mailtrap";

const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_API_KEY,
});

function sendSignUpMail(recipientEmail) {

    mailtrap
        .send({
            from: { name: "Chat App", email: "hello@demomailtrap.co" },
            to: [{ email: recipientEmail }],
            subject: "Chat App SignUp",
            text: "Thank you for signing up for our Chat App! We're excited to have you on board.",
        })
        .then(console.log)
        .catch(console.error);

}

export default sendSignUpMail;