import { collection, doc, getDocs } from "firebase/firestore"
import React, { useEffect, useState } from "react"

const getDatas = async (array, value, data) => {
 array.push({  ...value.data(), id: value.id })
    data(array)
}
export const useGetDatas = (colRef) => {
    const [data, setData] = useState([])
    useEffect(() => {
            getDocs(colRef).then((snapshot) => {
                let array = []
                snapshot.docs.forEach((doc) => {
                    getDatas(array, doc, setData)
                    
                })
            }).catch(err => console.log(err.message))
    }, [])
    
    return data
}

