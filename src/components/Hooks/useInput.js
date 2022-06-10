import { useState } from "react";

const useInput = (valueCheck)=>{
    const [enteredValue, setEnteredValue] = useState("")
    const [isTouched, setIsTouched] = useState(false)

  const valueChangeHandler = (e)=>{
    setIsTouched(true)
    setEnteredValue(e.target.value)
  }
  const onBlurHandler = ()=>{
      setIsTouched(true)
  }
  const reset = ()=>{
      setEnteredValue("")
      setIsTouched(false)
  }
  const isValid = valueCheck(enteredValue) 
  const hasError = isTouched && !isValid

  return {enteredValue, isValid, valueChangeHandler, onBlurHandler, reset, hasError}
}

export default useInput