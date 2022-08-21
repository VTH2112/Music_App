import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, Pressable, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import { cardData, showCardData, MixCardData } from '../data/Data';
import LibraryCard from '../components/LibraryCard';
import { serverUrl1, server } from '../apis/Serverurl';

const serverUrl = server;

const ModalPopup = ({visible}) =>{
    const [showModal, setShowModal] = React.useState(true);
    console.log(showModal)
    return (<Modal  visible ={showModal} >
                <View style ={styles.modalBackGround}>
                <View style={styles.modalContainer}>
                <View style={styles.uploadMusicCont}>
                        <View style={styles.Avatar}>
                            <Image style={{ height: 160, width: 160, borderRadius: 160 / 2, }} source={require("../assets/img/songs/1.webp")} />
                        </View>
                        <View style={styles.block}>
                            <TextInput
                                placeholder="Title"
                                //onChangeText={onChangeTitle}
                                placeholderTextColor="#b1b2b7"
                                //value={Title}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Artist"
                                //onChangeText={onChangeArtists}
                                placeholderTextColor="#b1b2b7"
                                //value={Artists}
                                style={styles.input}

                            />
                            <TextInput
                                placeholder="Artworks"
                                //onChangeText={onChangeArtworks}
                                placeholderTextColor="#b1b2b7"
                                //value={Artworks}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Music Url"
                                placeholderTextColor="#b1b2b7"
                                //onChangeText={onChangeUrl}
                                //value={Url}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Type"
                                //onChangeText={onChangeType}
                                placeholderTextColor="#b1b2b7"
                                //value={Type}
                                style={styles.input}
                            />
                            <View style={styles.btnSub} >
                            <Pressable
                                style={styles.btnSub}
                            >
                                <Text>
                                Submit
                                </Text>
                            </Pressable>
                        </View>
                        </View>

                    </View>
                </View>
                </View>
    </Modal>)
};

const UpSongScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [Title, onChangeTitle] = React.useState("");
    const [Artists, onChangeArtists] = React.useState("");
    const [Artworks, onChangeArtworks] = React.useState("");
    const [Url, onChangeUrl] = React.useState("");
    const [Type, onChangeType] = React.useState("");
    useEffect(() => {
        fetch(serverUrl1+'song')
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
            <View style={styles.headerFixed}>
                <Text style={styles.textHead}>My</Text>
                <Text style={styles.textHead1}>Music</Text>
            </View>
            <View style={styles.menuCont}>
                <View style={styles.btnActive} >
                    <Button
                        // onPress={() => { }}
                        title="Song List"
                        color="#191919"
                        style={styles.signUpBtn}
                    />
                </View>
                {/* <View style={styles.btn} >
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
                </View> */}
            </View>

                <View style={styles.cardCreate}>
                    <Pressable onPress={()=>{setVisible(true)}}>
                        <View style={styles.cardIcon} >
                            <MaterialCommunityIcons name="plus" size={50} color={"#fafafa"} />
                        </View>
                    </Pressable>
                    <View style={styles.cardText}>
                        <Text style={styles.text}>Post Song</Text>
                    </View>

                </View>

                <FlatList
                    style={styles.FlatList}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={libraryCard}
                />
                <ModalPopup visible={visible}>

                </ModalPopup>
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
    modalBackGround:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'

    }, 
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    uploadMusicCont: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#8A2BE2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        marginBottom: 70,
        paddingTop: 20,
    },
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: 335,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        color: 'black',
        fontSize: 16,
        paddingLeft: 30,
        paddingBottom: 5,
        paddingTop: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    btnSub: {
        borderColor: "#8A2BE2",
        width: "100%",
    },
})

export default UpSongScreen;