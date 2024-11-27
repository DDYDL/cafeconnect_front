importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCXvXPeoUVuLb1iGHdaYjxXELifCu9mr2Y",
    authDomain: "cafeconnect-1fa5b.firebaseapp.com",
    projectId: "cafeconnect-1fa5b",
    storageBucket: "cafeconnect-1fa5b.firebasestorage.app",
    messagingSenderId: "576294222180",
    appId: "1:576294222180:web:452556ff80a66e0db2e271",
    measurementId: "G-FC6SWTFYXT"
});

// firebase message 가져오기
const messaging = firebase.messaging();

// app이 켜져있지 않을 때 background에서 message 실행
messaging.onBackgroundMessage((payload)=>{
    // 권한 체크
    if(!(self.Notification && self.Notification.permission === 'granted'))
        return;

    console.log("Background Message:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body:payload.notification.body
    };
    self.ServiceWorkerRegistration.showNotification(notificationTitle, notificationOptions);
})
