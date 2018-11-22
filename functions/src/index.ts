import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
// response.send("Hello from Firebase!");
// });
admin.initializeApp();

/* interface City {
  id?: string;
  name: string;
  code: string;
  count?: number;
}


export const getAll = functions.https.onRequest(async(req, response) => {
  
  const cities: City[] = [];

  await admin.firestore().collection('cities').get().then((snap) => {
    snap.forEach(doc => {
        let city: City;
        city.code = doc.data().code;
        city.name = doc.data().name;
        city.count = doc.data().count;
        city.id = doc.id;
        cities.push(city);
    });
  });
    return response.send(JSON.stringify(cities));
}); */

//export const notification = functions.firestore.document('cities').onCreate((snap, context) => {
  const nodemailer = require('nodemailer');
  // Configure the email transport using the default SMTP transport and a GMail account.
  // For Gmail, enable these:
  // 1. https://www.google.com/settings/security/lesssecureapps
  // 2. https://accounts.google.com/DisplayUnlockCaptcha
  // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
  // TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
  /*const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });**/
  
  const APP_NAME = 'WeatherTracker';

  exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    'use strict';
    const mailer = require('nodemailer');
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    mailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        const transporter = mailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        const mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    });

  /*function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email,
    };
  
    // The user subscribed to the newsletter.
    // mailOptions.subject = `Welcome to ${APP_NAME}!`;
    // mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    return mailTransport.sendMail(mailOptions);
  }
*/