import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const AllDataSchedules = createContext()

export const AllDataSchedulesProvider = ({ children }) => {

  // get all the data from all the schedules when the page is loading
  const [data, setData] = useState([])


  const loadData = async () => {
    const response = await axios.get("https://inscription-tennis.herokuapp.com/api/get")
    setData(response.data)
  }



  useEffect(() => {
    loadData()
    if (document.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription" || document.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription/deuxieme-heure" || document.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription/deuxieme-heure/troisieme-heure") {

      setInterval(() => {
        loadData()
      }, 10000)
    }
  }, [])




  return (
    <AllDataSchedules.Provider value={{ data, loadData, setData }}>
      {children}
    </AllDataSchedules.Provider>
  )

}