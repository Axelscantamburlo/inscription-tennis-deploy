import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5'
import { DAYS, EDUCATOR_NAMES } from '../../data/data';

import { useDateHook } from '../../hooks/dateHook';



const CreateSchedule = ({ data, setData, title, loadData, showCreateScheduleComponent, className }) => {

    // create state to save date
    const [dateToSaveInDatabase, setDateToSaveInDatabase] = useState('')

    // formate date to fr format
    const date = useDateHook()

    // navigate
    const navigate = useNavigate()


    const [state, setState] = useState({
        day: "",
        startHour: "",
        endHour: "",
        numberOfPlaces: 0,
        level: "",
        usersRegisted: null,
        playedForm: "",
        educator: '',
        secondEducator: '',
    })

    // educatorName


    const { day, startHour, endHour, level, numberOfPlaces, usersRegisted, playedForm, educator, secondEducator } = state

    let { id } = useParams()

    useEffect(() => {
        axios.get(`https://inscription-tennis.herokuapp.com/api/get/${id}`)
            .then((response) => setState({ ...response.data[0] }))
    }, [id])

    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!day || !level || !numberOfPlaces || !startHour || !endHour || !playedForm || !educator) {
            toast.error("Veuillez Remplir tous les Champs", { autoClose: 3000, hideProgressBar: true })
        } else if (educator === secondEducator && educator !== 'ne pas specifier' && secondEducator !== "ne pas specifier") {
            toast.error("Les deux Enseignant ne peuvent pas être identiques.")
        }
        else {
            if (!id) {
                postScheduleInDatabase()
            } else {
                updateDatabase()

            }
        }
        setTimeout(() => loadData(), 500)

    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    // post schedule onSubmit

    const postScheduleInDatabase = () => {
        axios.post("https://inscription-tennis.herokuapp.com/api/post", {
            day,
            startHour,
            endHour,
            numberOfPlaces,
            level,
            usersRegisted,
            playedForm,
            educator,
            secondEducator,
            dateToSaveInDatabase,


        }).catch((err) => toast.error(err.response.data), { hideProgressBar: true })

        toast.success("Le créneau a bien été ajouté ✅", { autoClose: 850, hideProgressBar: true })
        setState({ day: "", startHour: "", endHour: "", numberOfPlaces: "", level: "", usersRegisted: null, playedForm: "" })

        setData([
            ...data,
            {
                day,
                startHour,
                endHour,
                numberOfPlaces,
                level,
                usersRegisted,
                playedForm,
                educator,
                secondEducator,
                dateToSaveInDatabase,

                id,
            },
        ])
    }


    //  update schedule onSubmit

    const updateDatabase = () => {
        axios.put(`https://inscription-tennis.herokuapp.com/api/update/${id}`, {
            day,
            startHour,
            endHour,
            numberOfPlaces,
            level,
            usersRegisted,
            playedForm,
            educator,
            secondEducator,
            dateToSaveInDatabase,


        }).catch((err) => toast.error(err.response.data), { hideProgressBar: true })
        toast.success("Le créneau a bien été modifié ✅", { autoClose: 850, hideProgressBar: true })
        navigate("/admin/accueil-admin/ajouter-un-creneau")
        setState({ day: "", startHour: "", endHour: "", numberOfPlaces: "", level: "", usersRegisted: null, playedForm: "", educator: '', secondEducator: '' })
    }


    // conditionale rendering with level

    const [levelToMap, setLevelToMap] = useState([])
    const [daysToMap, setDaysToMap] = useState([])

    useEffect(() => {
        if (playedForm === "forme-jouee") {
            setLevelToMap(['jaune 2/3/4'])
            setDaysToMap(['Mercredi', 'Samedi'])
        } else {
            setLevelToMap(['baby', 'mini', 'violet', 'rouge', 'orange', 'vert', 'jaune 1', 'jaune 2', 'jaune 3', 'jaune 4', 'adulte niveau 1'])
            setDaysToMap(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'])

        }
    }, [playedForm])





    // add second educator

    const [isSecondEducator, setIsSecondEducator] = useState(false)


    return (
        <div className={className}>
            {showCreateScheduleComponent === false && (
                <div className='create-schedule-container'>
                    <h1>{title}</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <div className="input-played-form input">
                                <label htmlFor="playedForm">Formule :</label>
                                <select name="playedForm" onChange={handleInputChange} value={playedForm || ''}>
                                    <option value="choisir-formule"></option>
                                    <option value="classique">Classique</option>
                                    <option value="forme-jouee">Forme Jouée</option>
                                </select>
                            </div>

                            <div className="input-day input">
                                <label htmlFor="day">Jour :</label>
                                <select name="day" onChange={handleInputChange} value={day || ''}>
                                    <option value="chosir-le-jour"></option>
                                    {daysToMap.map((day) => {
                                        return (
                                            <option value={day}>{day}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="input-start-hour input">
                                <label htmlFor="startHour" >Début :</label>
                                <input type="time" name="startHour" onChange={handleInputChange} value={startHour || ""} />

                            </div>
                            <div className="input-end-hour input">
                                <label htmlFor="endHour" >Fin :</label>
                                <input type="time" name="endHour" onChange={handleInputChange} value={endHour || ""} />
                            </div>
                            <div className="input-level input">
                                <label htmlFor="level">Niveau :</label>

                                <select name="level" onChange={handleInputChange} value={level || ""}>
                                    <option value="choisir-le-niveau"></option>
                                    {levelToMap.map((level) => {
                                        return (
                                            <option value={level.toLowerCase()}>{level.charAt(0).toUpperCase() + level.slice(1, level.length)}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="input-number-of-places input">
                                <label htmlFor="NumberOfPlaces">Places :</label>
                                <input type="number" name='numberOfPlaces' onChange={handleInputChange} value={numberOfPlaces || ""} min='1' max='20' />
                            </div>
                            <div className="input-name-educator input">
                                <label htmlFor="educator">Enseignant :</label>
                                <div className="container-select-icon">
                                    <select name='educator' onChange={handleInputChange} value={educator || ''}>
                                        <option value="choisir-educator"></option>
                                        <option value="Non Défini">Non Défini</option>

                                        {EDUCATOR_NAMES.map((educator) => {
                                            return (
                                                <option value={educator}>{educator}</option>
                                            )
                                        })}
                                    </select>
                                    <span onClick={() => setIsSecondEducator(true)}>{<IoAdd />}</span>
                                </div>
                                {isSecondEducator && (
                                    <>
                                        <label htmlFor="educator">Second Enseignant :</label>
                                        <div className="container-select-icon container-second-educator">
                                            <select name='secondEducator' onChange={handleInputChange} value={secondEducator || ''}>
                                                <option value="choisir-second-educator"></option>
                                                <option value="Non Défini">Non Défini</option>

                                                {EDUCATOR_NAMES.map((educator) => {
                                                    return (
                                                        <option value={educator}>{educator}</option>
                                                    )
                                                })}
                                            </select>
                                            <span onClick={() => setIsSecondEducator(false)}>&times;</span>

                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <input type="submit" value={id ? 'Modifier' : 'Créer'} />
                    </form>
                </div>
            )}
        </div>

    );
};

export default CreateSchedule;