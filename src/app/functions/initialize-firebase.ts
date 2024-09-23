import { initializeApp } from "firebase/app";
import { environment } from "src/environments/environment";

const firebaseConfig = {
  apiKey: environment.firebaseApiKey,
  authDomain: environment.firebaseAuthDomain,
  databaseURL: environment.firebaseDatabaseURL,
  projectId: environment.firebaseProjectId,
  storageBucket: environment.firebaseStorageBucket,
  messagingSenderId: environment.firebaseMessagingSenderId,
  appId: environment.firebaseAppId,
  measurementId: environment.firebaseMeasurementId
};

// Initialize Firebase.
export const app = initializeApp(firebaseConfig);