import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AllDataSchedules } from '../../context/AllDataSchedules';

const ConfirmDeleteSchedule = ({ id, setConfirmModal, text, title }) => {

    const { loadData } = useContext(AllDataSchedules)


    const deleteSchedule = () => {
        if (text === 'Êtes-vous certain de vouloir supprimer ce créneau ?') {
            axios.delete(`https://inscription-tennis.herokuapp.com/api/remove/${id}`)
            closeModal('Le créneau a bien été supprimé.')

        } else {
            axios.delete('https://inscription-tennis.herokuapp.com/api/remove')
            closeModal('Tous les créneaux ont bien été supprimés')
        }
    }

    const closeModal = (title) => {
        setConfirmModal(false)
        toast.success(title, { autoClose: 5000 })
        setTimeout(() => loadData(), 1000)
    }

    return (
        <div className='container-confirm-modal'>
            <h1 className='h1-title'>{title}</h1>
            <div className="text" style={{ marginTop: "30px" }}>

                <h4><span>{text}</span></h4>
                <h4> <span className='span-2'>Toutes les informations seront définitivement effacées.</span></h4>
            </div>
            <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

            <div className="buttons">
                <div className="cancel-button">
                    <button onClick={closeModal}>Annuler</button>
                </div>
                <div className="confirm-button">
                    <button onClick={deleteSchedule}>Confirmer</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteSchedule;