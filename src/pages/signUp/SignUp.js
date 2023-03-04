import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { INPUTS_DATA } from "../../data/data";
import { auth, db } from '../../config/firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, setDoc, doc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useGetDatas } from "../../hooks/useGetDatas";
import Loader from '../../helper/Loader'

const SelectLevel = () => {

  // navigate 
  const navigate = useNavigate()
  // Error Messages

  const [errorMessage, setErrorMessage] = useState('')

  // get all the data from the excel file

  const [dataUsersReInscription, setDataUsersReInscription] = useState([])


  const loadData = async () => {
    const response = await axios.get("https://inscription-tennis.herokuapp.com/apiUsers/get")
    setDataUsersReInscription(response.data)
  }
  useEffect(() => {
    loadData()
  }, [])

  // get all data from inputs
  const [data, setData] = useState({})

  const { email, phone, password } = data


  function handleInput(e) {
    const id = e.target.id
    const value = e.target.value

    setData({ ...data, [id]: value })


  }


  // filter name and firstName to show to the user
  const [nom, setNom] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  const [errorFilterNothingMatch, setErrorFilterNothingMatch] = useState('')

  const filterDataFunction = (value) => {
    if (!value) {
      setFilteredNames([])
    } else if (value.length >= 2) {
      setCloseFilterList(false)
      let matches = dataUsersReInscription.filter(user => {
        setErrorFilterNothingMatch('')
        const regex = new RegExp(value, "gi");
        return (user.Nom.match(regex) || user.Prénom.match(regex))
      })
      setFilteredNames(matches)
    }
    if (value.length > 2 && filteredNames.length === 0) {
      setErrorFilterNothingMatch('Aucun résultat')
    }
    setNom(value)

  };

  // close filterNames list and put the name in the "nom" variable

  const [closeFilterList, setCloseFilterList] = useState(false)

  const closeFilterListOnClick = (name, firstName) => {

    setNom(name + " " + firstName)
    setCloseFilterList(true)
  }

  // get all the collection from users in firebase

  const colref = collection(db, 'users')
  const allUsers = useGetDatas(colref)

  // check if the name of the user is not already in the data

  const [isNameIsNotAlreadyInFirebase, setIsNameAlreadyInFirebase] = useState(false)

  const checkIfNameIsNotAlreadyInFirebasse = () => {
    allUsers.forEach(user => {
      if (nom === user.nom) {
        setIsNameAlreadyInFirebase(true)
      }

    })
  }

  // check if the user is in the database, if it's good, get his level

  const [level, setLevel] = useState('')
  const [birthdayDate, setBirthdayDate] = useState('')
  const [sexe, setSexe] = useState('')

  const [isNameAndFirstNameAreInDatabase, setIsNameAndFirstNameAreInDatabase] = useState(false)

  const doesUserIsInDatabase = () => {
    dataUsersReInscription.forEach((user) => {
      if (nom === user.Nom + ' ' + user.Prénom) {
        axios.get(`https://inscription-tennis.herokuapp.com/apiUsers/get/${user.id}`)
          .then(response => {
            setBirthdayDate(response.data[0].dateDeNaissance)
            setLevel(response.data[0].Niveau.toLowerCase())
            setSexe(response.data[0].Sexe)
            setIsNameAndFirstNameAreInDatabase(true)
          })
      } else {
        setIsNameAndFirstNameAreInDatabase(false)
      }
    })
  }

  useEffect(() => {
    if (nom) {
      doesUserIsInDatabase()
      setIsNameAlreadyInFirebase(false)
    }
  }, [nom])

  useEffect(() => {
    if (nom) {
      checkIfNameIsNotAlreadyInFirebasse()
    }
  }, [isNameAndFirstNameAreInDatabase])



  // loader

  const [loader, setLoader] = useState(false)

  if (loader) {
    setTimeout(() => setLoader(false), 3001)
  }


  // Phoner regex
  const phoneRegex = /[0]{1}[1-7]{1}[0-9]{8}/

  // capital letter regex

  const capitalLetterRegex = /[A-Z]/


  // Add user to firebase with all data
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nom || !email || !phone || !password || sexe === '') {
      setErrorMessage("Veuillez remplir tous les Champs")
    } else if (password.length < 6 || !password.match(capitalLetterRegex)) {
      setErrorMessage('Le mot de passe doit contenir au moins six caractères et une majuscule.')
    }
    else if (!phone.match(phoneRegex)) {
      setErrorMessage('Numero de téléphone invalide')
    } else if(sexe === '') {
      setErrorMessage('Veuillez entrer le sexe du joueur')
    }
    else {
      if (isNameAndFirstNameAreInDatabase && isNameIsNotAlreadyInFirebase == false) {
        createUser()

      } else if (!isNameAndFirstNameAreInDatabase) {
        setErrorMessage("Votre nom n'a pas été trouvé.")

      } else if (isNameIsNotAlreadyInFirebase) {
        setErrorMessage("Votre nom à déjà été utilisé dans la création d'un compte.")
      }

    }

  }

  // sexe 


  // const [toggleClassNameButtonSexe, setToggleClassNameButtonSexe] = useState(0)

  // const sexeButtonClick = (sexe, toggle, e) => {
  //   e.preventDefault()
  //   setSexe(sexe)
  //   setToggleClassNameButtonSexe(toggle)
  // }

  // console.log(sexe);

  // function try/catch called when form is submit to create user

  const createUser = async () => {
    try {
      setLoader(true)
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        nom,
        isRegisted: false,
        level: level,
        dateInscription: "",
        birthdayDate,
        hasPayed: false,
        datePaiement: "",
        timeStampLimitPaiement: 0,
        sexe: sexe === 'F' ? 'Femme' : 'Homme',
        typePaiement: "",
        howManyTimePaiement: ""
      })
      setErrorMessage('')
      toast.success("Votre inscription a bien été validée", { autoClose: 1000, hideProgressBar: true })
      navigate("/se-connecter")

    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setErrorMessage("Format d'Email invalide")
      }

      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("Email déjà utilisé")
      }
    }
  }


  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="sign-up-container">
          <div className="container-responsive">
            <h1>Créer un Compte</h1>
            <div className="form-container">
              <form >
                {/* <div className="sexe-container">
                  <label>Sexe :</label>
                  <div className="sexe-btn">
                    <button style={toggleClassNameButtonSexe === 1 ? {backgroundColor: 'var(--blue-color)', color: 'var(--grey-color)'} : null} onClick={(e) => sexeButtonClick('Homme', 1, e)}>Homme</button>
                    <button style={toggleClassNameButtonSexe === 2 ? {backgroundColor: 'var(--blue-color)', color: 'var(--grey-color)'} : null} onClick={(e) => sexeButtonClick('Femme', 2, e)}>Femme</button>
                    <button style={toggleClassNameButtonSexe === 3 ? {backgroundColor: 'var(--blue-color)', color: 'var(--grey-color)'} : null} onClick={(e) => sexeButtonClick('Autre', 3, e)}>Autre...</button>
                  </div>
                </div> */}
                <div className="name-container">
                  <label htmlFor="name">Nom</label>
                  <div className="input-text">
                    <input type="text" autoComplete="off" name="name" value={nom} onChange={(e) => filterDataFunction(e.target.value)} />
                    <div className={filteredNames && "filter-list"}>
                      {!closeFilterList && filteredNames.sort((a, b) => a.Nom.length - b.Nom.length).slice(0, 6).map(name => {
                        return (
                          <ul onClick={_ => closeFilterListOnClick(name.Nom, name.Prénom)} style={{ cursor: 'pointer' }}>
                            <li>{name.Nom} {name.Prénom}</li>
                          </ul>
                        )
                      })}
                    </div>
                  </div>
                  {filteredNames.length === 0 && <p>{errorFilterNothingMatch}</p>}
                </div>
                <div className="inputs">
                  {INPUTS_DATA.map((input) => (
                    <div className="input" key={input.id}>
                      <label>{input.label}</label>
                      <input type={input.type} id={input.id} className={input.className} maxLength={input.maxlength} onChange={handleInput} autoComplete='off' value={data.id} />
                    </div>
                  ))}
                </div>
                <span>{errorMessage}</span>
                <button type="submit" className="submit-btn" onClick={handleAdd}>Valider</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectLevel;
