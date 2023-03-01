import React, { useState, useEffect, useContext } from "react";
import ScheduleItem from "../../components/ScheduleItem";
import { InfoUserContext } from "../../context/InfoUserContext";
import { AllDataSchedules } from "../../context/AllDataSchedules";
import ConfirmInscriptionModal from "../../components/ConfirmInscriptionModal"
import NavigateNextHour from '../../components/NavigateNextHour';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetDataOneSchedule } from "../../context/GetDataOneSchedule";
import ShowMoreInformationScheduleClicked from "../../components/ShowMoreInformationScheduleClicked";

// enlever les inscription1, inscription2, inscription3 et priceToPay dans firebase

const Schedule = ({ getIdFirstHour, getFormule }) => {

  const {  dataScheduleClicked, setDataScheduleClicked } = useContext(GetDataOneSchedule)

  //  navigate hook

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
      toast.error("Veuillez choisir un créneau.", { autoClose: 2000, hideProgressBar: true })
    }
  }


  // switch for get all the formules based on the level

  const [formulesList, setFormulesList] = useState([])

  useEffect(() => {
    if (level === "mini" || level === "violet" || level === 'rouge' || level === "orange" || level === "vert" || level === "jaune 1") {
      setFormulesList(["1h par semaine", "2h par semaine"])
    } else if (level === "jaune 2" || level === "jaune 3" || level === "jaune 4") {
      setFormulesList(["1h par semaine", "2h par semaine", "forme jouée 3h par semaine", 'forme jouée 2h par semaine'])
    } else if (level === 'baby') {
      setFormulesList(['50min par semaine'])
    }
  }, [level])

  //  choose formule onChange

  const [chooseFormule, setChooseFormule] = useState(level === "baby" ? "50min par semaine" : "1h par semaine")

  const changeFormule = e => {
    setChooseFormule(e.target.value)
    getFormule(e.target.value)

  }


  // navigate to second hour  
  // give the id of the schedule dropped to the app component by props

  const navigateSecondHour = () => {
    if (dataScheduleClicked.id !== undefined) {
      navigate("/inscription/deuxieme-heure")
      getIdFirstHour({ ...dataScheduleClicked })
    } else {
      toast.error('Veuillez choisr votre premiere heure')
    }
  }


  
  // const [showMoreInfoState, setShowMoreInfoState] = useState(false)
  
  // const [chooseThisHourState, setChooseThisHourState] = useState(false)
  // const getShowMoreInfoState = (state, secondState) => {
  //   setShowMoreInfoState(state)
  //   // setChooseThisHourState(secondState)

  // }
  // reset button
  
    const resatButtonClick = () => {
      setDataScheduleClicked({})
      // setShowMoreInfoState(false)
    }


  return (
    <div className="schedules-container">
      {/* {isRegisted ? (
        <h1 className="already-registed">Vous êtes déjà inscrit.</h1>
      ): ( */}
      <div style={confirmModal ? { opacity: "0.4" } : null}>
        <div className="name-formules-container" >

          <div className="formules-list">
            <label htmlFor="formules-list">Choisir sa Formule</label>
            <select name="formules-list" onChange={changeFormule}>
              {formulesList.map((formule) => {
                return (
                  <>
                    <option value={formule}>{formule}</option>
                  </>
                )
              })}
            </select>
          </div>
        </div>
        <button onClick={() => resatButtonClick()}>Réinisialiser</button>


        {chooseFormule === "1h par semaine" || chooseFormule === "2h par semaine" ? (
          <>
            <div
              className="schedules"
            >
              {data
                .filter(el => el.level === level)
                .filter(el => el.playedForm === 'classique')
                .map((data, index) => {
                  const { id } = data;
                  return (
                    <div className='one-schedule'
                      style={dataScheduleClicked.id === id ? { backgroundColor: "var(--grey-color)", boxShadow: '5px 5px 20px rgba(0,0,0,0.2)', transform: "translateX(60px)" } : {transform: "translateX(60px)"}}
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
          </>
        ) : chooseFormule === "forme jouée 3h par semaine" || chooseFormule === "forme jouée 2h par semaine" ? (
          <div
            className="schedules"
          >
            {level === 'jaune 4' ? (
              <div>
                {data
                  .filter(el => el.playedForm === 'forme-jouee')
                  .filter(el => el.startHour === '17:00')
                  .map((data, index) => {
                    const { id } = data;
                    return (
                      <div className='one-schedule' style={dataScheduleClicked.id === id ? { backgroundColor: "var(--grey-color)", boxShadow: 'var(--box-shadow)' } : null}
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
            ) : (
              <div>
                {data
                  .filter(el => el.playedForm === 'forme-jouee')
                  .map((data, index) => {
                    const { id } = data;
                    return (
                      <div className='one-schedule' style={dataScheduleClicked.id === id ? { backgroundColor: "var(--grey-color)" } : null}
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
            )}
          </div>
        ) : null}
        {chooseFormule === "1h par semaine" ?
          <button className='validate-button' onClick={showConfirmModal}>Valider l'Inscription</button>
          : <NavigateNextHour navigateSecondHour={navigateSecondHour} wichHour={"deuxième"} />

        }
      </div>
      <div className="confirm-modal-container">
        {confirmModal && <ConfirmInscriptionModal setConfirmModal={setConfirmModal} dataScheduleDropped1={dataScheduleClicked} chooseFormule={chooseFormule} />}
      </div>
      {/* {showMoreInfoState && <ShowMoreInformationScheduleClicked dataScheduleClicked={dataScheduleClicked} setShowMoreInfoState={setShowMoreInfoState} />} */}

    </div>
  );
};

export default Schedule;
