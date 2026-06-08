import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
}

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getApp(): FirebaseApp {
  if (!app) {
    app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getAuthInstance(): Auth | null {
  if (!isFirebaseConfigured()) return null;
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

export function getDbInstance(): Firestore | null {
  if (!isFirebaseConfigured()) return null;
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

export function getStorageInstance(): FirebaseStorage | null {
  if (!isFirebaseConfigured()) return null;
  if (!_storage) _storage = getStorage(getApp());
  return _storage;
}
