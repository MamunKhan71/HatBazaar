import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase.config'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
export const AuthContext = createContext(null)
export default function AuthProvider({ children }) {
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    const createUser = (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleAuthentication = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const githubAuthentication = () => {
        return signInWithPopup(auth, githubProvider)
    }
    const emailPassLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    console.log(user);
    const functions = { user, createUser, googleAuthentication, githubAuthentication, logOut, emailPassLogin }
    return (
        <AuthContext.Provider value={functions}>
            {children}
        </AuthContext.Provider>
    )
}
