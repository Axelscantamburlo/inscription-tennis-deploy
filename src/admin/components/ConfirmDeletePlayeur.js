import axios from 'axios';
import { collection, doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase-config';
import { AllDataSchedules } from '../../context/AllDataSchedules';
import { useGetDatas } from '../../hooks/useGetDatas';


const ConfirmDeletePlayeur = ({ playeurClick, setShowConfirmDeletePlayeur, index, id, arrayUsersRegister, setIsScheduleClicked }) => {
    const { loadData, data } = useContext(AllDataSchedules)

    const closeModal = () => {
        setShowConfirmDeletePlayeur(false)

    }

    const [scheduleClicked, setScheduleClicked] = useState({})

    const { day, startHour, endHour, usersRegisted } = scheduleClicked

    useEffect(() => {
        axios.get(`https://inscription-colomiers-tennis.herokuapp.com/api/get/${id}`)
            .then((response) =>
                setScheduleClicked(response.data[0]))
    }, [id, usersRegisted])



    const confirmDeletePlayeur = () => {
        const newArr = arrayUsersRegister.splice(index, 1)
        const newUsersRegister = arrayUsersRegister.length === 0 ? null : arrayUsersRegister.toString() + ','

        axios.put(`https://inscription-colomiers-tennis.herokuapp.com/api/update/${id}`, {
            ...scheduleClicked,
            usersRegisted: newUsersRegister

        }).catch((err) => toast.error(err.response.data), { hideProgressBar: true })
        toast.success(`${playeurClick} a bien été supprimé du créneau`)
        setShowConfirmDeletePlayeur(false)
        setIsScheduleClicked(false)
        setTimeout(() => loadData(), 500)
        updateUserInFirebase()
    }


    const colref = collection(db, 'users')
    const allUsers = useGetDatas(colref)

    async function updateUserInFirebase() {
        const user = allUsers.filter((el) => el.nom === playeurClick)

        const userInfo = doc(db, "users", user[0].id);
        await updateDoc(userInfo, {
            isRegisted: false,
            hasPayed: false,
            dateInscription: '',
            datePaiement: '',
            howManyTimePaiement: "",
            timeStampLimitPaiement: 0,
            typePaiement: ''
        })
    }


    return (
        <div className="confirm-modal-container center">
            <div className='container-confirm-modal'>
                <h1 className='h1-title' style={{ fontSize: "25px" }}>Retirer un Joueur</h1>

                <div className="text" style={{ marginTop: "40px" }}>
                    <h4>Êtes-vous certain de vouloir retirer <span>{playeurClick}</span> le {day} de {startHour} à {endHour} </h4>
                </div>
                <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

                <div className="buttons">
                    <div className="cancel-button">
                        <button onClick={closeModal}>Annuler</button>
                    </div>
                    <div className="confirm-button">
                        <button onClick={confirmDeletePlayeur}>Confirmer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeletePlayeur;