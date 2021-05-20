import React from 'react';
import { SafeAreaView, View, Text, StyleSheet} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    hug: '🤭' ,
    smile: '😊'  
}

import { Button } from '../components/Button'

export function Confirmation(){
    const navigation = useNavigation();

    const routes = useRoute();

    const {
        title, 
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params;

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]} 
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button 
                        title={buttonTitle}
                        onPress={handleMoveOn}
                     />
                </View>            
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }, 
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 56,
    },
    title: {
        fontSize: 20,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading_green,
        lineHeight: 35,
        marginTop: 17

    },
    subtitle: {
        fontSize: 15,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingHorizontal: 10,
        color: colors.heading_green
    }, 
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
})