importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAU-J25Bn8UgHT9j0bItjfp-O4O8JY16Cg",
  authDomain: "fcm-earn-app.firebaseapp.com",
  projectId: "fcm-earn-app",
  storageBucket: "fcm-earn-app.firebasestorage.app",
  messagingSenderId: "124455440148",
  appId: "1:124455440148:web:5cce164cacfc5e4ab6bc01",
  measurementId: "G-QGK6978LQ0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
