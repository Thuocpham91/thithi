const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('../../qh88-fa3f8-firebase-adminsdk-y8cw9-329e865dd7.json');

// Initialize Firebase
const defaultAppConfig = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
  // databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebaseAdmin.initializeApp(defaultAppConfig);



module.exports = async function(fcm_token, payload) {
  try {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 *24
    };
      
    await firebaseAdmin.messaging().sendToDevice(fcm_token, payload, options)
      .then(function(response) {})
      .catch(function(error) {
        console.log("Error sending message:", error.message);
    });
  } catch(error) {
    console.log(error);
  }
}