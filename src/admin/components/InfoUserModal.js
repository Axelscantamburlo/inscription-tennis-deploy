import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import { RiH5 } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase-config';
import { AllDataSchedules } from '../../context/AllDataSchedules';
import Loader from '../../helper/Loader';
import { useDateHook } from '../../hooks/dateHook'


const InfoUserModal = ({ userClicked, setInfoUserModal, setLoader }) => {

    const date = useDateHook()


    const { nom, level, email, phone, birthdayDate, dateInscription, id, hasPayed, datePaiement, typePaiement, howManyTimePaiement, sexe } = userClicked[0]

    const { data } = useContext(AllDataSchedules)

    const dataFilterWhereNameClickedIsPresent = data.filter(el => {
        if (el.usersRegisted) {
            return el.usersRegisted.includes(nom)

        }
    })

    //  close modal when cancel button is clicked

    const closeModal = () => {
        setInfoUserModal(false)
    }

    const [priceToPay, setPriceToPay] = useState('')
    const [formule, setFormule] = useState("")
    
    function findPriceToPay() {


        if (level === "baby") {
            setPriceToPay("122 €")
            setFormule("50min par semaine")

        } else if (level === "mini") {
            if (dataFilterWhereNameClickedIsPresent.length === 1) {
                setPriceToPay("163 €")
                setFormule('1h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 2) {
                setPriceToPay("265 €")
                setFormule('2h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 0) {
                setPriceToPay("Pas encore inscrit(e)")
                setFormule('Pas encore inscrit(e)")')
            } else {
                setFormule('Formule indisponible')
                setPriceToPay("Formule indisponible")
            }
        } else if (level === "violet" || level === "rouge" || level === "orange" || level === "vert") {
            if (dataFilterWhereNameClickedIsPresent.length === 1) {
                setPriceToPay("168 €")
                setFormule('1h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 2) {
                setPriceToPay("280 €")
                setFormule('2h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 0) {
                setPriceToPay("Pas encore inscrit(e)")
                setFormule('Pas encore inscrit(e)")')
            } else {
                setFormule('Formule indisponible')
                setPriceToPay("Formule indisponible")
            }
        } else if (level === "jaune 1" || level === "jaune 2" || level === "jaune 3" || level === "jaune 4" || level === "jaune 2/3/4") {
            if (dataFilterWhereNameClickedIsPresent.length === 1) {
                setPriceToPay("178 €")
                setFormule('1h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 2 && (dataFilterWhereNameClickedIsPresent[0].playedForm === 'classique' && dataFilterWhereNameClickedIsPresent[1].playedForm === 'classique')) {
                setPriceToPay("316 €")
                setFormule('2h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 2 && (dataFilterWhereNameClickedIsPresent[0].playedForm === 'forme-jouee' || dataFilterWhereNameClickedIsPresent[1].playedForm === 'forme-jouee')) {
                setPriceToPay("280 €")
                setFormule('Forme jouée 2h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 3 /* && (dataFilterWhereNameClickedIsPresent[0].playedForm === 'forme-jouee' || dataFilterWhereNameClickedIsPresent[1].playedForm === 'forme-jouee') || dataFilterWhereNameClickedIsPresent[2].playedForm === 'forme-jouee'*/) {
                setPriceToPay("428 €")
                setFormule('Forme jouée 3h par semaine')
            } else if (dataFilterWhereNameClickedIsPresent.length === 0) {
                setPriceToPay("Pas encore inscrit(e)")
                setFormule('Pas encore inscrit(e)')
            } else {
                setFormule('Formule indisponible')
                setPriceToPay("Formule indisponible")
            }
        }
    }
    useEffect(() => {
        findPriceToPay()
    }, [])


    const [toggleClassName, setToggleClassName] = useState(1)


    const [paiementPar, setPaiementPar] = useState(0)
    const [paiementBy, setPaiementBy] = useState(0)

    const [choisePaiementPar, setChoisePaiementPar] = useState('')
    const [choisePaiementBy, setChoisePaiementBy] = useState('')

  
    // update database

    async function handleSubmit(e) {
        e.preventDefault()

        const userInfo = doc(db, "users", id);
        await updateDoc(userInfo, {
            datePaiement: date,
            typePaiement: choisePaiementPar.toLowerCase(),
            howManyTimePaiement: choisePaiementBy,
            hasPayed: true,
            // limitDatePaiement: 
        })
        setLoader(true)
        toast.success("Paiement validé")
        setTimeout(() => {
            window.location = document.location
        }, 3000)
    }

    async function cancelPaiement() {
        const userInfo = doc(db, "users", id);
        await updateDoc(userInfo, {
            datePaiement: "",
            typePaiement: "",
            howManyTimePaiement: "",
            hasPayed: false
        })
        setLoader(true)
        toast.success("Paiement annulé")
        setTimeout(() => {
            window.location = document.location
        }, 3000)
    }


    return (
        <div className='show-schedule-clicked-container info-user-modal-container center'>
            <div className='header-onglets'>
                <h4 className={toggleClassName === 1 && "acitve"} onClick={() => setToggleClassName(1)}>Renseignements</h4>
                <h4 className={toggleClassName === 2 && "acitve"} onClick={() => setToggleClassName(2)}>Inscription</h4>
                <h4 className={toggleClassName === 3 && "acitve"} onClick={() => setToggleClassName(3)}>Paiement</h4>
            </div>

            <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

            <div style={toggleClassName === 1 ? { display: 'block', marginTop: "70px" } : { display: 'none' }}>
                <h1 className="h1-title" style={{ top: "80px" }}>Renseignements</h1>
                <div className="container-info first-child">
                    <h4>Nom et Prénom :</h4>
                    <span>{nom}</span>
                </div>
                <div className="container-info">
                    <h4>Sexe :</h4>
                    <span>{sexe}</span>
                </div>
                <div className="container-info birthday-date">
                    <h4>Date de Naissance :</h4>
                    <div className="formate-birthday-date" style={{ display: 'flex' }}>
                        <span>{birthdayDate !== undefined && birthdayDate.slice(0, 2)}</span>
                        <p style={{ margin: "0 2px" }}>/</p>
                        <span>{birthdayDate !== undefined && birthdayDate.slice(3, 5)}</span>
                        <p style={{ margin: "0 2px" }}>/</p>
                        <span>{birthdayDate !== undefined && birthdayDate.slice(6, 10)}</span>

                    </div>

                </div>

                <div className="container-info">
                    <h4>Niveau :</h4>
                    <span>{level.charAt(0).toUpperCase() + level.slice(1, level.length)}</span>
                </div>

                <div className="container-info">
                    <h4>Email : </h4>
                    <span>{email}</span>
                </div>

                <div className="container-info numero-container">
                    <h4>Numéro de Téléphone : </h4>
                    <span>{phone.slice(0, 2)}</span>
                    <span>{phone.slice(2, 4)}</span>
                    <span>{phone.slice(4, 6)}</span>
                    <span>{phone.slice(6, 8)}</span>
                    <span>{phone.slice(8, 10)}</span>
                </div>
            </div>
            <div style={toggleClassName === 2 ? { display: 'block', marginTop: "75px" } : { display: 'none' }}>
                <h1 className="h1-title" style={{ top: "80px" }}>Inscription</h1>

                <div className="container-info">
                    <h4>Formule : </h4>
                    <span>{formule}</span>
                </div>
                <div className="container-info">
                    <h4>Inscrit pour le :</h4>
                    <div className="inscription-container">
                        {dataFilterWhereNameClickedIsPresent[0] ? <span>{dataFilterWhereNameClickedIsPresent[0].day + " de " + dataFilterWhereNameClickedIsPresent[0].startHour + " à " + dataFilterWhereNameClickedIsPresent[0].endHour} </span> : <span>Pas econdre inscrit(e)</span>}
                        <span>{dataFilterWhereNameClickedIsPresent[1] && dataFilterWhereNameClickedIsPresent[1].day + " de " + dataFilterWhereNameClickedIsPresent[1].startHour + " à " + dataFilterWhereNameClickedIsPresent[1].endHour}</span>
                        <span>{dataFilterWhereNameClickedIsPresent[2] && dataFilterWhereNameClickedIsPresent[2].day + " de " + dataFilterWhereNameClickedIsPresent[2].startHour + " à " + dataFilterWhereNameClickedIsPresent[2].endHour}</span>
                    </div>
                </div>
                <div className="container-info">
                    <h4>Date d'inscription :</h4>
                    {dateInscription && dataFilterWhereNameClickedIsPresent[0] ? <span>{dateInscription}</span> : <span>Pas encore inscrit(e)</span>}
                </div>
            </div>
            <div style={toggleClassName === 3 ? { display: 'block', marginTop: "0" } : { display: 'none' }} className="paiement-container">
              
                    <>
                        {hasPayed ? (
                            <div className='already-paid-container'>
                                <div className="first-row">
                                    <div>
                                        <h4>Date de paiement :</h4>
                                        {datePaiement}
                                    </div>
                                    <div>
                                        <h4>Prix payé :</h4>
                                        {priceToPay} + cotisation
                                    </div>
                                </div>
                                <div className="second-row">
                                    <div>
                                        <h4>Moyen de paiement :</h4>
                                        {typePaiement === 'cb' ? typePaiement.toUpperCase() : typePaiement.charAt(0).toUpperCase() + typePaiement.slice(1, typePaiement.length)}
                                    </div>
                                    <div>
                                        <h4>Paiement en :</h4>
                                        {howManyTimePaiement}
                                    </div>
                                </div>
                                <div className="btn-container">
                                    <button onClick={cancelPaiement}>Annuler le paiement</button>
                                </div>
                            </div>
                        ) : priceToPay !== 'Formule indisponible' && priceToPay !== "Pas encore inscrit(e)" ? (
                            <>
                                <div className="container-info">
                                    <h4>Prix à payer :</h4>
                                    {priceToPay ? <span>{priceToPay} + cotisation</span> : <span>Pas encore inscrit(e)</span>}
                                </div>
                                <div className="container-info">
                                    <h4>Paiement par :</h4>
                                    <div className="paiement-by">
                                        <button style={paiementPar === 1 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} onClick={() => {
                                            setPaiementPar(1)
                                            setChoisePaiementPar('CB')
                                        }}>CB</button>
                                        <button style={paiementPar === 2 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} onClick={() => {
                                            setPaiementPar(2)
                                            setChoisePaiementPar("Chèque")
                                        }}>Chèque</button>
                                        <input className={paiementPar === 3 && "change-placeholder"} style={paiementPar === 3 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} type="text" placeholder='Autre...' onChange={e => setChoisePaiementPar(e.target.value)} onClick={(e) => {
                                            setPaiementPar(3)
                                            setChoisePaiementPar(e.target.value)
                                        }} />
                                    </div>
                                
                                </div>
                                <div className=" container-info">
                                    <h4>Paiement en : </h4>

                                    <div className="paiement-by how-many-time-paiement">
                                        <button style={paiementBy === 1 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} onClick={() => {
                                            setPaiementBy(1)
                                            setChoisePaiementBy("1x")
                                        }}>1x</button>
                                        <button style={paiementBy === 2 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} onClick={() => {
                                            setPaiementBy(2)
                                            setChoisePaiementBy("3x")
                                        }}>3x</button>
                                        <button style={paiementBy === 3 ? { backgroundColor: 'var(--blue-color)', color: "var(--grey-color)" } : { backgroundColor: "#fff" }} onClick={() => {
                                            setPaiementBy(3)
                                            setChoisePaiementBy("10x")
                                        }}>10x</button>
                                    </div>
                                </div>
                                <button type="submit" onClick={handleSubmit}>Valider le paiement</button>
                            </>
                        ) : priceToPay === 'Formule indisponible' ? (
                            <div className="container-info">
                                <h4>Prix à payer :</h4>
                                <span>Formule indisponible</span>
                            </div>
                        ) : (
                            <div className="container-info">
                                <h4>Prix à payer :</h4>
                                <span>Pas encore inscrit(e)</span>
                            </div>
                        )}
                    </>
            </div>
        </div>
    );
};

export default InfoUserModal;