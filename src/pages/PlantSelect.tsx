import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { EnvironmentButton } from '../components/EnvironmentButton'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantProps } from '../libs/storage';

import api from '../services/api';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface EnvironmentProps {
    key: string;
    title: string;
}

export function PlantSelect(){

    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();
    
    function handleEnvironmentSelected(environment: string){
        setEnviromentSelected(environment);
        if (environment == 'all'){
            return setFilteredPlants(plants);
        }
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )
        setFilteredPlants(filtered);        
    }

    async function fetchPlants(){
        const { data } = await api.
            get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if (!data){
            return setLoading(true);
        }

        if (page > 1){
            setPlants(oldValue => [...oldValue, ...data]);    
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);//começar filtrado com o Todos                
        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number){
        if (distance < 1){ //rolando para cima
            return;
        }
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {
        async function fetchEnvironments(){
            const { data } = await api.
                get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'

                },
                ...data
            ]);
        }

        fetchEnvironments();
    },[])

    useEffect(() => {
        fetchPlants();
    },[])       

    if (loading){
        return <Load />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente                
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?              
                </Text>
            </View>
            <View>
                <FlatList
                    data= {environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton 
                            title={item.title} 
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        /> 
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />                
            </View>

            <View style={styles.plants}>
                <FlatList
                    data= {filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        /> 
                    )} 
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd}) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore 
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />                
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background        
    },
    header: {
        paddingHorizontal: 30,        
    },
    title: {
        fontSize: 15,
        color: colors.heading_green,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        fontSize: 15,
        color: colors.heading_green,
        fontFamily: fonts.text,      
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 35,        
        marginVertical: 20
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})