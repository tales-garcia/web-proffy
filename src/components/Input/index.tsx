import React, { InputHTMLAttributes, useState } from 'react';
import showPasswordIcon from '../../assets/images/icons/show-password.svg';
import hidePasswordIcon from '../../assets/images/icons/hide-password.svg';
import './styles.css';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    divClass?: string
}

const Input : React.FC<inputProps> = ({ label, name, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    function getInputType() {
        if(rest.type === "password") {
            return showPassword ? "text" : "password";
        } else {
            return rest.type;
        }
    }
    return (
        <div className={"input-block" + (rest.divClass ? rest.divClass : "")}>
            <label htmlFor={name}>{label}</label>
            {(() => {
                if(rest.type === "password") {
                    return (
                        <div onClick={() => setShowPassword(!showPassword)} className="toggle-show-password">
                            <img src={showPassword ? hidePasswordIcon : showPasswordIcon } alt="" className="toggle-password-icon"/>
                        </div>
                    );
                }
            })()}
            <input
            id={name}
            {...rest}
            type={getInputType()} />
            
        </div>
    );
}

export default Input;