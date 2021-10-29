import React, { useEffect, useState } from 'react'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom"
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import Loader from "react-loader-spinner"
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {

    const dispatch = useDispatch()

    //Voy a manejar un estado local hasta obtener la respuesta de Firebase
    const [checking, setCheking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            //console.log(user)
            if (user?.uid) {
                // Al iniciar sesión, voy a recuperar los datos de mi usuario, sus notas y setear el estado en isLoggedIn en TRUE
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))

            } else {
                setIsLoggedIn(false)
            }

            setCheking(false)
        })
    }, [dispatch, setCheking, setIsLoggedIn])

    if (checking) {
        return (
            <div style={{ display: 'flex', height: '100vh', background: '#5c62c5', justifyContent: 'center', alignItems: 'center' }}>
                <Loader type="Oval" color='#fff' height={80} width={80} />
            </div >
        )
    }
    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path='/auth'
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        path='/'
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
