import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { InfoUserContext } from '../context/InfoUserContext';

const ConfirmInscriptionModal = ({ setConfirmModal, dataScheduleDropped1, dataScheduleDropped2, dataScheduleDropped3, chooseFormule }) => {
    // navigation 
    const navigate = useNavigate()

    // date of the day



    // get the nom, prenom, level of the user connected thank's to the context

    const { nom, updateUserInfo } = useContext(InfoUserContext)

    //  add inscription 
    const addInscription = (currentId) => {
        console.log('ca c joué', currentId);
        axios.get(`https://inscription-tennis.herokuapp.com/api/get/${currentId}`)
            .then((response) => {
                updateDatabase(response.data[0])
            }
            )
        setConfirmModal(false)

    }

    const [priceToPay, setPriceToPay] = useState('')
 
    function findPriceToPay() {
        const { level } = dataScheduleDropped1
        console.log(level);

        if (level === "baby") {
            setPriceToPay("122 €")

        } else if (level === "mini") {
            if (chooseFormule === "1h par semaine") {
                setPriceToPay("163 €")
            } else {
                setPriceToPay("265 €")
            }
        } else if (level === "violet" || level === "rouge" || level === "orange" || level === "vert") {
            if (chooseFormule === "1h par semaine") {
                setPriceToPay("168 €")
            } else {
                setPriceToPay("280 €")
            }
        } else if (level === "jaune 1" || level === "jaune 2" || level === "jaune 3" || level === "jaune 4" || level === "jaune 2/3/4") {
            if (chooseFormule === "1h par semaine") {
                setPriceToPay("178 €")
            } else if (chooseFormule === "2h par semaine") {
                setPriceToPay("316 €")
            } else if (chooseFormule === "forme jouée 2h par semaine") {
                setPriceToPay("280 €")
            } else {
                setPriceToPay("428 €")
            }
        }
    }
    useEffect(() => {
        findPriceToPay()
    }, [])



    // update database when inscription is confirmed

    const updateDatabase = (data) => {
        const { numberOfPlaces, usersRegisted, id } = data
        const user = usersRegisted

        const array = user !== null ? user.split(",") : null;

        if (array === null || array.length <= numberOfPlaces) {
            axios.put(`https://inscription-tennis.herokuapp.com/api/update/${id}`, {
                ...data,
                usersRegisted: usersRegisted === null ? nom + "," : usersRegisted + nom + ","
            }).catch((err) => toast.error(err.response.data), { hideProgressBar: true })
            toast.success("Votre inscription a bien été prise en compte ✅", { autoClose: 10000, hideProgressBar: true })
            navigate("/")
        } else {
            toast.error("Désolé cette place vient d'être prise. Vous allez être redirigé automatiquement.", { autoClose: 10000, hideProgressBar: true })
            setTimeout(() => window.location = document.location, 5000)
        }
    }


    const clickedConfirmButton = () => {
        if (window.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription") {
            addInscription(dataScheduleDropped1.id)
            updateUserInfo()

        } else if (window.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription/deuxieme-heure") {
            addInscription(dataScheduleDropped1.id)
            addInscription(dataScheduleDropped2.id)
            updateUserInfo()

        } else if (window.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription/deuxieme-heure/troisieme-heure") {
            addInscription(dataScheduleDropped1.id)
            addInscription(dataScheduleDropped2.id)
            addInscription(dataScheduleDropped3.id)
            updateUserInfo()

        }
    }

    //  close modal when cancel button is clicked

    const closeModal = () => {
        setConfirmModal(false)
    }

    return (
        <div className='container-confirm-modal'>
            <div className="text">
                {dataScheduleDropped2 === undefined ? (
                    <h4>Êtes-vous certain de vouloir vous inscrire le <span>{dataScheduleDropped1.day} de {dataScheduleDropped1.startHour} à {dataScheduleDropped1.endHour}</span> ?</h4>
                ) : dataScheduleDropped3 === undefined ? (
                    <h4>Êtes-vous certain de vouloir vous inscrire le <span>{dataScheduleDropped1.day} de {dataScheduleDropped1.startHour} à {dataScheduleDropped1.endHour}</span> et le <span>{dataScheduleDropped2.day} de {dataScheduleDropped2.startHour} à {dataScheduleDropped2.endHour}</span> ?</h4>
                ) : (
                    <h4>Êtes-vous certain de vouloir vous inscrire le <span>{dataScheduleDropped1.day} de {dataScheduleDropped1.startHour} à {dataScheduleDropped1.endHour}</span>,
                        le <span>{dataScheduleDropped2.day} de {dataScheduleDropped2.startHour} à {dataScheduleDropped3.endHour}</span> et le <span>{dataScheduleDropped3.day} de {dataScheduleDropped3.startHour} à {dataScheduleDropped3.endHour}</span></h4>

                )}
                <h4>Ce choix sera définitif et <span className='span-2'>aucun changement ne pourra être éfféctué.</span></h4>
            </div>
            <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

            <div className="buttons">
                <div className="cancel-button">
                    <button onClick={closeModal}>Annuler</button>
                </div>
                <div className="confirm-button">
                    <button onClick={clickedConfirmButton}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmInscriptionModal;