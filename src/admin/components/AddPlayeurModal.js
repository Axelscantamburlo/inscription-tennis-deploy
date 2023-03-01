import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai"
import { toast } from 'react-toastify';
import { AllDataSchedules } from '../../context/AllDataSchedules';
import { db } from '../../config/firebase-config';
import { collection } from 'firebase/firestore';
import { useGetDatas } from '../../hooks/useGetDatas';

const AddPlayeurModal = ({ setShowAddPlayeurModal, id, setIsScheduleClicked }) => {
    
    const { loadData } = useContext(AllDataSchedules)


    const closeModal = () => {
        setShowAddPlayeurModal(false)

    }

    const [scheduleClicked, setScheduleClicked] = useState({})

    const { usersRegisted } = scheduleClicked

    useEffect(() => {
        axios.get(`https://inscription-colomiers-tennis.herokuapp.com/api/get/${id}`)
            .then((response) =>
                setScheduleClicked(response.data[0]))
    }, [id, usersRegisted])
    //  value enter

    const [nameEnter, setNameEnter] = useState('')


    const [nameFormated, setNameFormated] = useState('')

    useEffect(() => {
        if (nameEnter !== "") {
            const nameEnterSplited = nameEnter.split(" ")

            const lastNameFormate = nameEnterSplited[0].toUpperCase()


            if (nameEnterSplited.length === 2) {
                const firstNameFormate = nameEnterSplited[1].charAt(0).toUpperCase() + nameEnterSplited[1].slice(1, nameEnterSplited[1].length).toLowerCase()
                setNameFormated(lastNameFormate + ' ' + firstNameFormate);

            } else if (nameEnterSplited.length === 3) {
                const firstNameFormate = nameEnterSplited[2].charAt(0).toUpperCase() + nameEnterSplited[2].slice(1, nameEnterSplited[2].length).toLowerCase()
                setNameFormated(nameEnterSplited[0].toUpperCase() + ' ' + nameEnterSplited[1].toUpperCase() + ' ' + firstNameFormate);

            } else if(nameEnterSplited.length === 4) {
                const firstNameFormate = nameEnterSplited[3].charAt(0).toUpperCase() + nameEnterSplited[3].slice(1, nameEnterSplited[3].length).toLowerCase()
                setNameFormated(nameEnterSplited[0].toUpperCase() + ' ' + nameEnterSplited[1].toUpperCase() + ' ' + nameEnterSplited[2].toUpperCase() + ' ' + firstNameFormate);
                

            } else if(nameEnterSplited.length > 4) {
                nameEnterSplited.slice(4)
            }
            // setNameFormated(lastNameFormate + ' ' + firstNameFormate)
        }
    }, [nameEnter])


    const colref = collection(db, 'users')
    const allUsers = useGetDatas(colref)

    const addPlayeur = () => {
        if (nameFormated !== '') {
            axios.put(`https://inscription-colomiers-tennis.herokuapp.com/api/update/${id}`, {
                ...scheduleClicked,
                usersRegisted: usersRegisted === null ? nameFormated + "," : usersRegisted + nameFormated + ","
            }).catch((err) => toast.error(err.response.data), { hideProgressBar: true })
            toast.success(`${nameEnter} a bien été ajouté à ce créneau`)
            setShowAddPlayeurModal(false)
            setIsScheduleClicked(false)
            setTimeout(() => loadData(), 500)

        }  else { toast.error("Veuillez entrer un Nom et un Prénom") }
    }


    return (
        <div className='confirm-modal-container center'>

            <div className="container-confirm-modal container-add-playeur">
                <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

                <h1 className="h1-title">Ajouter un Joueur</h1>
                <div className="container-input-icon">
                    <input type="text" onChange={e => setNameEnter(e.target.value)} placeholder="ex : DUMONT Louis..." />
                    <span onClick={addPlayeur}>{<AiOutlineCheck />}</span>
                </div>
            </div>
        </div>
    );
};

export default AddPlayeurModal;