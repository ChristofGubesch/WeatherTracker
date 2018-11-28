import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const cors = require('cors')({origin:true});

export const getCounter = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      const code = req.query.code;
      console.log(code);
      admin.firestore().collection('cities').where('code', '==', code)
          .get()
          .then(snap => {
              snap.forEach(doc => {
                console.log(doc);
                 return res.json(doc.data());
              })
          })
          .catch(err => {
              console.log(err);
          })
    })

})