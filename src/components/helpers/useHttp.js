import { useState, useCallback } from "react";

const useHttp = () =>{
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataHasError, setDataHasError]= useState(false)
    const sendRequest = useCallback(async function(url, uploadData=undefined){
    try{
        setIsLoading(true)
        const fetchPro = uploadData ? fetch(url, {method:"POST", body:JSON.stringify(uploadData), headers: {
            'Content-Type': 'application/json',
          },}) : fetch(url)
    
    const res = await fetchPro
    const data = await res.json()
    if(!res.ok) throw new Error("Meals are not found")
    setMeals(data["-N3_vDoX1GxIT0nYZFjB"])}
        
    catch(err){
        setDataHasError(true)
    }
    setIsLoading(false)
}, [])

    return {meals, dataHasError, isLoading, sendRequest}
}

export default useHttp