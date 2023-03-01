import React from 'react';
import {BiRightArrowAlt} from "react-icons/bi"

const NavigateNextHour = ({ navigateSecondHour, navigateThirdHour, wichHour }) => {
    return (
        <>

            <div className='next-hour' onClick={window.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription" || window.location.href === "https://lighthearted-shortbread-d1d16e.netlify.app/inscription/" ? navigateSecondHour : navigateThirdHour}>
                <p>Choisr sa {wichHour} heure</p>
                <BiRightArrowAlt className='icon'/>
            </div>
        </>
    );
};

export default NavigateNextHour;