import SignIn from "./pages/signIn/SignIn";
import SignUp from './pages/signUp/SignUp'
import ScheduleHomePage from "./pages/schedules/ScheduleHomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import AdminLogin from "./admin/pages/admin-login/AdminLogin";
import AdminHomePage from "./admin/admin-home-page/AdminHomePage";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateSchedule from "./admin/components/CreateSchedule";
import ConnexionChoice from "./pages/connexion-choice/ConnexionChoice";

import SecondHour from './pages/second-hour/SecondHour';
import ThirdHour from "./pages/third-hour/ThirdHour"
import CreateScheduleHomePage from "./admin/pages/create-schedule/CreateScheduleHomePage";
import { AllDataSchedules } from "./context/AllDataSchedules";
import ShowAllUsers from "./admin/pages/see-all-users/ShowAllUsers";
import ShowAllSchedules from "./admin/pages/show-schedules/ShowAllSchedules"


function App() {

  // props to createSchedule Component

  const { data, setData, loadData } = useContext(AllDataSchedules)

  const [showCreateScheduleComponent, setShowCreateScheduleComponent] = useState(false)

  // end props


  const { currentUser } = useContext(AuthContext)

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='sign-in' />
  }



  // get the data of the schedule 1 and 2 dropped when the formule 1 or 2 hours is clicked

  const [dataScheduleDropped, setDataScheduleDropped] = useState({})

  const getIdFirstHour = data => {
    setDataScheduleDropped(data)
  }

  const [formule, setFormule] = useState("")

  const getFormule = value => {
    setFormule(value)
  }

  const [dataScheduleDropped2, setDataScheduleDropped2] = useState({})

  const getIdSecondHour = data => {
    setDataScheduleDropped2(data)
  }



  // is paiement effectued in 7 days

  // const colref = collection(db, 'users')
  // const allUsers = useGetDatas(colref)

  // const { users } = useContext(AllUsersContext)



  // const actualDate = Date.now()

  // const [dataFilter, setDataFilter] = useState([])
  // const [nameToDelete, setNameToDelete] = useState('')
  
  // async function isPaiementEffectued() {
  //   await users.forEach(element => {
  //     if (element.hasPayed === false && actualDate > element.timeStampLimitPaiement && element.isRegisted === true && element.timeStampLimitPaiement !== 0) {
  //       const dataFilterWhereNameClickedIsPresent = data.filter(el => {
  //         if (el.usersRegisted) {
  //           setNameToDelete(element.nom + ',')
  //           return el.usersRegisted.includes(element.nom)
  //         }

  //       })
  //       setDataFilter(dataFilterWhereNameClickedIsPresent)
  //     }
  //   })
  // }


  // if (dataFilter.length === 1) {
  //   deletePlayeurBecauseHeNotPaid(dataFilter[0])
  // }
  // if (dataFilter.length === 2) {
  //   deletePlayeurBecauseHeNotPaid(dataFilter[0])
  //   deletePlayeurBecauseHeNotPaid(dataFilter[1])
  // }

  // async function deletePlayeurBecauseHeNotPaid(schedule) {
  //   const { usersRegisted, id } = schedule
  //   console.log(usersRegisted, id);

  //   if (usersRegisted.includes(nameToDelete)) {
  //     const splitUsers = usersRegisted.replace(nameToDelete, '')
  //     axios.put(`http://localhost:5001/api/update/${id}`, {
  //       ...schedule,
  //       usersRegisted: splitUsers

  //     })
  //   }

  //   const userDeleted = users.filter((el) => el.nom + ',' === nameToDelete)
  //   console.log(userDeleted);
  //   const userInfo = doc(db, "users", userDeleted[0].id);
  //   await updateDoc(userInfo, {
  //     isRegisted: false,
  //     dateInscription: '',
  //     timeStampInscription: 0,

  //   })
  // }


  // useEffect(() => {
  //   isPaiementEffectued()
  // }, [])




  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <ToastContainer position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ConnexionChoice />} />
            <Route path="/creer-un-compte" element={<SignUp />} />
            <Route path="/se-connecter" element={<SignIn />} />
            <Route path="/inscription">
              <Route index element={<ScheduleHomePage getIdFirstHour={getIdFirstHour} getFormule={getFormule} />} />
              <Route path="deuxieme-heure">
                <Route index element={<SecondHour dataScheduleDropped1={dataScheduleDropped} getIdSecondHour={getIdSecondHour} formule={formule} />} />
                <Route path="troisieme-heure" element={<ThirdHour dataScheduleDropped1={dataScheduleDropped} dataScheduleDropped2={dataScheduleDropped2} formule={formule} />} />
              </Route>
            </Route>
            <Route path='admin'>
              {/* <Route index element={<AdminLogin socket={socket} />} /> */}
              <Route path="accueil-admin">
                <Route index element={<AdminHomePage />} />
                <Route path="ajouter-un-creneau" element={<CreateScheduleHomePage />} />
                <Route path="ajouter-un-creneau/update/:id" element={<CreateSchedule title='Modifier un créneau' data={data} setData={setData} loadData={loadData} showCreateScheduleComponent={showCreateScheduleComponent} className='update-schedule-container' />} />
                <Route path="renseignement-joueurs" element={<ShowAllUsers />} />
                <Route path="voir-les-tableaux" element={<ShowAllSchedules />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </DndProvider>
  );
}

export default App;
