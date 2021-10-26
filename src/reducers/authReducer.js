import { types } from "../types/types";

/*

El objeto que voy a manejar aquí tendrá la siguiente información del usuario 
    {
        uid: 'jkl123',
        name: 'Galileo'
    }
    
*/
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout:
            return {}

        default:
            return state
    }
}