import React from 'react'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/auth' component={AuthRouter} />
                    <Route path='/' component={JournalScreen} />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
