import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../config/firebase-config";
import { useDateHook } from "../hooks/dateHook";
import { AuthContext } from "./AuthContext";

export const InfoUserContext = createContext()

export const InfoUserContextProvider = ({ children }) => {
    const date = useDateHook()

    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const { nom, prenom, level, isRegisted } = user

    async function getUserData() {

        if (currentUser.uid) {
            const colRef = doc(db, 'users', currentUser.uid)
            const user = await getDoc(colRef)
            if (user.exists()) {
                const userData = user.data()
                setUser(userData)
            }
        }
    }

    useEffect(() => {
        getUserData()

    }, [])

    const timeStampLimitPaiement = Date.now() + 600000 



    // when the 'Valider l'inscription' button is clicked, update the userRegisted

    const updateUserInfo = async () => {
        const userInfo = doc(db, "users", currentUser.uid);
        await updateDoc(userInfo, {
            isRegisted: true,
            dateInscription: date,
            timeStampLimitPaiement
        })

    }

    return (
        <InfoUserContext.Provider value={{ nom, prenom, level, updateUserInfo, isRegisted, currentUser }}>
            {children}
        </InfoUserContext.Provider>
    )
}