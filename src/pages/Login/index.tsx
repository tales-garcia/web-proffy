import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import logo from '../../assets/images/logo.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function Login() {
    //const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

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
                        label="Senha"
                        type="password"
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
                                <span className={rememberMe ? "remember-me enabled" : "remember-me"} onClick={() => {setRememberMe(!rememberMe)}} />
                                <label>Lembrar-me</label>
                            </div>
                            <p id="forgot-your-password">Esqueceu sua senha?</p>
                        </div>
                        <button className={"page-login-button" + (function() {
                            if(!password || !email) {
                                return " disabled";
                            }
                            return "";
                        })()}>Entrar</button>
                    </div>
                </form>
            </div>
            <div className="page-login-background">
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
            switch(res.data.status) {
                case 200:
                    console.log('Login realizado com sucesso!')
                break;
                default:
                    console.log(res.data.message)
                break;
            }
        }).catch(err => {console.error('Something went wrong: \n' + err)});
    }
}

export default Login;