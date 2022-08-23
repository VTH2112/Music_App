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
import { server, serverUrl1 } from '../../apis/Serverurl';
const serverUrl = server;
let song_ = []
let song = []
const getSong = async () => {
    console.log('getsong 1');
    const res = await axiosIntance.get("/playlist/62fbcb17e8588f32cbea05b7", {
        // params:{
        //     id: "62fbcb17e8588f32cbea05b7"
        // }
    }).catch(error => setMessage("CANNOT GET"));
    console.log(res.data[0]);
    song_ = res.data[0].songList;
}
const setupPlayer = async () => {
    await getSong()
    console.log(song_);
    song_.map(item => {
        song.push({
            title: item.title,
            id: item.id,
            artist: item.artist,
            url: serverUrl + item.url,
            artwork: serverUrl + item.artwork,
            duration: item.duration
        })
    })


    try {
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

const MusicPlayerScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch('https://listen-music-ser.herokuapp.com/song')
            .then(res => {
                return res.json()
            })
            .then(resJson => {
                setData(resJson)
                console.log(resJson)
            }).finally(() => {
                setIsLoading(false)
            })

        navigation.setOptions({
            headerShown: false,
        });
        setupPlayer().then((result) => {
            setTitle(song[0].title)
        }).catch((err) => {
            console(err)
        });
        //setTitle(song[0].title)
        //TrackPlayer.play();
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
                img={serverUrl + item.artwork}
                id={item._id} url={serverUrl + item.url} />
        )
    }

    const route = useRoute();
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [title, setTitle] = useState("")
    const [artwork, setArtwork] = useState("")
    const [songindex, setSongindex] = useState(0)

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
        // await setSongindex(newIndex)
        // await console.log(song.at(2))
        // setTitle(song[newIndex].title)
        // await console.log(song[newIndex].title)
    }
    // const countReducer = (state, action) => {
    //     console.log('countReducer');
    //     switch (action.type) {
    //         case "INCREMENT":
    //             return state + 1;
    //         case "DECREMENT":
    //             if (state == 0) {return 0};
    //             return state - 1;
    //         default:
    //              throw new Error();
    //     }
    // }



    return (
        <SafeAreaView style={styles.container}>
            <HeaderCard />
            <View style={styles.headContainer}>
                <View style={styles.textCont}>
                    <Text style={styles.text}>{route.params.name}
                    </Text>
                </View>
                <View style={styles.imgDisk}>
                    <Image style={{ height: 330, width: 330, borderRadius: 330 / 2 }} resizeMode={"cover"} source={{ uri: route.params.img }} />
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
                    <Pressable onPress={async () => Pre()} >
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
                    <Pressable onPress={async () => Next()} >
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
                {isLoading ? <ActivityIndicator size="large" color="#90EE90" /> : <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={listCard}
                />}

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


})

export default MusicPlayerScreen;

