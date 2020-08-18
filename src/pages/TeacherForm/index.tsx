import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Header from '../../components/Header';

import warning from '../../assets/images/icons/warning.svg';

import './styles.css';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { UserRequired } from '../../routes';

const TeacherForm : React.FC<UserRequired> = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    let [schedulesItens, setScheduleitens] = useState([
        { week_day: '', from: '', to: '' }
    ]);

    function addNewSchedule() {
        setScheduleitens([...schedulesItens, { week_day: '', from: '', to: '' }]);
    }
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        api.post('users', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedules: schedulesItens
        }).then(() => history.push('/list'))
        .catch(() => console.error("Something went wrong: Please try again"));
    }
    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArray = schedulesItens.map((schedule, index) => {
            if(position === index) {
                return {...schedule, [field]: value}
            } else {
                return schedule;
            }
        });
        setScheduleitens(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <Header title="Que legal que você quer dar aulas." description="O primeiro passo, é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Seu dados</legend>

                        <Input name="name" label="Seu nome completo" value={name} onChange={e => {setName(e.target.value)}} />
                        <Input name="avatar" label="O URL da sua imagem" value={avatar} onChange={e => {setAvatar(e.target.value)}} />
                        <Input name="whatsapp" label="Seu Whatsapp" value={whatsapp} onChange={e => {setWhatsapp(e.target.value)}} />
                        <Textarea name="bio" label="Sua bigrafia" value={bio} onChange={e => {setBio(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => {setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação física', label: 'Educação física' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Teatro', label: 'Teatro' },
                            { value: 'Língua Portuguesa', label: 'Língua Portuguesa' },
                            { value: 'História', label: 'História' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Geometria', label: 'Geometria' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Filosofia', label: 'Filosofia' }
                        ]}
                        />
                        <Input type="number" name="cost" label="O custo da sua aula por hora" value={cost} onChange={e => {setCost(e.target.value)}} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewSchedule}>
                                + Novo horário
                            </button>
                        </legend>

                        {schedulesItens.map((schedule, index) => {
                            return (
                                <div className="schedule-item">
                                    <Select
                                        name="subject"
                                        label="Matéria"
                                        value={schedule.week_day}
                                        onChange={e => {setScheduleItemValue(index, 'week_day', e.target.value)}}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda' },
                                            { value: '2', label: 'Terça' },
                                            { value: '3', label: 'Quarta' },
                                            { value: '4', label: 'Quinta' },
                                            { value: '5', label: 'Sexta' },
                                            { value: '6', label: 'Sábado' }
                                        ]}
                                    />
                                    <Input type="time" value={schedule.from} label="Das" name="from" onChange={e => {setScheduleItemValue(index, 'from', e.target.value)}} />
                                    <Input type="time" value={schedule.to} label="Até" name="to" onChange={e => {setScheduleItemValue(index, 'to', e.target.value)}} />
                                </div>
                            )
                        })}
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warning} alt="warning"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;