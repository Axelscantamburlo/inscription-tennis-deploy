import React from 'react';
import { useContext } from 'react';
import { GetDataOneSchedule } from '../context/GetDataOneSchedule';
import { CgCalendarToday } from 'react-icons/cg'
import { WiTime4, WiTime7 } from 'react-icons/wi'
import { MdSportsTennis } from 'react-icons/md'
import { MdFormatListNumberedRtl } from 'react-icons/md'
import { FaChalkboardTeacher } from 'react-icons/fa'

const ShowMoreInformationScheduleClicked = ({ dataScheduleClicked, setShowMoreInfoState }) => {

    const { day, startHour, endHour, level, numberOfPlaces, educator, secondEducator } = dataScheduleClicked


    function closeModal() {
        setShowMoreInfoState(false)
    }
    return (
        <div className='show-schedule-clicked-container show-more-info-container' style={{ zIndex: "40" }}>
            <h1 className="h1-title">Plus d 'Informations</h1>
            <div className="close-icon" onClick={closeModal}><span>&times;</span></div>

            <div className="row">
                <span><h4><CgCalendarToday /> Jour :</h4> <h3>{day}</h3> </span>
            </div>
            <div className="row">
                <span><h4><WiTime4 /> Début :</h4>  <h3>{startHour}</h3></span>
                <span><h4><WiTime7 /> Fin :</h4> <h3>{endHour}</h3> </span>
            </div>
            <div className="row">
                <span><h4><MdSportsTennis /> Niveau :</h4> <h3> {level}</h3></span>
                <span><h4><MdFormatListNumberedRtl /> Nombre de Places :</h4>  <h3>{numberOfPlaces}</h3></span>
            </div>

        </div>
    );
};

export default ShowMoreInformationScheduleClicked;