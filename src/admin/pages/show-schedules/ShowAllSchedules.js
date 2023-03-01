import React, { useContext, useState, useEffect } from 'react';
import ScheduleItem from '../../../components/ScheduleItem';
import { AllDataSchedules } from '../../../context/AllDataSchedules';
import Header from '../../components/Header';
import ScheduleItemAdmin from '../../components/ScheduleItemAdmin';

const ShowAllSchedules = () => {

    const { data } = useContext(AllDataSchedules)

    const [filter, setFilter] = useState({
        day: "",
        level: "",
        educator: "",
    })

    console.log(filter);

    const handleFilter = (e) => {
        const { name, value } = e.target
        setFilter({ ...filter, [name]: value })
    }
    return (
        <div className='show-all-schedules-container'>
            <Header toggleClassName={2} />
            <div className='header'>
                <h1>Tableaux d' inscription</h1>
            </div>

            {/* <select style={{ marginTop: "150px" }} name='day' onChange={handleFilter}>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
            </select> */}



            <div className="schedules">
                <>
                    {data.sort((a, b) => b.id - a.id).map((data) => {

                        return (
                            <div className='one-schedule'>
                                <ScheduleItemAdmin data={data} />

                            </div>
                        )
                    })}
                </>

            </div>

        </div>
    );
};

export default ShowAllSchedules;


