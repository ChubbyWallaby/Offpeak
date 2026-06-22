import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  let serviceAccount = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it's valid JSON.", e.message);
    }
  } else if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    let pk = process.env.FIREBASE_PRIVATE_KEY;
    // Strip surrounding quotes if the user accidentally included them
    pk = pk.replace(/^"|"$/g, "");
    // Replace literal \n with actual newlines
    pk = pk.replace(/\\n/g, "\n");
    
    serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: pk,
    };
  }

  try {
    if (serviceAccount) {
      return initializeApp({ credential: cert(serviceAccount) });
    }
    return initializeApp();
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error.message);
    return null;
  }
}

const adminApp = getAdminApp();
let adminDb = null;
let adminAuth = null;

try {
  if (adminApp) {
    adminDb = getFirestore(adminApp);
    adminAuth = getAuth(adminApp);
  }
} catch (error) {
  console.error("Firebase Admin Services Init Error:", error.message);
}

export { adminDb, adminAuth };
