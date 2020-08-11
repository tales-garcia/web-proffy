import React, { useRef, FormEvent, useState } from 'react';
import Input from '../../components/Input';
import back from '../../assets/images/success-background.svg';
import logo from '../../assets/images/logo.svg';

import './styles.css';
import api from '../../services/api';

function Login() {
    const checkBox = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let rememberMe = false;
    return (
        <div className="page-login">
            <div className="page-form-container">
                <form onSubmit={handleSubmit} className="page-form">
                    <h2 className="page-login-title">Fazer Login</h2>
                    <div className="input-group" id="login-input-group">
                        <Input
                        autoComplete='off'
                        label="E-mail"
                        name="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        className="login-input"/>

                        <Input
                        autoComplete='off'
                        type="password"
                        label="Senha"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        name="password"
                        className="login-input"/>
                    </div>
                    <div className="form-footer-content">
                        <div className="form-options">
                            <div className="radio-group">
                                <input ref={checkBox} onClick={() => {
                                    if(checkBox.current) {
                                        rememberMe = checkBox.current.checked;
                                    }
                                }} type="checkBox" name="remember-me"/>
                                <label htmlFor="remember-me" className="remember-me-label">Lembrar-me</label>
                            </div>
                            <p id="forgot-your-password">Esqueceu sua senha?</p>
                        </div>
                        <button className="page-login-button">Entrar</button>
                    </div>
                </form>
            </div>
            <div className="page-login-background">
                {/* <img src={back} alt="Background image" className="background-image"/> */}
                <div className="container">
                    <div>
                        <img src={logo} alt="Logo" className="logo"/>
                        <h2 className="description">Sua plataforma de estudos online.</h2>
                    </div>
                </div>
            </div>
        </div>
    );

    function handleSubmit(ev: FormEvent) {
        ev.preventDefault();
        api.get('auth/login', {
            params: {
                email,
                password
            }
        }).then(res => {
            if(res.data.user) {
                console.log('Login realizado com sucesso!')
            }
        })
    }
}

export default Login;