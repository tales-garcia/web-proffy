import React from 'react';
import whatsapp from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';
import { Teacher } from '../../pages/TeacherList';

interface teacherItemProps {
    user_data: Teacher
}

const TeacherItem: React.FC<teacherItemProps> = (props) => {
    async function createConnection(user_id: number) {
        await api.post("connections", {
            user_id
        });
    }

   return(
    <article className="teacher-item">
        <header>
            <img src={props.user_data.avatar} alt="Tales Garcia"/>
            <div>
                <strong>{props.user_data.name}</strong>
                <span>{props.user_data.subject}</span>
            </div>
        </header>

        <p>
            {props.user_data.bio}
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>RS {props.user_data.cost}</strong>
            </p>
            <button type="button" onClick={() => {
                window.open(`https://wa.me/${props.user_data.whatsapp}`);
                createConnection(props.user_data.id);
            }}>
                <img src={whatsapp} alt="whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
   ) 
}

export default TeacherItem;