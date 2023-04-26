import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from './../../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    
    const createUser = (email,pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const userSignIn = (email,pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,pass)
    }

    const userSignOut = () =>{
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        createUser,
        userSignIn,
        userSignOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;