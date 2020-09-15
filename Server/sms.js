const accountSid = require("../Store/secrets").twilio_secrets.ACCOUNT_SID;
const authToken = require("../Store/secrets").twilio_secrets.AUTH_TOKEN;
const phone_number_from = require("../Store/secrets").twilio_secrets.PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

module.exports = {
    sendText: async function (to, body, mediaUrl=['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg']){
        const response = null;
        console.log("... sending message");
        client.messages
        .create({
            body: body,
            from: phone_number_from,
            mediaUrl: mediaUrl,
            to: to
        })
        .then((message) =>  { response = message.sid});
        return await response;
     }
 }
 console.log("...listening to message requests");
// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: phone_number_from,
//      mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
//      to: '+260972644552'
//    })
//   .then(message => console.log(message.sid));