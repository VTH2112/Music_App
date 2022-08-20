import { StyleSheet, Text, View, ScrollView, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import LibraryCard from '../components/LibraryCard';
import { serverUrl1, server } from '../apis/Serverurl';

const serverUrl = server;


const SearchScreen = ({ navigation, inputVal }) => {
    const [data, setData] = useState([]);
    const [text, onChangeText] = React.useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    let title = []
    let singer = []
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
        title.push(item.title.toLowerCase())
        singer.push(item.artist.toLowerCase())
        if (item.title[0].toUpperCase() === text[0] || item.artist[0].toUpperCase() === text[0]) {
            return (
                <LibraryCard ShowCard key={item.title}
                    name={item.title}
                    singer={item.artist}
                    artist={item.artist}
                    img={serverUrl + item.artwork}
                    id={item._id} url={serverUrl + item.url} />
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerFixed}>
                <View style={styles.block}>
                    <MaterialIcons name="search" size={35} color={"#fafafa"} />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#ffffff"
                        onChangeText={onChangeText}
                        onPressIn={() => {
                            setShowText(false)
                            setShowSearch(true)
                        }}
                        value={text}
                        style={styles.input}
                    />
                </View>
                <View style={styles.blockIcon}>
                    <MaterialCommunityIcons name="camera" size={30} color={"#fafafa"} />
                </View>
            </View>
            <View style={styles.contentCont}>
                {
                    showText ? (
                        <View style={styles.content}>
                            <Evillcons name="search" size={150} color={"#fafafa"} />
                            <Text style={styles.textHead}>Search Spotify</Text>
                            <Text style={styles.text}>Find your favorite songs, artists, albums,
                                podcasts, playlists, and friends
                            </Text>
                        </View>
                    ) : null
                }


                {
                    showSearch ? (
                        <View style={styles.FlatList}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={data}
                                renderItem={libraryCard}
                            />
                        </View>
                    ) : null
                }
            </View>
        </SafeAreaView>


    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    input: {
        width: 335,
        height: 50,
        color: 'white',
        fontSize: 16,
        paddingBottom: 10,
        paddingTop: 10,
    },
    headerFixed: {
        backgroundColor: '#191919',
        marginTop: 30,
        flexDirection: 'row',
    },
    block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#292929',
        width: '80%',
        borderRadius: 10,
        marginLeft: 20,
    },
    blockIcon: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    contentCont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 730,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '77%',
        textAlign: 'center',
        marginTop: -150,
    },
    textHead: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 30,
        marginTop: 60,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
    },
    FlatList: {
        marginTop: 20,
        marginBottom: 30,
    },
})

export default SearchScreen;