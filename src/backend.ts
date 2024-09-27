import { FirebaseError, FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthCredential,
  UserCredential,
} from "firebase/auth";

const options: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(options);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export class SignInResult {
  constructor(
    public readonly userCredential: UserCredential,
    public readonly authCredential: OAuthCredential | null
  ) {}
}

export class SignInError {
  constructor(
    public readonly error: FirebaseError,
    public readonly authCredential: OAuthCredential | null
  ) {}
}

export class SignOutError {
  constructor(public readonly error: FirebaseError) {}
}

export async function signIn() {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const authCredential =
      GoogleAuthProvider.credentialFromResult(userCredential);
    return new SignInResult(userCredential, authCredential);
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) return new Error("Unable to sign in.");
    const error = e as FirebaseError;
    const credential = GoogleAuthProvider.credentialFromError(error);
    throw new SignInError(error, credential);
  }
}

export async function signOut() {
  try {
    await signOut();
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) return new Error("Unable to sign out.");
    const error = e as FirebaseError;
    return new SignOutError(error);
  }
}
