import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import Login from './pages/Login';
import { Teacher } from './App';
import api from './services/api';

export interface UserRequired {
    user: Teacher
}
interface RoutesProps {
    onUserEntry: Function,
    user: Teacher
}

const Routes : React.FC<RoutesProps> = (props) => {

    function handleUser(accessToken: string) {
        api.get(`auth/login/${accessToken}`)
            .then(res => {
                props.onUserEntry(res.data.user);
            })
    }
    return (
        <BrowserRouter>
            <Route path="/" exact={true} render={() => <Landing user={props.user} />} />
            <Route path="/form" render={() => <TeacherForm user={props.user} />} />
            <Route path="/login" render={() => <Login onLogin={handleUser} />} />
            <Route path="/list" render={() => <TeacherList user={props.user} />} />
        
        </BrowserRouter>
    );
}

export default Routes;