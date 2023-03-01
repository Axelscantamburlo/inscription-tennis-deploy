import { collection } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../../config/firebase-config';
import Loader from '../../../helper/Loader';
import { useGetDatas } from '../../../hooks/useGetDatas';
import Header from '../../components/Header';
import { AiOutlineSearch } from 'react-icons/ai'
import InfoUserModal from '../../components/InfoUserModal';
import { AllDataSchedules } from '../../../context/AllDataSchedules';

const ShowAllUsers = () => {

    const {data} = useContext(AllDataSchedules)

    const [usersToMap, setUsersToMap] = useState([])

    const colref = collection(db, 'users')
    const allUsers = useGetDatas(colref)

    useEffect(() => {

        setUsersToMap(allUsers)
    }, [allUsers])




    const [infoUserModal, setInfoUserModal] = useState(false)
    const [userClicked, setUserClicked] = useState([])

    const [searchBar, setSearchBar] = useState('')

    const filterName = (e) => {
        const value = e.target.value
        setSearchBar(value)
        const nameFilter = allUsers.filter((el) => el.nom.toLowerCase().includes(value))

        setUsersToMap(nameFilter)
        setSearchBar(value)
    }


    const [loader, setLoader] = useState(false)

    if (loader) {
        setTimeout(() => setLoader(false), 3000)
    }


    const actualDate = Date.now()

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className='show-all-users-container'>
                    <Header toggleClassName={3} />

                    <div className='header'>
                        <h1>Renseignements joueurs</h1>
                    </div>
                    <div className="input-container">
                        <div className="input">
                            <AiOutlineSearch />
                            <input type="text" onChange={filterName} placeholder='Chercher un joueur' value={searchBar} />
                            <span style={searchBar === '' ? { display: 'none' } : { display: 'flex' }} onClick={() => {
                                setSearchBar('')
                                setUsersToMap(allUsers)
                            }}><p>&times;</p></span>
                        </div>
                    </div>
                    <div className="all-users-container">
                        {usersToMap.map((user) => {
                            const { nom, dateInscription, hasPayed, timeStampLimitPaiement, isRegisted } = user


                            const dataFilterWhereNameClickedIsPresent = data.filter(el => {
                                if (el.usersRegisted) {
                                    return el.usersRegisted.includes(nom)

                                }
                            })

                            console.log(dataFilterWhereNameClickedIsPresent);

                            return (
                                <>
                                    <ul className='user' onClick={() => {
                                        setInfoUserModal(true)
                                        setUserClicked([user])

                                    }} style={actualDate > timeStampLimitPaiement && hasPayed === false && timeStampLimitPaiement !== 0 && isRegisted === true ? { border: '5px solid #ef6767' } : hasPayed ? { border: '5px solid #2E933C' } : null} >
                                        <li className='first-li'><span>{nom}</span></li>
                                        {dateInscription !== "" && dataFilterWhereNameClickedIsPresent.length !== 0 ? <li>Inscrit</li> : <li style={{color: '#ef6767'}}>Pas encore inscrit</li>}
                                        {hasPayed ? <li>Payé</li> : <li>Non Payé</li>}

                                    </ul>
                                </>
                            )
                        })}
                    </div>
                    {infoUserModal && <InfoUserModal userClicked={userClicked} setInfoUserModal={setInfoUserModal} setLoader={setLoader} />}

                </div>
            )}
        </>
    );
};

export default ShowAllUsers;