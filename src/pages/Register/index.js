import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [city , setCity] = useState('');
    const [state , setState] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            phone,
            city,
            state
        }

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso ${response.data.id}`);
            history.push('/');
        } catch(err) {
            alert('Erro no cadastro, tente novamente.')
        } 
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" type="text"
                    value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail"
                    value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Telefone"
                    value={phone} onChange={e => setPhone(e.target.value)}/>

                    <div className="input-group">
                        <input type="text" placeholder="Cidadde"
                        value={city} onChange={e => setCity(e.target.value)}/>
                        <input type="text" placeholder="UF" style={{ width: 80 }}
                        value={state} onChange={e => setState(e.target.value)}/>
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}