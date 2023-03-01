import React, { useContext, useState } from 'react';
import { AllDataSchedules } from '../../context/AllDataSchedules';
import ScheduleItem from '../../components/ScheduleItem';
import { InfoUserContext } from '../../context/InfoUserContext';
import { useDrag, useDrop } from "react-dnd";
import Name from '../../components/Name';
import { toast } from 'react-toastify';
import ConfirmInscriptionModal from '../../components/ConfirmInscriptionModal';
import { useNavigate } from 'react-router-dom';
import NavigateNextHour from '../../components/NavigateNextHour';
import { GetDataOneSchedule } from '../../context/GetDataOneSchedule';
import ShowMoreInformationScheduleClicked from '../../components/ShowMoreInformationScheduleClicked';
import { BiLeftArrowAlt } from "react-icons/bi"

const SecondHour = ({ dataScheduleDropped1, getIdSecondHour, formule }) => {

    const { getDataScheduleClicked, dataScheduleClicked } = useContext(GetDataOneSchedule)


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
            toast.error("Veuillez vous placer dans un créneau.", { autoClose: 2000, hideProgressBar: true })
        }
    }

    // navigate

    const navigate = useNavigate()

    const navigateThirdHour = () => {
        if (dataScheduleClicked.id !== undefined) {
            navigate("/inscription/deuxieme-heure/troisieme-heure")
            getIdSecondHour({ ...dataScheduleClicked })
        } else {
            toast.error('Veuillez choisr votre premiere heure')
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
                    .filter(el => el.id !== dataScheduleDropped1.id)
                    .map((data, index) => {
                        const { id, usersRegisted } = data;
                        return (
                            <div className='one-schedule' style={dataScheduleClicked.id === id ? { backgroundColor: "var(--grey-color)", boxShadow: '5px 5px 20px rgba(0,0,0,0.2)', transform: "translateX(60px)"  } : { transform: "translateX(60px)" }}
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
            {formule === "2h par semaine" || formule === "forme jouée 2h par semaine" ? (
                <>
                    <button className='navigate-previus-hour-button' onClick={() => navigate("/inscription")}><BiLeftArrowAlt /></button>
                    <button className='validate-button' onClick={showConfirmModal}>Valider l'Inscription</button>
                </>

            ) : (
                <>
                    <button className='navigate-previus-hour-button' onClick={() => navigate("/inscription")}><BiLeftArrowAlt /></button>
                    <NavigateNextHour navigateThirdHour={navigateThirdHour} wichHour={"troisième"} />
                </>
            )}
            <div className="confirm-modal-container">
                {confirmModal && <ConfirmInscriptionModal setConfirmModal={setConfirmModal} dataScheduleDropped1={dataScheduleDropped1} dataScheduleDropped2={dataScheduleClicked} chooseFormule={formule} />}
            </div>
            {/* {showMoreInfoState && <ShowMoreInformationScheduleClicked dataScheduleClicked={dataScheduleClicked} setShowMoreInfoState={setShowMoreInfoState} />} */}

        </div>
    );
};

export default SecondHour;