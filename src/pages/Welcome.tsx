import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {Feather}  from '@expo/vector-icons'

import wateringImg from '../assets/watering.png';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>
                {
                    <Image                
                        source={wateringImg} 
                        style={styles.image}    
                        resizeMode="contain"             
                    />
                }
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7} 
                    onPress={handleStart}
                >                    
                    <Feather style={styles.buttonIcon} name="chevron-right" />
                    
                </TouchableOpacity>
            </View>
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({    
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: colors.heading_green,
        marginTop: 40,
        fontFamily: fonts.heading,
        lineHeight: 30
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        paddingHorizontal: 20,
        color: colors.heading_green,
        fontFamily: fonts.text
    },
    image: {
        width: Dimensions.get('window').width * 0.8
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 24,
        color: colors.white
    }
});