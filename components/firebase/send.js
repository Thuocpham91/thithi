const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('../../real-estates-320712-firebase-adminsdk-rko83-8b81099ce0.json');

const serviceQh = require('../../qh88-fa3f8-firebase-adminsdk-y8cw9-329e865dd7.json');


// Initialize Firebase
const defaultAppConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const defaultAppConfigQH = {
  credential: firebaseAdmin.credential.cert(serviceQh),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};
let firebaseOxbest= firebaseAdmin.initializeApp(defaultAppConfig,"Oxbest");
let firebaseOxQh =firebaseAdmin.initializeApp(defaultAppConfigQH,"QH");



module.exports = async function(fcm_token, payload,namefirebase) {
  try {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 *24
    };
      
    if(namefirebase=="QH88"){
      firebaseOxQh.auth();
      await firebaseOxQh.messaging().sendToDevice(fcm_token, payload, options)
      .then(function(response) {
        console.log(response)

      })
      .catch(function(error) {
        console.log(error)


      });

    }else{
      firebaseOxbest.auth();

      await firebaseOxbest.messaging().sendToDevice(fcm_token, payload, options)
      .then(function(response) {
        console.log(response)

      })
      .catch(function(error) {
        console.log(error)


      });

    }

  } catch(error) {
    console.log(error);
  }
}