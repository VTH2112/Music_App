import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PlaylistCard from '../components/PlaylistCard';
import ShowCard from '../components/ShowCard';
import LinearGradient from 'react-native-linear-gradient'
import TrendingCard from '../components/TrendingCard';
import { cardData, showCardData, MixCardData } from '../data/Data';
import MixCard from '../components/MixCard';
import { serverURL, server } from '../apis/Serverurl';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
// console.log(cardData);
// console.log(cardData.map(dat => dat.img));
const HomeScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    const [dataSong, setDataSong] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataPlaylist, setPlaylist] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        fetch(server +"/song")
        .then(res => {
            return res.json()
        })
        .then(resJson => {
            setDataSong(resJson)
            console.log(resJson)
        }).finally(() => {
            setIsLoading(false)
        })
    navigation.setOptions({
        headerShown: false,
    });

    fetch(server +"/playlist")
        .then(res => {
            return res.json()
        })
        .then(resJson => {
            setPlaylist(resJson)
            console.log("data playlist: ")
            console.log(resJson)
        }).finally(() => {
            setIsLoading(false)
        })
    navigation.setOptions({
        headerShown: false,
    });
      }, []);


    useEffect(() => {

        fetch(server +"/song")
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                setDataSong(resJson)
                console.log(resJson)
            }).finally(() => {
                setIsLoading(false)
            })
        navigation.setOptions({
            headerShown: false,
        });

        fetch(server +"/playlist")
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                setPlaylist(resJson)
                console.log("data playlist: ")
                console.log(resJson)
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
                img={serverURL + item.artwork}
                id={item._id} url={serverURL + item.url} />
        )
    }
    const showCard = ({ item }) => {
        return (
            <ShowCard key={item.title}
                name={item.title}
                singer={item.artist}
                artist={item.artist}
                img={serverURL + item.artwork}
                id={item._id} url={serverURL + item.url} />
        )
    }
    const PlayListCard = ({ item }) => {
        return (
            <PlaylistCard key={item._id}
                name={item.name}
                singer={item.owner}
                artist={item.owner}
                img={serverURL + item.img}
                id={item._id} url={serverURL + item.url} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.3, y: 0.2 }} end={{ x: 1, y: 1.2 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />} 
                >
                    <View style={styles.subContainer}>
                        <Header />
                        <View style={styles.cardContainer}>
                            {isLoading ?
                                <ActivityIndicator size="large" color="#90EE90" /> :
                                <FlatList
                                    style={styles.FlatList}
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={true}
                                    data={dataPlaylist}
                                    renderItem={PlayListCard}

                                />}
                        </View>
                        <View style={styles.showContainer}>
                            <Text style={styles.text}>Show to try</Text>
                            {isLoading ?
                                <ActivityIndicator size="large" color="#90EE90" /> :
                                <FlatList
                                    style={styles.FlatList}
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={dataSong}
                                    renderItem={showCard}

                                />}
                        </View>
                        <View style={styles.bestContainer}>
                            <Text style={styles.text}>Top Mixes</Text>
                            {isLoading ?
                                <ActivityIndicator size="large" color="#90EE90" /> : <FlatList
                                    style={styles.FlatList}
                                    horizontal
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={dataSong}
                                    renderItem={mixCard}
                                />}

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
        height: '100%',
        backgroundColor: "black",
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
        maxHeight: 390,
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