import { useState, useRef } from "react";
import { useAuthContext } from "./useAuthContext.js";

export const useLogin = () => {
   const error = useRef(null)
   const [isLoading, setIsLoading] = useState(null)
   const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        error.current = null

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(username, password)
        })
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            error.current = json.error
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }
    }

    return { login, isLoading, error}
}