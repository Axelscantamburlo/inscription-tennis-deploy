import React, { useContext, useEffect, useState } from "react";
import { GetDataOneSchedule } from "../context/GetDataOneSchedule";
import Cell from "./Cell";
import ShowMoreInformationScheduleClicked from "./ShowMoreInformationScheduleClicked";

const ScheduleItem = ({ data, getShowMoreInfoState }) => {

  const {getDataScheduleClicked} = useContext(GetDataOneSchedule)

  // destruturing all the data from schedules
  const { day, startHour, endHour, id, usersRegisted, numberOfPlaces } = data;

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



  //  calculate the places occuped

  const placePrise = arrayUsersRegister.length

    // state when choisir cette horaire is clicked 

    const [chooseThisHour, setChooseThisHour] = useState(false)

    function chooseHour(id) {
      setChooseThisHour(true)
      getDataScheduleClicked(id)
      // getShowMoreInfoState(false, true)

    }


  // show more informations


  const [moreInformationModal, setMoreInformationModal] = useState(false)


  function showMoreInformationModal(id) {
    setMoreInformationModal(true)
    // getShowMoreInfoState(true, false)
    getDataScheduleClicked(id)
  }



  return (
    <>

      <div >
        <table>
          <thead>
            <tr>
              <th>{day} de {startHour} à {endHour}</th>
            </tr>
          </thead>
          <tbody>


            {currentNumberOfPlaces.map((place, index) => {
              return (
                <Cell
                  place={place}
                  id={id}
                />

              )
            })}

          </tbody>
        </table>
        <div className="container-nmbre-de-places" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="places-remaining"><strong>{data.numberOfPlaces - placePrise}</strong> places restantes</span>
        </div>
      </div>
      {/* <button className="show-more-info" onClick={() => showMoreInformationModal(id)}>Voir plus d' Informations</button> */}
            {placePrise === numberOfPlaces ? (
               <button className="choisir-cette-horaire no-places-remaining" style={{opacity: '0.5'}} >Choisir cet horaire</button>
            ) :  <button className="choisir-cette-horaire" onClick={() => chooseHour(id)} >Choisir cet horaire</button>}
    </>

  );
};

export default ScheduleItem;
