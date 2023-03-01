import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { db } from '../../config/firebase-config';
import { useGetDatas } from '../../hooks/useGetDatas';
import AddPlayeurModal from './AddPlayeurModal';
import ConfirmDeletePlayeur from './ConfirmDeletePlayeur';
import InfoUserModal from '../components/InfoUserModal'


const ShowScheduleClicked = ({ dataScheduleClicked, setIsScheduleClicked, setDataScheduleClicked, setLoader }) => {


    const { level, usersRegisted, id, day, startHour, endHour, numberOfPlaces, educator, secondEducator, playedForm } = dataScheduleClicked

    const [arrayScheduleClicked, setarrayScheduleClicked] = useState([dataScheduleClicked])

    // push in the "arrayUsersRegister" all the usersRegisted in each schedule
    const [arrayUsersRegister, setArrayUsersRegister] = useState([])


    useEffect(() => {
        if (usersRegisted != null) {
            let splitedUsers = usersRegisted.split(",")
            splitedUsers.pop()
            setArrayUsersRegister(splitedUsers)
        }

    }, [id, usersRegisted])


    // Create an array which will map with all the usersRegisted and the empty places
    const currentNumberOfPlaces = [];

    arrayUsersRegister.forEach(el => currentNumberOfPlaces.push(el))

    for (let i = 0; i < numberOfPlaces - arrayUsersRegister.length; i++) {
        currentNumberOfPlaces.push(i + 1)
    }

    function closeModal() {
        setIsScheduleClicked(false)
        setDataScheduleClicked({})
    }


    // showConfirm Modal


    const [showConfirmDeleterPlayeur, setShowConfirmDeletePlayeur] = useState(false)

    const [playeurClick, setPlayeurClick] = useState('')
    // remove player when bin icon is clicked

    const [index, setIndex] = useState(0)

    const deletePlayer = (index, playeur) => {
        setShowConfirmDeletePlayeur(true)
        setPlayeurClick(playeur)
        setIndex(index)

    }

    // addPlayeur

    const [showAddPlayeurModal, setShowAddPlayeurModal] = useState(false)

    // all usersRegisted in firebase
    const [errorMessage, setErrorMessage] = useState('')

    const colref = collection(db, 'users')
    const allUsers = useGetDatas(colref)


    const [userClicked, setUserClicked] = useState([])

    const [infoUserModal, setInfoUserModal] = useState(false)

    const showInfoUser = name => {
        const oneUserClicked = allUsers.filter(el => el.nom === name)
        if (oneUserClicked.length >= 1) {
            setInfoUserModal(true)
            setUserClicked(oneUserClicked)
            setErrorMessage("")
        } else setErrorMessage("Aucune information sur ce Joueur")
    }


    return (
        <>
            {arrayScheduleClicked.map((schedule) => {

                return (
                    <>
                        <div style={showConfirmDeleterPlayeur  || showAddPlayeurModal || infoUserModal ? { opacity: "0.4" } : null}>
                            <h1 className='h1-title' style={{ transform: 'translate(-50%, 10px)' }}>Aperçu du Créneau</h1>
                            <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

                            <div className="schedules">
                                <div className="one-schedule" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', height: 'auto' }}>
                                    <table>
                                        <div className='header-table'>
                                            <h4>{day} de {startHour} à {endHour}</h4>
                                            <h4>{level}</h4>
                                            <h4>{numberOfPlaces} places disponible</h4>
                                            <h4>{educator} {secondEducator} </h4>
                                            {playedForm === 'forme-jouee' && <h4>Forme Jouée</h4>}
                                        </div>
                                        <tbody>

                                            {currentNumberOfPlaces.map((place, index) => {
                                                return (
                                                    <>
                                                        {typeof place == 'string' ? (
                                                            <tr className="place-prise">

                                                                <div className="admin-place-prise">

                                                                    <td onClick={() => showInfoUser(place)}>{place}</td>

                                                                    <span onClick={() => deletePlayer(index, place)} className='trash-icon'><FaTrash /></span>

                                                                </div>

                                                            </tr>

                                                        ) : (
                                                            <tr className='empty' style={{ cursor: 'pointer' }}>
                                                                <td onClick={() => setShowAddPlayeurModal(true)}>&nbsp;</td>
                                                            </tr>
                                                        )}
                                                    </>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                <p style={{ color: '#ef6767' }}>{errorMessage}</p>
                            </div>
                        </div>

                    </>
                )
            })}

            {showConfirmDeleterPlayeur && <ConfirmDeletePlayeur playeurClick={playeurClick} setShowConfirmDeletePlayeur={setShowConfirmDeletePlayeur} id={id} index={index} arrayUsersRegister={arrayUsersRegister} setIsScheduleClicked={setIsScheduleClicked} />}
            {showAddPlayeurModal && <AddPlayeurModal setShowAddPlayeurModal={setShowAddPlayeurModal} id={id} setIsScheduleClicked={setIsScheduleClicked} />}
            {infoUserModal && <InfoUserModal userClicked={userClicked} setInfoUserModal={setInfoUserModal} setLoader={setLoader} />}
        </>
    );
};

export default ShowScheduleClicked;