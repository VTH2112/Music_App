import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import { cardData, showCardData, MixCardData } from '../data/Data';
import LibraryCard from '../components/LibraryCard';
const serverUrl = 'http://192.168.1.5:3000/static/';

const LibraryScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch('http://192.168.1.5:3000/song')
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                setData(resJson)
            }).finally(() => {
                setIsLoading(false)
            })
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const libraryCard = ({ item }) => {
        console.log(item.title);
        return (
            <LibraryCard key={item.title} title={item.title} artists={item.artist} img={serverUrl + item.artwork} />
        )

    }
    const [text, onChangeText] = React.useState("");
    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerFixed}>
                    <Text style={styles.textHead}>Music</Text>
                    <Text style={styles.textHead1}>Podcasts</Text>
                </View>
                <View style={styles.menuCont}>
                    <View style={styles.btnActive} >
                        <Button
                            // onPress={() => { }}
                            title="Playlists"
                            color="#191919"
                            style={styles.signUpBtn}
                        />
                    </View>
                    <View style={styles.btn} >
                        <Button
                            // onPress={() => {  }}
                            title="Artists"
                            color="#191919"
                            style={styles.signUpBtn}
                        />
                    </View>
                    <View style={styles.btn} >
                        <Button
                            // onPress={() => {  }}
                            title="Albums"
                            color="#191919"
                            style={styles.signUpBtn}
                        />
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardCreate}>
                        <View style={styles.cardIcon}>
                            <MaterialCommunityIcons name="plus" size={50} color={"#fafafa"} />
                        </View>
                        <View style={styles.cardText}>
                            <Text style={styles.text}>Create Playlist</Text>
                        </View>
                    </View>
                    <FlatList
                        style={styles.FlatList}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={libraryCard}

                    />
                </View>

            </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
    },
    headerFixed: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    textHead: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 30,
        marginTop: 60,
    },
    textHead1: {
        fontSize: 30,
        color: '#7e7e7e',
        marginBottom: 30,
        marginTop: 60,
        marginLeft: 20,
    },
    menuCont: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    btn: {
        marginRight: 20,
    },
    btnActive: {
        marginRight: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#89c96c',
    },
    cardContainer: {
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 70,
    },
    cardCreate: {
        flexDirection: 'row',
        marginBottom: 20,

    },
    cardIcon: {
        width: 100,
        height: 100,
        backgroundColor: '#2c2c2c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    FlatList: {
        marginBottom: 280,
        
    },
})

export default LibraryScreen;

