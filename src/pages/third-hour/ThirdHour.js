import React, { useContext, useState } from 'react';
import { AllDataSchedules } from '../../context/AllDataSchedules';
import { InfoUserContext } from '../../context/InfoUserContext';
import ScheduleItem from "../../components/ScheduleItem"

import ConfirmInscriptionModal from '../../components/ConfirmInscriptionModal';
import { toast } from 'react-toastify';
import { GetDataOneSchedule } from '../../context/GetDataOneSchedule';
import ShowMoreInformationScheduleClicked from '../../components/ShowMoreInformationScheduleClicked';
import { useNavigate } from 'react-router-dom';

const ThirdHour = ({ dataScheduleDropped1, dataScheduleDropped2, formule }) => {

    const { getDataScheduleClicked, dataScheduleClicked } = useContext(GetDataOneSchedule)

    const navigate = useNavigate()

    // get all the data from database of the schedules connected thank's to the context

    const { data } = useContext(AllDataSchedules)


    // get the nom, prenom, level of the user connected thank's to the context

    const { nom, level, isRegisted } = useContext(InfoUserContext)

    // confirm modal

    const [confirmModal, setConfirmModal] = useState(false)

    const showConfirmModal = () => {
        if (dataScheduleClicked.id !== undefined) {
            setConfirmModal(true)
        } else {
            toast.error("Veuillez choisir dans un créneau.", { autoClose: 2000, hideProgressBar: true })
        }
    }


    // const [showMoreInfoState, setShowMoreInfoState] = useState(false)

    // const [chooseThisHourState, setChooseThisHourState] = useState(false)
    // const getShowMoreInfoState = (state, secondState) => {
    //     setShowMoreInfoState(state)
    //     setChooseThisHourState(secondState)
    // }

    return (
        <div className="schedules-container">
            <div
                className="schedules"
            >
                {data
                    .filter(el => el.level === level)
                    .filter(el => el.playedForm === 'classique')

                    .filter(el => el.id !== dataScheduleDropped1.id && el.id !== dataScheduleDropped2.id)
                    .map((data, index) => {
                        const { id, usersRegisted } = data;
                        return (
                            <div className='one-schedule' style={dataScheduleClicked.id === id ? { backgroundColor: "var(--grey-color)", boxShadow: '5px 5px 20px rgba(0,0,0,0.2)', transform: "translateX(60px)" } : { transform: "translateX(60px)" }}
                            >

                                {
                                    <ScheduleItem
                                        data={data}
                                        key={id}
                                        // getShowMoreInfoState={getShowMoreInfoState}
                                    />
                                }

                            </div>
                        );
                    })}
            </div>
            <button style={{ position: "absolute", bottom: "30px", left: "30px" }} onClick={() => navigate("/inscription/deuxieme-heure")}>arrow left</button>
            <button className='validate-button' onClick={showConfirmModal}>Valider l'Inscription</button>
            <div className="confirm-modal-container">
                {confirmModal && <ConfirmInscriptionModal setConfirmModal={setConfirmModal} dataScheduleDropped1={dataScheduleDropped1} dataScheduleDropped2={dataScheduleDropped2} dataScheduleDropped3={dataScheduleClicked} chooseFormule={formule} />}
            </div>
            {/* {showMoreInfoState && <ShowMoreInformationScheduleClicked dataScheduleClicked={dataScheduleClicked} setShowMoreInfoState={setShowMoreInfoState} />} */}

        </div>
    );
};

export default ThirdHour;