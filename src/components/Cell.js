import React, { useState } from "react";



const Places = ({ place }) => {

  return (

        <>
          {typeof place == 'string' ? (
            <tr className="place-prise">
              <td>Place Occupée</td>

            </tr>

          ) : (
            <tr className='empty'>
              <td >&nbsp;</td>
            </tr>
          )}
        </>
    
  )
}
export default Places;
