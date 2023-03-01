import { collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { db } from '../../config/firebase-config';
import { useGetDatas } from '../../hooks/useGetDatas';
import AddPlayeurModal from './AddPlayeurModal';
import ConfirmDeletePlayeur from './ConfirmDeletePlayeur';
import InfoUserModal from './InfoUserModal';


const ScheduleItemAdmin = ({ data }) => {
    // const error message 

    const [errorMessage, setErrorMessage] = useState('')

    // destruturing all the data from schedules
    const { day, startHour, endHour, id, usersRegisted, level, educator, secondEducator, playedForm, numberOfPlaces } = data;
    // push in the "arrayUsersRegister" all the usersRegisted in each schedule
    const [arrayUsersRegister, setArrayUsersRegister] = useState([])

    useEffect(() => {
        if (usersRegisted != null) {
            let splitedUsers = usersRegisted.split(",")
            splitedUsers.pop()
            setArrayUsersRegister(splitedUsers)
        }
    }, [data])


    // Create an array which will map with all the usersRegisted and the empty places
    const currentNumberOfPlaces = [];

    arrayUsersRegister.forEach(el => currentNumberOfPlaces.push(el))


    for (let i = 0; i < data.numberOfPlaces - arrayUsersRegister.length; i++) {
        currentNumberOfPlaces.push(i + 1)
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
        setErrorMessage('')

    }

    const [isScheduleClicked, setIsScheduleClicked] = useState(false)


    // addPlayeur

    const [showAddPlayeurModal, setShowAddPlayeurModal] = useState(false)


    // show infoUser

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


    // loader

    const [loader, setLoader] = useState(false)

    return (
        <>


            <table>
                <div  className={level.slice(0, 2)}>
                    <div className='header-table'>
                        <h4>{day} de {startHour} à {endHour}</h4>
                        <h4>{level.charAt(0).toUpperCase() + level.slice(1, level.length)}</h4>
                        <h4>{numberOfPlaces} places disponible</h4>

                        <h4>{educator} {secondEducator} </h4>
                        {playedForm === 'forme-jouee' && <h4>Forme Jouée</h4>}
                    </div>
                </div>
                <tbody>

                    {currentNumberOfPlaces.map((place, index) => {
                        return (
                            <>
                                {typeof place == 'string' ? (
                                    <tr  className={level.slice(0, 2)}>

                                        <div className="admin-place-prise" >

                                            <td onClick={() => showInfoUser(place)}>{place}</td>

                                            <span onClick={() => deletePlayer(index, place)} className='trash-icon'><FaTrash /></span>

                                        </div>

                                    </tr>

                                ) : (
                                    <tr className='empty' style={{ cursor: 'pointer' }}>
                                        <td onClick={() => {
                                            setShowAddPlayeurModal(true)
                                            setErrorMessage('')
                                        }}>&nbsp;</td>
                                    </tr>
                                )}
                            </>
                        )
                    })}

                </tbody>
            </table>
            <p style={{ color: '#ef6767' }}>{errorMessage}</p>
            {showConfirmDeleterPlayeur && <ConfirmDeletePlayeur playeurClick={playeurClick} setShowConfirmDeletePlayeur={setShowConfirmDeletePlayeur} id={id} index={index} arrayUsersRegister={arrayUsersRegister} setIsScheduleClicked={setIsScheduleClicked} />}
            {showAddPlayeurModal && <AddPlayeurModal setShowAddPlayeurModal={setShowAddPlayeurModal} id={id} setIsScheduleClicked={setIsScheduleClicked} />}
            {infoUserModal && <InfoUserModal userClicked={userClicked} setInfoUserModal={setInfoUserModal} setLoader={setLoader} />}


        </>
    );
};

export default ScheduleItemAdmin;