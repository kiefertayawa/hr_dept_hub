import { useAuthContext } from "./useAuthContext.js";


export const useLogout = () => {
    const { dispatch }  = useAuthContext()

    const logout =  () => {
        // removing the user from local storage
        localStorage.removeItem('user') 

        // logout
        dispatch({type: 'LOGOUT'})
        console.log("Logging out")
    }

    return{ logout }
}