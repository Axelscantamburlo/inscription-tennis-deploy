import React, { useState, useEffect, useContext } from 'react';
import CreateSchedule from '../../components/CreateSchedule';
import { Link } from 'react-router-dom';
import { AllDataSchedules } from '../../../context/AllDataSchedules';
import ConfirmDeleteSchedule from '../../components/ConfirmDeleteSchedule';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import axios from 'axios';
import ShowScheduleClicked from '../../components/ShowScheduleClicked';
import { useDateHook } from '../../../hooks/dateHook';
import { GetDataOneSchedule } from '../../../context/GetDataOneSchedule';
import Header from '../../components/Header';
import Loader from '../../../helper/Loader';



const CreateScheduleHomePage = () => {

    const date = useDateHook()


    // show entire component

    const [showCreateScheduleComponent, setShowCreateScheduleComponent] = useState(false)

    //  loadData

    const { data, loadData, setData } = useContext(AllDataSchedules)


    // get data one schedule

    const { getDataScheduleClicked, dataScheduleClicked, setDataScheduleClicked } = useContext(GetDataOneSchedule)


    // show confirm modal

    const [confirmModal, setConfirmModal] = useState(false)

    const [id, setId] = useState({})

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const showConfirmModalToDeleteOne = (id) => {
        setConfirmModal(true)
        setId({ id })
        setText('Êtes-vous certain de vouloir supprimer ce créneau ?')
        setTitle('Supprimer un Créneau')
    }

    //  delete all schedules

    const showConfirmModalToDeleteAll = () => {
        setConfirmModal(true)
        setText('Êtes-vous certain de vouloir supprimer tous les créneaux ?')
        setTitle('Supprimer tous les Créneaux')

    }

    //  get schedule click to show it
    // const [scheduleClicked, setScheduleClicked] = useState({})

    const [isScheduleClicked, setIsScheduleClicked] = useState(false)

    const scheduleClicked = (id) => {
        setIsScheduleClicked(true)
        getDataScheduleClicked(id)
    }



    const [loader, setLoader] = useState(false)

    if (loader) {
        setTimeout(() => setLoader(false), 3000)
    }

    return (
        <div>
            {loader ? (
                <Loader />

            ) : (
                <div className='create-schedule-home-page-container'>
                    <div style={confirmModal || isScheduleClicked ? { opacity: "0.4" } : null}>
                        <Header toggleClassName={1} />

                        <CreateSchedule data={data} setData={setData} loadData={loadData} title='Ajouter un créneau' showCreateScheduleComponent={showCreateScheduleComponent} className='' />
                        {showCreateScheduleComponent ? (
                            <span className='arrow-icon-down arrow-icon' onClick={() => setShowCreateScheduleComponent(!showCreateScheduleComponent)}>{<BsFillArrowDownCircleFill />}</span>
                        ) : (
                            <span className='arrow-icon-up arrow-icon' onClick={() => setShowCreateScheduleComponent(!showCreateScheduleComponent)}>{<BsFillArrowUpCircleFill />}</span>

                        )}


                        {data.length >= 1 ? (
                            <>
                                <div className="container" style={!showCreateScheduleComponent ? { paddingTop: "320px" } : { paddingTop: "60px" }}>

                                    <div className="navbar" >
                                        <ul>
                                            <li>Formule</li>
                                            <li>Jour</li>
                                            <li>Horaire</li>
                                            <li>Niveau</li>
                                            <li>Places Disponnibles</li>
                                            <li>Enseignant</li>
                                        </ul>
                                    </div>


                                    <div className='schedules-cards'>
                                        {data.map((schedule, index) => {
                                            const { id, playedForm, day, startHour, endHour, level, numberOfPlaces, educator, secondEducator, usersRegisted } = schedule

                                            return (
                                                <>
                                                    <ul key={id} className='card'>
                                                        <div className='left-card' onClick={() => scheduleClicked(id)}>
                                                            {playedForm === "forme-jouee" ? (<li>Forme Jouée</li>) : <li>Classique</li>}
                                                            <li>{day}</li>
                                                            <li>{startHour} à {endHour}</li>
                                                            <li>{level.charAt(0).toUpperCase() + level.slice(1, level.length)}</li>
                                                            <li>{numberOfPlaces}</li>
                                                            <li>{secondEducator === null ? educator : `${educator} et ${secondEducator}`}</li>

                                                        </div>
                                                        <div className="delete-update-buttons">
                                                            <Link to={`update/${schedule.id}`}>
                                                                <button className='update-btn'>Modifier</button>
                                                            </Link>
                                                            <button className='delete-btn' onClick={() => showConfirmModalToDeleteOne(schedule.id)}>Supprimer</button>
                                                        </div>
                                                    </ul>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <h1 className='h1' style={!showCreateScheduleComponent ? { marginTop: '40px' } : { marginTop: "-100px" }}>Aucun créneau n'a été ajouté.</h1>
                        )}
                    </div>
                    {
                        data.length >= 2 && (
                            <div className="delete-all-schedules-container">
                                <button onClick={showConfirmModalToDeleteAll}>Supprimer Tous les Créneaux</button>
                            </div>
                        )
                    }
                    <div className="confirm-modal-container">
                        {confirmModal && <ConfirmDeleteSchedule setConfirmModal={setConfirmModal} id={id.id} text={text} title={title} setIsScheduleClicked={setIsScheduleClicked} />}
                    </div>
                    {
                        isScheduleClicked && (
                            <div className="show-schedule-clicked-container">
                                <ShowScheduleClicked setIsScheduleClicked={setIsScheduleClicked} dataScheduleClicked={dataScheduleClicked} id={id} setDataScheduleClicked={setDataScheduleClicked} setLoader={setLoader} />
                            </div>
                        )
                    }

                </div >
            )}
        </div >
    );
};

export default CreateScheduleHomePage;