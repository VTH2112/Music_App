import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, Modal, Alert, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import { cardData, showCardData, MixCardData } from '../data/Data';
import LibraryCard from '../components/LibraryCard';
import { serverUrl1, server } from '../apis/Serverurl';
import InputCard from '../components/inputCard';

const serverUrl = server;

const LibraryScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showUpload, setShowUpload] = useState(true);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            <LibraryCard key={item.title}
                name={item.title}
                singer={item.artist}
                artist={item.artist}
                img={serverUrl + item.artwork}
                id={item._id} url={serverUrl + item.url} />
        )

    }
    const [text, onChangeText] = React.useState("");
    return (
        <SafeAreaView style={styles.container}>
            {showUpload ? (
                <View style={styles.listCardCont}>
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
                            <Pressable style={styles.cardIconCont} onPress={() => setShowUpload(false)}    >
                                <View style={styles.cardIcon}>
                                    <MaterialCommunityIcons name="plus" size={50} color={"#fafafa"} />
                                </View>
                                <View style={styles.cardText}>
                                    <Text style={styles.text}>Create Playlist</Text>
                                </View>
                            </Pressable>

                        </View>
                        {
                            showUpload ? (
                                <FlatList
                                    style={styles.FlatList}
                                    showsHorizontalScrollIndicator={false}
                                    data={data}
                                    renderItem={libraryCard}

                                />

                            ) :

                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setShowUpload(true)}
                                        >
                                            <MaterialCommunityIcons name="close" size={20} color="white" />
                                        </Pressable>
                                        <Text style={styles.modalText}>Add to Playlist</Text>
                                        <InputCard />
                                        <View style={styles.btnSub} >
                                            <Button
                                                onPress={() => { setShowUpload(true) }}
                                                title="Submit"
                                                color="rgba(55, 52, 52, 0.9)"
                                                style={styles.btnSub}
                                            />
                                        </View>
                                    </View>
                                </View>

                        }
                    </View>
                </View>

            ) : <ScrollView scrollEnabled={true}>

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
                        <Pressable style={styles.cardIconCont} onPress={() => setShowUpload(false)}    >
                            <View style={styles.cardIcon}>
                                <MaterialCommunityIcons name="plus" size={50} color={"#fafafa"} />
                            </View>
                            <View style={styles.cardText}>
                                <Text style={styles.text}>Create Playlist</Text>
                            </View>
                        </Pressable>

                    </View>
                    {
                        showUpload ? (

                            isLoading ?
                                <ActivityIndicator size="large" color="#90EE90" /> : <FlatList
                                    style={styles.FlatList}
                                    showsHorizontalScrollIndicator={false}
                                    data={data}
                                    renderItem={libraryCard}

                                />


                        ) :

                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setShowUpload(true)}
                                    >
                                        <MaterialCommunityIcons name="close" size={20} color="white" />
                                    </Pressable>
                                    <Text style={styles.modalText}>Add to Playlist</Text>
                                    <InputCard />
                                    <View style={styles.btnSub} >
                                        <Button
                                            onPress={() => { setShowUpload(true) }}
                                            title="Submit"
                                            color="rgba(55, 52, 52, 0.9)"
                                            style={styles.btnSub}
                                        />
                                    </View>
                                </View>
                            </View>

                    }
                </View>
            </ScrollView>}

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
    cardIconCont: {
        flexDirection: 'row',
    },
    centeredView: {

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    modalView: {
        backgroundColor: 'rgba(55, 52, 52, 0.9)',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 5,
        marginRight: 5,
    },
    modalText: {
        fontSize: 20,
        color: '#fff',
        marginTop: 10,
    },
    btnSub: {
        borderColor: "white",
        borderWidth: 1,
        width: "40%",
        marginBottom: 10,
    },
    listCardCont: {
        height: '100%',
    },

})

export default LibraryScreen;