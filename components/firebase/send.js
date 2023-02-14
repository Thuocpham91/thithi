const firebaseAdmin = require("firebase-admin");

const serviceAccount = require('../../real-estates-320712-firebase-adminsdk-rko83-8b81099ce0.json');

// const defaultAppConfig = {
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://real-estates-320712-default-rtdb.asia-southeast1.firebasedatabase.app"
// }

// // Initialize the default app
// firebaseAdmin.initializeApp(defaultAppConfig);

// async function pushNotiToSpecificDevices (message) {
//     return await firebaseAdmin.messaging().send(message);
// };

// async function pushNotiToDevice(fcmToken, data) {
//     try {
//         return await firebaseAdmin.messaging().sendToDevice(fcmToken, data);
//     } catch(error) {
//         console.log('fcmToken error: ', fcmToken);
//         console.log(error);
//         return;
//     }
// };

// async function pushNotiToManyDevices(message) {
//     try {
//         return await firebaseAdmin.messaging().sendMulticast(message);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const sendPushNotificationHelper = async (fcmToken, title, message, metadata) => {
//     const firebaseMessageData = {
//       token: fcmToken,
//       notification: {
//         title: title,
//         body: message
//       },
//       data: {
//         metadata: JSON.stringify({ ...metadata, title: title, body: message })
//       },
//       apns: {
//         payload: {
//           aps: {
//             badge: 1,
//             sound: 'default'
//           }
//         }
//       }
//     };
//   try {
//       return await pushNotiToSpecificDevices(firebaseMessageData);
//   } catch(error) {
//       console.log(error);
//   }
// };

// export const sendPushNotificationToDevice = async (fcmToken, title, message, metadata) => {
//     const firebaseMessageData = {
//         notification: {
//             title: title,
//             body: message
//         },
//         data: {
//           metadata: JSON.stringify({ ...metadata, title: title, body: message })
//         }
//     };

//     return await pushNotiToDevice(fcmToken, firebaseMessageData);
// }

// export const sendPushNotificationToManyDevices = async (fcmTokens, title, message, metadata) => {
//     const firebaseMessageData = {
//         tokens: fcmTokens,
//         notification: {
//             title: title,
//             body: message
//         },
//         data: {
//             metadata: JSON.stringify({ ...metadata, title: title, body: message})
//         },
//         apns: {
//             payload: {
//                 aps: {
//                     badge: 1,
//                     sound: 'default'
//                 }
//             }
//         }
//     };

//     try {
//         return await pushNotiToManyDevices(firebaseMessageData);
//     } catch (error) {
//         console.log(error);
//     }
// }

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
        .then(function(response) {
          console.log("Successfully sent message:", response);
          // if(response.results[0].error != undefined){
          //   console.log("error: " +response.results[0].error);
          // } else {
          //   console.log("fcm_token ok: " + fcm_token);
          // }
        })
        .catch(function(error) {
          console.log("Error sending message:", error.message);
      });
    } catch(error) {
      console.log(error);
    }
}