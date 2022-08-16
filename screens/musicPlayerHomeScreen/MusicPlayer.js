import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React, { useEffect, useState,useReducer } from 'react';
import HeaderCard from '../../components/HeaderCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
import ListMusic from '../../components/listMusic';
import { cardData, showCardData, MixCardData } from '../../data/Data';
import TrackPlayer, {Capability, Event, RepeatMode,State, useProgress,useTrackPlayerEvents, usePlaybackState} from 'react-native-track-player';
//  import songs from '../../assets/data'
 import Slider from '@react-native-community/slider';
 import axiosIntance, { updateToken } from "../../apis/axios";
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
// const song =    [{
//     title: "Anh Đã Lạc Vào",
//     artist: 'Green, Đại Mèo Remix',
//     artwork: require("../../assets/img/songs/0.webp"),
//     url: require("../../assets/music/list-song/0.mp3"),
//     id: 1,
//     duration: 331 
    
// },
// {
//     title: "Chạy Về Khóc Với Anh",
//     artist: 'Green, Đại Mèo Remix',
//     artwork: require("../../assets/img/songs/0.webp"),
//     url: require("../../assets/music/list-song/1.mp3"),
//     id: 2,
//     duration: 331 ,
    
// },
// {
//     title: 'Sẵn Sàng Yêu Em Đi Thôi',
//     artist: 'Woni, Minh Tú, Đại Mèo Remix',
//     artwork: require("../../assets/img/songs/0.webp"),
//     url: require("../../assets/music/list-song/2.mp3"),
//     id: 3,
//     duration: 331 ,
    
// }
// ]
const serverUrl = 'http://192.168.0.120:3000/static/';
let song_ = []
let song = []
const getSong = async() =>{
    console.log('getsong 1');
    const res = await axiosIntance.get("/playlist/62fbcb17e8588f32cbea05b7",{
        // params:{
        //     id: "62fbcb17e8588f32cbea05b7"
        // }
    }).catch(error => setMessage("CANNOT GET"));
    console.log(res.data[0]);
    song_ = res.data[0].songList;
}
 const setupPlayer = async() => {
    await getSong()
    console.log(song_);
    song_.map(item =>{
        song.push({
            title: item.title, 
            id: item.id,
            artist: item.artist,
            url: serverUrl+item.url,
            artwork: serverUrl+item.artwork,
            duration: item.duration})
    })
    console.log(song);
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(song);
        await TrackPlayer.play();
        await setTitle(song[0].title)
        console.log(song[0].title);
        return true;
    } catch (error) {
        console.log(error);
    }



}
const togglePlayBack = async(playbackState) =>{
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log("playbackState: " + playbackState);
    console.log("State.Paused: " + State.Paused);
    if (currentTrack != null){
        if (playbackState === State.Paused){
            console.log("play");
            await TrackPlayer.play();
            console.log("played");
        } else {
            await TrackPlayer.pause();
        }
    }
}

const MusicPlayerScreen = ({ navigation }) => {
    useEffect(() => {
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
    
    const route = useRoute();
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [title, setTitle] = useState("")
    const [songindex, setSongindex] = useState(0)

    const Next = async() => {
        await TrackPlayer.skipToNext();
        let newIndex = 0;
        newIndex = songindex === song.length ? song.length  : songindex + 1;
        await setSongindex(newIndex)
        await setTitle(song[newIndex].title)
    }
    const Pre = async() => {
        await TrackPlayer.skipToPrevious()
        let newIndex = 0;
        newIndex = songindex === 0 ? 0 : songindex - 1;
        await setSongindex(newIndex)
        await setTitle(song[newIndex].title)
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
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.1, y: 0.4 }} end={{ x: 1, y: 1 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <HeaderCard />
                    <View style={styles.headContainer}>
                        <View style={styles.textCont}>
                            <Text style={styles.text}>{title}
                            </Text>
                        </View>
                        <View style={styles.imgDisk}>
                            <Image style={{ height: 330, width: 330, borderRadius: 330 / 2 }} resizeMode={"cover"} source={require("../../assets/img/songs/1.webp")} />
                        </View>
                        <Slider
                            value = {progress.position}
                            minimumValue = {0}
                            maximumValue = {progress.duration}
                            thumbTintColor = "#FFD369"
                            minimumTrackTintColor = "#FFD369"
                            maximumTrackTintColor = "#FFF"
                            onSildingComplete = {async(value)=>{
                                await TrackPlayer.seekTo(value);
                            }}
                            style ={styles.sl}
                            />
                        <View>
                            <View style={{ flexDirection:"row"}}>
                                <Text style={{color:"white"}}>
                                    {new Date(progress.position * 1000).toISOString().substr(14,5)}
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
                            <Pressable onPress={ async()=> Pre()} > 
                                <IconButton style={styles.icon}
                                    icon="step-backward"
                                    color="white"
                                    size={35}
                                    // onPress={() => { navigation.navigate('#') }}
                                />
                            </Pressable>
                            <Pressable onPress ={()=>togglePlayBack(playbackState)}>
                                <IconButton style={styles.icon}
                                    icon= {playbackState === State.Playing ? "pause": "play"}     
                                    color="white"
                                    size={35}
                                    //onPress={() => { navigation.navigate('#') }}
                                />
                            </Pressable>
                            <Pressable onPress={async()=> Next()} > 
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
                        <View style={styles.songBorder}>
                            <View style={styles.ImageSongCont}>
                                <Image style={{ height: 80, width: 80, borderRadius: 120 / 2 }} source={require("../../assets/img/songs/13.webp")} />
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
                        </View>
                    </View>
                    <View style={styles.ListMusic}>
                        {cardData.map(dat =>
                            <ListMusic key={dat.name} name={dat.name} duration={dat.duration} singer={dat.singer} />
                        )}
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
    imgDisk: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textCont: {
        marginBottom: 60,
        marginTop: -73,
    },
    headContainer: {
        flex: 1,
        marginTop: 20,
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
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 330,
        marginLeft: 50,
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
        flex: 1,
        flexDirection: 'column',
        marginLeft: 50,
        marginBottom: 80,

    },
    sl: {
        width: 300,
        flex: 1

    }
    
    
})

export default MusicPlayerScreen;

