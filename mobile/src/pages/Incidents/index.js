import React, { useState, useEffect } from 'react';
import {Feather}from '@expo/vector-icons'
import { View,FlatList, Image, Text, TouchableOpacity} from 'react-native';

import{useNavigation} from '@react-navigation/native'

import api from '../../services/api';

import logoImg from '../../assets/logo.png'
import styles from './styles'


export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail', {incident});
    }
    async function loadIncidents(){
        if (loading){
            return;
        }
        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true)

        const response= await api.get('incidents?page=${page}',);

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    },[])

    return (
 
        <View style={styles.countainer}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e seja um Heroi</Text>

            <FlatList
            data={incidents}
            style={styles.incidentsList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.3}
            renderItem={({item: incident})=>(
                 <View style={styles.incident}>

                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                   
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                   
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        {style:'currency',
                        currency:'BRL'}).format(incident.value)}
                    </Text>

                    <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={()=> navigationToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Veja mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>
                </View>
            )}
            />          
        </View> 

    )
}