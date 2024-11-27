import firebase from "firebase";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCXvXPeoUVuLb1iGHdaYjxXELifCu9mr2Y",
    authDomain: "cafeconnect-1fa5b.firebaseapp.com",
    projectId: "cafeconnect-1fa5b",
    storageBucket: "cafeconnect-1fa5b.firebasestorage.app",
    messagingSenderId: "576294222180",
    appId: "1:576294222180:web:452556ff80a66e0db2e271",
    measurementId: "G-FC6SWTFYXT"
};

// firebase app 초기화
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase message 가져오기
const firebaseMessaging = firebaseApp.messaging();

// 실행되는 순서가 중요하므로 await로 기다린다. await사용하는 함수에는 async를 써야한다.
// ServiceWorker 등록하기
export async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker 등록 성공:", registration);
    } catch (error) {
        console.log("Service Worker 등록 실패:", error);
    }
}

// fcm 토큰과 알람 Jotai로 저장
export function firebaseReqPermission(setFcmToken, setAlarm) {
    firebaseMessaging
    .requestPermission()
    .then(()=>{
        // firebase로부터 토큰 얻어오기
        return firebaseMessaging.getToken();
    })
    .then(function(token) {
        console.log(token);
        // 얻어온 토큰 Jotai에 저장
        setFcmToken(token);
    })
    .catch(function(error) {
        console.log("FCM ERROR:", error);
    });

    firebaseMessaging.onMessage((payload)=>{
        console.log(payload);
        // firebase를 통해 데이터베이스에서 얻어온 알람 Jotai에 저장
        setAlarm({
            alarmNum:+payload.data.alarmNum,
            storeCode:+payload.data.storeCode,
            alarmType:payload.data.alarmType,
            alarmContent:payload.data.alarmContent,
            alarmDate:payload.data.alarmDate,
        });
    });
}