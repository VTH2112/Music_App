

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import ShowCard from '../components/ShowCard';
import LinearGradient from 'react-native-linear-gradient'
import TrendingCard from '../components/TrendingCard';
import { cardData, showCardData,MixCardData } from '../data/Data';
import MixCard from '../components/MixCard';
import Icon from 'react-native-vector-icons/FontAwesome5';



console.log(cardData);
console.log(cardData.map(dat => dat.img));

const HomeScreen = ({ navigation }) => {
    
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.3, y: 0.2 }} end={{ x: 1, y: 1.2 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <View style={styles.subContainer}>
                        <Header />
                        <View style={styles.cardContainer}>
                            {cardData.map(dat => <PlaylistCard key={dat.name} name={dat.name} img={dat.img} />)}
                        </View>
                        <View style={styles.showContainer}>
                            <Text style={styles.text}>Show to try</Text>
                            <ScrollView horizontal={true}>
                                {
                                    showCardData.map(dat =>
                                        <ShowCard key={dat.name} name={dat.name} artists={dat.singer} img={dat.img} />
                                    )}
                            </ScrollView>

                        </View>
                        <View style={styles.bestContainer}>
                            <Text style={styles.text}>Top Mixes</Text>
                            <ScrollView horizontal={true}>
                                {
                                    MixCardData.map(dat =>
                                        <MixCard key={dat.name} name={dat.name} artists={dat.singer} img={dat.img} />
                                    )}
                            </ScrollView>

                        </View>

                    </View>
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

export default HomeScreen;

