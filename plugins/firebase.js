'use server'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()?.public || {}


    const firebaseConfig = {
        apiKey: config.firebaseApiKey,
        authDomain: config.firebaseAuthdomain,
        projectId: config.firebaseProjectId,
        storageBucket: config.firebaseStorageBucket,
        messagingSenderId: config.firebaseMessagingSenderId,
        appId: config.firebaseAppId,
        measurementId: config.firebaseMeasurementId
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app);

    return {
        provide: {
            auth,
            db,
            storage,
        }
    }
})