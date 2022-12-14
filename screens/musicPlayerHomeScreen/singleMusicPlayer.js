import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
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
import { useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let song_ = []
let song = []
const setUpSong = async (params) => {
    try {
        song_ = [{
            title: params.title,
            id: params.id,
            artist: params.artist,
            url: params.url,
            artwork: params.artwork,
            duration: params.duration
        }]
        console.log(song_);
        let idAudio = null
        // console.log(AsyncStorage.getItem("idAudio"));
        // console.log('id: =' + params.id);
        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.Stop,
            ],
        });
        TrackPlayer.add(song_);
        TrackPlayer.play();

        AsyncStorage.getItem("idAudio").then((value) => {
            idAudio = value;
            console.log("idAudio: " + idAudio)
            console.log("params.id: " + params.id)
            if (idAudio !== params.id) {
                console.log('DETROY');
                TrackPlayer.reset();
                AsyncStorage.setItem("idAudio", params.id);
                TrackPlayer.setupPlayer();
                TrackPlayer.add(song_);
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
        });
        // if (idAudio!=null && idAudio!== params.id) {
        //     console.log('DETROY');
        //     await TrackPlayer.destroy()
        //     await AsyncStorage.setItem("idAudio", params.id)   
        // }else{
        //     AsyncStorage.setItem("idAudio", params.id)   
        // }
        // await setTitle(song[0].title)
        // await setArtist(song[0].artwork)
        // console.log(song[0].title);
        return true;
    } catch (error) {
        console.log(error);
    }
}

const togglePlayBack = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
        if (playBackState == State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};
const spinValue = new Animated.Value(0);
const SingleMusicPlayerScreen = ({ navigation }) => {
    const [isplay, setIsPlaying] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off');
    const route = useRoute()
    //console.log( route.params)
    const playbackState = usePlaybackState();
    const startImgSpin = () => {
        
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            startImgSpin()
        })
    }
    const repeatIcon = () => {
        if (repeatMode == 'off') {
            return 'repeat-off';
        }

        if (repeatMode == 'track') {
            return 'repeat-once';
        }

        if (repeatMode == 'repeat') {
            return 'repeat';
        }
    };

    const changeRepeatMode = () => {
        if (repeatMode == 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }

        if (repeatMode == 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }

        if (repeatMode == 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    };
    useEffect(() => {
        spinValue.setValue(0);
        startImgSpin();
        setIsPlaying(true);
        setUpSong(route.params);
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    const progress = useProgress();
    const Reset = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        await TrackPlayer.skip(currentTrack);
    }
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#5d5640', '#111', '#111', '#111', '#111', '#111']} start={{ x: -0.1, y: 0.4 }} end={{ x: 1, y: 1 }} location={[0.01, 0.2, 0.3, 1, 1, 1]}>
                <ScrollView>
                    <HeaderCard />
                    <View style={styles.headContainer}>
                        <View style={styles.textCont}>
                            <Text style={styles.text}>{route.params.name}
                            </Text>
                        </View>
                        <View style={styles.imgDisk}>
                            {
                                isplay ? (<Animated.Image
                                    style={{ transform: [{ rotate: spin }], height: 330, width: 330, borderRadius: 330 / 2 }}
                                    source={{ uri: route.params.img }}
                                />) :
                                    (<Animated.Image
                                        style={{ height: 330, width: 330, borderRadius: 330 / 2 }}
                                        source={{ uri: route.params.img }}
                                    />)
                            }
                        </View>
                        <Slider
                            style={styles.progressBar}
                            value={progress.position}
                            minimumValue={0}
                            maximumValue={progress.duration}
                            thumbTintColor="#FFD369"
                            minimumTrackTintColor="#FFD369"
                            maximumTrackTintColor="#fff"
                            onSlidingComplete={async value => {
                                await TrackPlayer.seekTo(value);
                            }}
                        />
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "white" }}>
                                    {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.iconCont}>
                            <TouchableOpacity>
                                <IconButton style={styles.icon}
                                    icon="reload"
                                    color="white"
                                    size={35}
                                    onPress={async () => Reset()}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                togglePlayBack(playbackState)
                                if (playbackState == State.Playing) {
                                    setIsPlaying(false)
                                } else {
                                    setIsPlaying(true)
                                    startImgSpin()
                                }
                            }}>
                                <IconButton style={styles.icon}
                                    icon={playbackState === State.Playing ? "pause" : "play"}
                                    color="white"
                                    size={35}
                                // onPress={startImgSpin}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={changeRepeatMode}>
                                <MaterialCommunityIcons style={styles.iconRepeat}
                                    name={`${repeatIcon()}`}
                                    size={35}
                                    color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.songCont}>
                        <View style={styles.songBorder}>
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
                        </View>
                    </View>
                    <View style={styles.ListMusic}>
                        {/* {cardData.map(dat =>
                            <ListMusic key={dat.name} name={dat.name} duration={dat.duration} singer={dat.singer} />
                        )} */}
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
        marginBottom: 120,

    },
    sl: {
        width: 300,
        flex: 1

    },
    progressBar: {
        borderRadius: 50,
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row',
    },

    iconRepeat:{
        marginTop:14,
        marginLeft:10,
    },

})

export default SingleMusicPlayerScreen;

