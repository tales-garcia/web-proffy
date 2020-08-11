import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import Login from './pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact={true} component={Landing} />
            <Route path="/form" component={TeacherForm} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={TeacherList} />
        
        </BrowserRouter>
    );
}

export default Routes;