import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2'

// export const startLoginEmailPassword = (email, password) => {
//     return (dispatch) => {
//         setTimeout(() => {
//             dispatch(login(123, 'Pedro'))
//         }, 3500);
//     }
// }

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        const auth = getAuth(firebaseApp)
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))

                dispatch(finishLoading())
            })
            .catch(e => {
                //console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    //Como es asíncrona voy a retornar un callback, tengo acceso al dispatch aquí gracias al thunk
    //Una vez que tenga grabado mi ususarion en firebase voy a disparar el dispatch
    return (dispatch) => {
        const auth = getAuth(firebaseApp)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                //console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth()
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
)


export const startLogout = () => {
    return async (dispatch) => {

        const auth = getAuth()
        await auth.signOut()

        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})