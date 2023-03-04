import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";


export const GetDataOneSchedule = createContext()

export const GetDataOneScheduleProvider = ({ children }) => {

  // get all the data from all the schedules when the page is loading
  const [dataScheduleClicked, setDataScheduleClicked] = useState({})

  const getDataScheduleClicked = (id) => {
    axios.get(`https://inscription-tennis.herokuapp.com/api/get/${id}`)
      .then((response) => {
        setDataScheduleClicked(response.data[0])
      })
  }


  return (
    <GetDataOneSchedule.Provider value={{ getDataScheduleClicked, dataScheduleClicked, setDataScheduleClicked }}>
      {children}
    </GetDataOneSchedule.Provider>
  )

}