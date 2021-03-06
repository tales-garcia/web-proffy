import React from 'react';
import './styles.css';
import logo from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import { Link } from 'react-router-dom';

interface HeaderProps {
    title: string;
    description?: string;
}

const Header : React.FC<HeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logo} alt="Logo"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> }
                {props.children}
            </div>
            
        </header>
    );
}

export default Header;