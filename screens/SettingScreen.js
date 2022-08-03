import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import HeaderSetting from '../components/HeaderSetting';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'


const SettingScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.3, y: 0.2 }} end={{ x: 1, y: 1.2 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <HeaderSetting />
                </ScrollView>
            </LinearGradient>

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 210,
    },
    text: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    showContainer: {
        marginTop: 30,
        flex: 1,
        minHeight: 60
    },
    bestContainer: {
        marginTop: 30,
        marginBottom: 70,
        flex: 1,
        minHeight: 60
    }
})

export default SettingScreen;

