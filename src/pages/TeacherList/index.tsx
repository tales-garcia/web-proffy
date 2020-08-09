import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

export interface Teacher {
    id: number,
    name: string,
    avatar: string,
    subject: string,
    bio: string,
    cost: string,
    whatsapp: string,
}

function TeacherList() {

    const [week_day, setWeek_day] = useState('');
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');

    const [classes, setClasses] = useState([]);

    useEffect(()=> {
        api.get('classes').then(res => {
            setClasses(res.data);
        });
    }, []);

    useEffect(()=> {
        UpdateFilters();
    }, [time, week_day, subject]);

    function UpdateFilters() {
        let params = {
            time,
            week_day,
            subject
        }

        api.get('classes', {params}).then(res => {
            setClasses(res.data);
        });
    }

    return (
        <div id="page-teacher-list" className="container">
            <Header title="Estes são os Proffys disponíveis">
                <form id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
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
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeek_day(e.target.value)}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda'},
                            {value: '2', label: 'Terça'},
                            {value: '3', label: 'Quarta'},
                            {value: '4', label: 'Quinta'},
                            {value: '5', label: 'Sexta'},
                            {value: '6', label: 'Sábado'},
                        ]}
                    />
                    <Input
                    type="time"
                    name="time"
                    label="Horário"
                    value={time}
                    onChange={e => setTime(e.target.value)} />
                </form>
            </Header>
            <main>
                {classes.map((user: Teacher) => <TeacherItem key={user.id} user_data={user} />)}
            </main>
        </div>
    );
}

export default TeacherList;