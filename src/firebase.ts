import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNFnG3ReA76bVmJvrWfBVWC-amIQ5cqks",
  authDomain: "project-clone-d291a.firebaseapp.com",
  databaseURL:
    "https://project-clone-d291a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-clone-d291a",
  storageBucket: "project-clone-d291a.appspot.com",
  messagingSenderId: "967035871012",
  appId: "1:967035871012:web:d2c0d7b2337fd6c889ddb1",
  measurementId: "G-NN1GTREE8N",
};

const app = initializeApp(firebaseConfig);

export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdVK00gAAAAAGG-7O2zJvmqUv8vTr5qqlnEzt_P"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);

export const db = getFirestore(app);
