import { useState, useEffect } from "react"

export const useDateHook = () => {
    
    const [date, setDate] = useState('')
    

    const actualDate = new Date

    const month = actualDate.getMonth() + 1

    useEffect(() => {
        
        switch(month) {
            case 1:
                setDate(actualDate.getDate() + ' ' + 'Janvier' + ' ' + actualDate.getFullYear());
            break;
            case 2:
                setDate(actualDate.getDate() + ' ' + 'Février' + ' ' + actualDate.getFullYear());
            break;
            case 3:
                setDate(actualDate.getDate() + ' ' + 'Mars' + ' ' + actualDate.getFullYear());
            break;
            case 4:
                setDate(actualDate.getDate() + ' ' + 'Avril' + ' ' + actualDate.getFullYear());
            break;
            case 5:
                setDate(actualDate.getDate() + ' ' + 'Mai' + ' ' + actualDate.getFullYear());
            break;
            case 6:
                setDate(actualDate.getDate() + ' ' + 'Juin' + ' ' + actualDate.getFullYear());
            break;
            case 7:
                setDate(actualDate.getDate() + ' ' + 'Juillet' + ' ' + actualDate.getFullYear());
            break;
            case 8:
                setDate(actualDate.getDate() + ' ' + 'Août' + ' ' + actualDate.getFullYear());
            break;
            case 9:
                setDate(actualDate.getDate() + ' ' + 'Septembre' + ' ' + actualDate.getFullYear());
            break;
            case 10:
                setDate(actualDate.getDate() + ' ' + 'Octobre' + ' ' + actualDate.getFullYear());
            break;
            case 11:
                setDate(actualDate.getDate() + ' ' + 'Novembre' + ' ' + actualDate.getFullYear());
            break;
            case 12:
                setDate(actualDate.getDate() + ' ' + 'Décembre' + ' ' + actualDate.getFullYear());
            break;

        }
    }, [])

    return date


}