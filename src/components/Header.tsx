import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import userImg from '../assets/klebson.png';
import fonts from '../styles/fonts';

export function Header(){

    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageuserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }    
        loadStorageuserName();    
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()+3
    },
    greeting: {
        fontSize: 28,
        color: colors.heading_green,
        fontFamily: fonts.text
    }, 
    userName: {
        fontSize: 28,
        fontFamily: fonts.heading,
        color: colors.heading_green,
        lineHeight: 36
    }, 
    image: {
        width: 72,
        height: 72,
        borderRadius: 36
    }
})