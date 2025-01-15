import { useAuthContext } from "./useAuthContext.js";


export const useLogout = () => {
  

    const logout =  () => {
        // removing the user from local storage
        localStorage.removeItem('user') 

        // logout
        dispatch({type: 'LOGOUT'})
    }

    return{logout}
}