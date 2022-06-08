import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { auth, db } from "../firebase";

interface authProps {
  email: string;
  password: string;
}

export interface contextProps {
  signUp: ({ email, password }: authProps) => void;
  signIn: ({ email, password }: authProps) => void;
  logOut: () => Promise<void>;
  user: User | null;
}

interface providerProp {
  children: React.ReactNode;
}

const AuthContext = createContext<Partial<contextProps>>({});

export const AuthContextProvider: React.FC<providerProp> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // const signUp = async ({ email, password }: authProps) => {
  //   try {
  //     const UserCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     const emailcred = UserCredential.user.email as string;

  //     await setDoc(doc(db, "users", emailcred), {
  //       savedShows: [],
  //     });

  //     return UserCredential;
  //   } catch (error) {
  //     if (error instanceof FirebaseError) {
  //       throw error.message;
  //     }
  //     return null;
  //   }
  // };

  function signUp({ email, password }: authProps) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }

  // async function signIn({ email, password }: authProps) {
  //   try {
  //     const UserCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     return UserCredential;
  //   } catch (error) {
  //     if (error instanceof FirebaseError) {
  //       throw error.message;
  //     }
  //     return null;
  //   }
  // }

  function signIn({ email, password }: authProps) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (curentUser) => {
      setUser(curentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
