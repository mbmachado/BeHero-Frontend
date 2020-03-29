import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setvalue] = useState('');
    const history = useHistory();
    const ongID = localStorage.getItem('ongID');
    
    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongID
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Não foi possível criar caso. Tente novamente');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título do caso" type="text"/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"></textarea>
                    <input type="text" value={value} onChange={(e) => setvalue(e.target.value)}
                    placeholder="Valor em R$"/>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}