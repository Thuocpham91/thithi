const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('../../real-estates-320712-firebase-adminsdk-rko83-8b81099ce0.json');
const QH88service = require('../../qh88-fa3f8-firebase-adminsdk-y8cw9-329e865dd7.json');

// Initialize Firebase
const defaultAppConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const defaultAppQHH = {
  credential: firebaseAdmin.credential.cert(QH88service),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};

let fireOXbest = firebaseAdmin.initializeApp(defaultAppConfig, "Oxbest");

let fireQh = firebaseAdmin.initializeApp(defaultAppQHH, "QH88");


module.exports = async function (fcm_token, payload, appfirebase) {
  try {
    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };

    if (appfirebase == "QH88") {
      fireOXbest.auth();
      await fireOXbest.messaging().sendToDevice(fcm_token, payload, options)
        .then(function (response) {
          console.log(response)
         })
        .catch(function (error) {
          console.log("Error sending message:", error.message);
        });



    }else{
      fireQh.auth();
      await fireQh.messaging().sendToDevice(fcm_token, payload, options)
        .then(function (response) { 
          console.log(response)}
          )
        .catch(function (error) {
          console.log("Error sending message:", error.message);
        });


    }


  } catch (error) {
    console.log(error);
  }
}