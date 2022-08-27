import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useReducer } from 'react';
import HeaderCard from '../../components/HeaderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import ListMusic from '../../components/listMusic';
import { cardData, showCardData, MixCardData } from '../../data/Data';
import TrackPlayer, { Capability, Event, RepeatMode, State, useProgress, useTrackPlayerEvents, usePlaybackState } from 'react-native-track-player';
//  import songs from '../../assets/data'
import Slider from '@react-native-community/slider';
import axiosIntance, { updateToken } from "../../apis/axios";
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server, serverURL } from '../../apis/Serverurl';
let song_ = []
let song = []
let singleSong = []
const MusicPlayerScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isShow, setIsShow] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const getSong = async (id) => {
        const res = await axiosIntance.get("/playlist/" + id, {
            // params:{
            //     id: "62fbcb17e8588f32cbea05b7"
            // }
        }).then(
            res => {
                console.log("id: ");
                console.log(id);
                song_ = res.data[0].songList
                setData(song_)
            }
        ).catch(error => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        });

    }
    const setupPlayer = async (id) => {
        console.log("setupPlayer")
        console.log(id)
        await getSong(id)
        console.log(song_);
        song_.map(item => {
            song.push({
                title: item.title,
                id: item.id,
                artist: item.artist,
                url: serverURL + item.url,
                artwork: serverURL + item.artwork,
                duration: item.duration
            })
        })
        try {


            // console.log(AsyncStorage.getItem("idAudio"));
            // console.log('id: =' + params.id);
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(song);
            await TrackPlayer.play();
            await setTitle(song[0].title)
            await setArtist(song[0].artwork)
            console.log(song[0].title);
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    const togglePlayBack = async (playbackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log("playbackState: " + playbackState);
        console.log("State.Paused: " + State.Paused);
        if (currentTrack != null) {
            if (playbackState === State.Paused) {
                console.log("play");
                await TrackPlayer.play();
                console.log("played");
            } else {
                await TrackPlayer.pause();
            }
        }
    }


    useEffect(() => {
        setupPlayer(route.params.id)
        navigation.setOptions({
            headerShown: false,
        });
        // TrackPlayer.play();
        // scrollX.addListener(({value}) =>{
        //     const index = Math.round(value/width);
        //     skipto(index);
        //     setSongIndex(index)
        // })
    }, [])
    const listCard = ({ item }) => {
        return (
            <ListMusic key={item.title}
                name={item.title}
                singer={item.artist}
                artist={item.artist}
                img={serverURL + item.artwork}
                id={item._id} url={serverURL + item.url} />
        )
    }

    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [title, setTitle] = useState("")
    const [artwork, setArtwork] = useState("")
    const [songindex, setSongindex] = useState(0)

    let idAudio = null

    AsyncStorage.getItem("idAudio").then((value) => {
        idAudio = value;

        console.log("idAudio: " + idAudio)
        console.log("params.id: " + route.params.id)
        song.map(item => {
            if (item.title === route.params.name) {
                singleSong = [{
                    title: route.params.name,
                    id: route.params.id,
                    artist: route.params.artist,
                    url: route.params.url,
                    artwork: route.params.artwork,
                    duration: route.params.duration
                }]
                // console.log(item.title);
                // console.log(route.params.name);
                item.id = route.params.id
                // console.log(item);
                if (idAudio !== route.params.id) {
                    console.log('DETROY');
                    TrackPlayer.reset();
                    AsyncStorage.setItem("idAudio", route.params.id);
                    TrackPlayer.setupPlayer();
                    TrackPlayer.add(singleSong);
                    TrackPlayer.play();
                    TrackPlayer.updateOptions({
                        capabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.SkipToNext,
                            Capability.SkipToPrevious,
                            Capability.Stop,
                        ],
                    });
                }
            }
        })
    })
    const Next = async () => {
        await TrackPlayer.skipToNext();
        let newIndex = 0;
        newIndex = songindex === song.length ? song.length : songindex + 1;
        await setSongindex(newIndex)
        await setTitle(song[newIndex].title)
        await setArtwork(song[newIndex].artwork)
    }
    const Pre = async () => {
        await TrackPlayer.skipToPrevious()
        let newIndex = 0;
        newIndex = songindex === 0 ? 0 : songindex - 1;
        await setSongindex(newIndex)
        await setTitle(song[newIndex].title)
        await setArtwork(song[newIndex].artwork)
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderCard />
            <View style={styles.headContainer}>
                <View style={styles.headerCont}>
                    <View style={styles.textCont}>
                        <Text style={styles.text}>{isShow ? route.params.name : title}
                        </Text>
                    </View>
                    <View style={styles.imgDisk}>
                        <Image style={{ height: 330, width: 330, borderRadius: 330 / 2 }} resizeMode={"cover"} source={{ uri: isShow ? route.params.img : artwork }} />
                    </View>
                </View>
                <Slider
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor="#FFD369"
                    minimumTrackTintColor="#FFD369"
                    maximumTrackTintColor="#FFF"
                    onSildingComplete={async (value) => {
                        await TrackPlayer.seekTo(value);
                    }}
                    style={styles.sl}
                />
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "white" }}>
                            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                        </Text>
                        {/* <Text>
                                    {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14,5)}
                                </Text> */}
                    </View>
                </View>
                <View style={styles.iconCont}>

                    <IconButton style={styles.icon}
                        icon="reload"
                        color="white"
                        size={35}
                    // onPress={() => {
                    //     navigation.navigate('#')
                    // }}
                    />
                    <Pressable onPress={async () => {
                        Pre()
                        setIsShow(false)
                    }} >
                        <IconButton style={styles.icon}
                            icon="step-backward"
                            color="white"
                            size={35}
                        // onPress={() => { navigation.navigate('#') }}
                        />
                    </Pressable>
                    <Pressable onPress={() => togglePlayBack(playbackState)}>
                        <IconButton style={styles.icon}
                            icon={playbackState === State.Playing ? "pause" : "play"}
                            color="white"
                            size={35}
                        //onPress={() => { navigation.navigate('#') }}
                        />
                    </Pressable>
                    <Pressable onPress={async () => {
                        Next()
                        setIsShow(false)
                    }} >
                        <IconButton style={styles.icon}
                            icon="step-forward"
                            color="white"
                            size={35}
                        // onPress={() => { navigation.navigate('#') }}
                        />
                    </Pressable>
                    <IconButton style={styles.icon}
                        icon="shuffle-variant"
                        color="white"
                        size={35}
                        onPress={() => { navigation.navigate('#') }}
                    />
                </View>
            </View>
            <View style={styles.songCont}>
                {/* <View style={styles.songBorder}>
                    <View style={styles.ImageSongCont}>
                        <Image style={{ height: 80, width: 80, borderRadius: 120 / 2 }} source={{ uri: route.params.img }} />
                    </View>
                    <View style={styles.textSongCont}>
                        <Text style={styles.songText} numberOfLines={1}>{route.params.name}</Text>
                        <Text style={styles.subText} numberOfLines={1}>{route.params.singer}</Text>
                    </View>
                    <View style={styles.iconSongCont}>
                        <IconButton style={styles.icon}
                            icon="heart"
                            color="white"
                            size={17}
                            onPress={() => { navigation.navigate('#') }}
                        />
                        <Text style={styles.duration}>{route.params.duration}</Text>
                    </View>
                </View> */}
                {isLoading ? <ActivityIndicator size="large" color="#90EE90" /> :
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        renderItem={listCard}
                    />
                }

            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191919',
        flex: 1,
    },
    imgDisk: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        marginTop: 110,
    },
    textCont: {
        marginBottom: 60,
        marginTop: -73,
    },
    headContainer: {
        flex: 1,
        marginTop: 120,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCont: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginRight: 10,
        marginLeft: 10,
    },
    text: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,

    },
    songCont: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        maxWidth: 330,
        marginBottom: 70,
    },
    songBorder: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 330,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    ImageSongCont: {
        marginLeft: -18,
    },
    textSongCont: {
        marginLeft: 15,
        marginRight: 5,
        flex: 1,

    },

    songText: {
        fontSize: 17,
        color: "white",

    },
    subText: {
        fontSize: 12,

    },
    duration: {
        marginRight: 0,
        marginTop: 0,
        fontSize: 11,
    },
    ListMusic: {
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    sl: {
        marginTop: 130,
        width: 300,
        flex: 1
    }
    , headerCont: {
        alignItems: 'center',
        marginTop: 10,
    }


})

export default MusicPlayerScreen;
