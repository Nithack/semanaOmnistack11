import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import './styles.css'
import api from '../../services/api';

export default function NewIncident (){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleNewIncident (e){
        e.preventDefault();
        const data ={
            title,
            description,
            value,
        }
        try {
           await api.post('incidents', data, {
               headers:{
                   Authorization: ongId,
               }
           })

           history.push('/profile')

        } catch (error) {
            alert('Não foi possivel efetuar o cadastro do Incident, tente novamente.')
        }

    }


    return (
    <div className="new-incident-ciontainer">
    <div className="content">
        <section>
            <img src={logoImg} alt="Be the Hero"/>
            <h1>Cadastrar Novo Caso</h1>
            <p>Descreva o caso detalhamente para encontrar um herói para resolver isso.</p>

            <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="e02041"/> Voltar Profile
            </Link>
        </section>

        <form>

            <input

                placeholder="Titulo do caso" 
                value={title}
                onChange={e =>setTitle(e.target.value)}

             />

            <textarea 
                type="email" 
                placeholder="Descrição"
                value={description}
                onChange={e =>setDescription(e.target.value)}
             />

            <input 
                placeholder="Valor em Reais" 
                value={value}
                onChange={e =>setValue(e.target.value)}
            />  
            
            <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
        </form>

     </div>

</div>
)
}