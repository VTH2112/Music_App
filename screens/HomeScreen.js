import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import ShowCard from '../components/ShowCard';
import LinearGradient from 'react-native-linear-gradient'
import TrendingCard from '../components/TrendingCard';
import { cardData, showCardData, MixCardData } from '../data/Data';
import MixCard from '../components/MixCard';
import { serverUrl1, server } from '../apis/Serverurl';




console.log(cardData);
console.log(cardData.map(dat => dat.img));
const serverUrl = server;
// const serverUrl = server;
const HomeScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch('http://192.168.1.5:3000/playlist/62fbca4ee8588f32cbea05b3')
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                setData(resJson[0].songList)
                console.log(resJson[0].songList)
            }).finally(() => {
                setIsLoading(false)
            })
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const mixCard = ({ item }) => {
        console.log(item.artwork);
        return (
            <MixCard key={item.title}
                name={item.title}
                singer={item.artist}
                artist={item.artist}
                img={serverUrl + item.artwork}
                id={item._id} url={serverUrl + item.url} />
        )
    }
    const showCard = ({ item }) => {
        return (
            <ShowCard key={item.title}
                name={item.title}
                singer={item.artist}
                artist={item.artist}
                img={serverUrl + item.artwork}
                id={item._id} url={serverUrl + item.url} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.3, y: 0.2 }} end={{ x: 1, y: 1.2 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <View style={styles.subContainer}>
                        <Header />
                        <View style={styles.cardContainer}>
                            {cardData.map(dat =>
                                <PlaylistCard key={dat.name} name={dat.name} img={dat.img} duration={dat.duration} singer={dat.singer} />
                            )}
                        </View>
                        <View style={styles.showContainer}>
                            <Text style={styles.text}>Show to try</Text>
                            <FlatList
                                style={styles.FlatList}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                data={data}
                                renderItem={showCard}

                            />

                        </View>
                        <View style={styles.bestContainer}>
                            <Text style={styles.text}>Top Mixes</Text>
                            <FlatList
                                style={styles.FlatList}
                                horizontal
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                data={data}
                                renderItem={mixCard}
                            />
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